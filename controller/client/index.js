import { Op } from "sequelize";
import { CreateAccessToken, CreateRefreshToken } from "../token";
const uuid = require("uuid");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
dotenv.config();

const bcryptjs = require("bcryptjs");
const { Users, RefreshTokens, Cards, Prices, TypeCards } = require("../../db/models");

export const ClientController = {
    Authen: {
        Login: async (req, res) => {
            const { userName, pass1 } = req.body;
            try {
                const user = await Users.findOne({
                    where: {
                        userName: userName
                    }
                });
                if (user) {
                    if (bcryptjs.compareSync(pass1, user.pass1)) {
                        const newAccessToken = CreateAccessToken(user);
                        const newRefreshToken = CreateRefreshToken(user);

                        const oldRefreshToken = await RefreshTokens.findOne({
                            where: {
                                idUser: user.id
                            }
                        });

                        if (oldRefreshToken) {
                            oldRefreshToken.refreshToken = newRefreshToken;
                            await oldRefreshToken.save();

                            res.cookie("refreshToken", newRefreshToken, {
                                httpOnly: true,
                                secure: true,
                                path: "/",
                                sameSite: "strict",
                                maxAge: 60 * 1000 * 60 * 24
                            });
                            return res.status(200).json({ Client: user, accessToken: newAccessToken });
                        } else {
                            const token = await RefreshTokens.create({
                                refreshToken: newRefreshToken,
                                idUser: user.id
                            });

                            res.cookie("refreshToken", newRefreshToken, {
                                httpOnly: true,
                                secure: true,
                                path: "/",
                                sameSite: "strict",
                                maxAge: 60 * 1000 * 60 * 24
                            });
                            return res.status(200).json({ Client: user, accessToken: newAccessToken });
                        }

                    } else {
                        return res.status(404).json({ error: "Mật khẩu không chính xác!" })
                    }
                } else {
                    return res.status(404).json({ error: "Người dùng không khả dụng!" })
                }
            } catch (error) {
                return res.status(500).json(error)
            }
        },
        Logout: async (req, res) => {
            try {
                res.clearCookie("refreshToken");
                return res.end();
            } catch (error) {
                return res.status(500).json({ error: error });
            }
        },
        Register: async (req, res) => {
            try {
                const { userName, displayName, phone, email, pass1 } = req.body;

                const oldUser = await Users.findOne({
                    where: {
                        userName: userName
                    }
                });
                if (oldUser) {
                    return res.status(400).json({ error: "Tên đăng nhập đã tồn tại!" })
                } else {
                    const salt = bcryptjs.genSaltSync(10);
                    const newPass = bcryptjs.hashSync(pass1, salt);
                    const partner_id = uuid.v4({ userName: userName }).replace(/\-/g, '').toString();
                    const partnerKey = uuid.v4({ userName: userName, email: email }).replace(/\-/g, '').toString();
                    const walletNumber = new Date().getTime().toString();
                    const newUsser = await Users.create({
                        userName: userName,
                        displayName: displayName,
                        pass1: newPass,
                        email: email,
                        phone: phone,
                        partnerId: partner_id,
                        partnerKey: partnerKey,
                        walletNumber: walletNumber,
                        surplus: "0",
                        admin: false
                    });
                    return res.status(200).json({ mess: "Đăng ký thành công!", user: newUsser });
                }

            } catch (error) {
                return res.status(500).json(error);
            }
        }
    },
    Card: {
        PostCard: async (req, res) => {
            const { telco, code, seri, value } = req.body;
            const { id } = req.query;
            try {
                const request_id = uuid.v4({ serial: seri }).replace(/\-/g, '').toString();
                const sign = CryptoJS.MD5(process.env.PARTNER_KEY + code + seri).toString();
                //User post card
                const client = await Users.findOne({
                    where: {
                        id: id
                    }
                });
                //Old card
                const oldCard = await PostCards.findOne({
                    where: {
                        [Op.and]: [
                            { telco: telco },
                            { code: code },
                            { seri: seri },
                            { value: value }
                        ]
                    }
                });

                //Price
                const priceCard = await ListPrices.findOne({
                    where: {
                        [Op.and]: [
                            { telco: telco },
                            { value: value }
                        ]
                    }
                });

                if (oldCard) {
                    return res.status(400).json({ error: "Thẻ đã tồn tại trên hệ thống!" })
                } else {
                    //Thêm mới post                     
                    const postcard = await PostCards.create({
                        telco: telco,
                        code: code,
                        seri: seri,
                        value: value,
                        amount: Number(value) - (Number(value) * Number(priceCard.fees)) / 100,
                        fees: priceCard.fees,
                        sign: sign,
                        declared_value: value,
                        message: "Wait",
                        request_id: request_id,
                        idUser: client.id
                    });

                    //Call API
                    await axios({
                        method: "POST",
                        url: process.env.DOMAIN_POSTCARD,
                        data: {
                            telco: telco,
                            code: code,
                            serial: seri,
                            amount: value,
                            request_id: request_id,
                            partner_id: process.env.PARTNER_ID,
                            sign: sign,
                            command: "charging"
                        }
                    }).then((responsive) => {
                        return res.status(200).json({ Postcard: postcard, status: responsive.data.status, mess: "Thẻ đang được xử lý vui lòng chờ trong giây lát" })
                    }).catch((err) => {
                        return res.status(500).json(err)
                    })
                }

            } catch (error) {
                return res.status(500).json(error);
            }
        },
        CheckCard: async (req, res) => {
            const { telco, code, seri, value, idUser } = req.body;
            try {
                const client = await Users.findOne({
                    where: {
                        id: idUser
                    }
                });

                const postcard = await PostCards.findOne({
                    where: {
                        [Op.and]: [
                            { idUser: client.id },
                            { code: code },
                            { seri: seri }
                        ]
                    }
                });

                if (postcard.message === "Wait") {
                    await axios({
                        method: "POST",
                        url: process.env.DOMAIN_POSTCARD,
                        data: {
                            telco: telco,
                            code: code,
                            serial: seri,
                            amount: value,
                            request_id: postcard.request_id,
                            partner_id: process.env.PARTNER_ID,
                            sign: postcard.sign,
                            command: "check"
                        }
                    }).then(async (responsive) => {

                        switch (responsive.data.status) {
                            case 1: {
                                client.surplus = Number(client.surplus) + Number(postcard.amount);
                                await client.save();
                                postcard.message = "Success";
                                postcard.status = 1;
                                await postcard.save();
                                return res.status(200).json({ status: 1, mess: "Đổi thẻ thành công!", PostCard: postcard })
                            }
                            case 2: {
                                client.surplus = client.surplus + (amount / 2);
                                await client.save();
                                postcard.message = "Penanty";
                                postcard.status = 2;
                                postcard.amount = postcard.amount / 2;
                                await postcard.save();
                                return res.status(200).json({ status: 2, mess: "Đổi thẻ thành công - Sai mệnh giá", PostCard: postcard })
                            }
                            case 3: {
                                postcard.message = "Error";
                                postcard.status = 3;
                                postcard.amount = 0;
                                await postcard.save();
                                return res.status(200).json({ status: 3, mess: "Thẻ lỗi" })
                            }
                            case 4: {
                                postcard.destroy();
                                return res.status(200).json({ status: 4, mess: "Hệ thống bảo trì" })
                            }
                            case 99: {
                                return res.status(200).json({ status: 99 })
                            }
                            default: {
                                postcard.message = "Error";
                                postcard.status = 3;
                                postcard.amount = 0;
                                await postcard.save();
                                return res.status(400).json({ error: "Thẻ lỗi" })
                            }
                        }
                    }).catch((err) => {
                        return res.status(500).json(err)
                    })
                } else {
                    return res.status(404).json({ error: postcard.message })
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        GetHistoryChangeCard: async (req, res) => {
            const { id } = req.query;
            try {
                const list = await Cards.findAll({
                    where: {
                        [Op.and]: [
                            { idUser: id },
                            { command: "change" }
                        ]
                    },
                    order: [["id", "desc"]],
                    include: { model: Prices, include: { model: TypeCards } }
                });
                return res.status(200).json({ HistoryChangeCard: list })
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        DeleteCard: async (req, res) => {
            const { idCard } = req.query;
            try {
                const card = await Cards.findOne({
                    where: {
                        id: idCard
                    }
                });
                if (card) {
                    await card.destroy();
                    return res.status(200).json({ mess: "Delete success!" })
                } else {
                    return res.status(404).json({ error: "Card is not found!" });
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    }
}