import axios from "axios";
import { Op } from "sequelize";
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const CryptoJS = require("crypto-js");

const { PostCards, ListPrices, Users } = require("../../db/models");
const dotenv = require("dotenv").config();
const bcryptjs = require("bcryptjs");

export const CardController = {
    PostCard: async (req, res) => {
        const { telco, code, seri, value } = req.body;
        const { accesstoken } = req.headers;
        try {
            const request_id = uuid.v4({ serial: seri }).replace(/\-/g, '').toString();
            const sign = CryptoJS.MD5(process.env.PARTNER_KEY + code + seri).toString();

            jwt.verify(accesstoken, process.env.ACCESS_TOKEN_KEY, async (err, user) => {
                if (err) {
                    return res.status(403).json({ error: "Bạn chưa đăng nhập!" })
                } else {
                    //User post card
                    const client = await Users.findOne({
                        where: {
                            id: user.id
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
                }
            })
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
                return res.status(404).json({ error: "Card không tồn tại trên hệ thống!" })
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};

