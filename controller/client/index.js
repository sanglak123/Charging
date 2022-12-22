import { CreateAccessToken, CreateRefreshToken } from "../token";

const bcryptjs = require("bcryptjs");
const { ListPrices, Users, RefreshTokens } = require("../../db/models");

export const ClientController = {
    Authen: {
        Login: async (req, res) => {
            const { userName, pass } = req.body;
            try {
                const Client = await Users.findOne({
                    where: {
                        userName: userName
                    }
                });
                if (Client) {
                    if (bcryptjs.compareSync(pass, Client.pass)) {
                        const newAccessToken = CreateAccessToken(Client);
                        const newRefreshToken = CreateRefreshToken(Client);

                        const oldRefreshToken = await RefreshTokens.findOne({
                            where: {
                                idUser: Client.id
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
                            return res.status(200).json({ Client: Client, accessToken: newAccessToken });
                        } else {
                            const token = await RefreshTokens.create({
                                refreshToken: newRefreshToken,
                                idUser: Client.id
                            });

                            res.cookie("refreshToken", newRefreshToken, {
                                httpOnly: true,
                                secure: true,
                                path: "/",
                                sameSite: "strict",
                                maxAge: 60 * 1000 * 60 * 24
                            });
                            return res.status(200).json({ Client: Client, accessToken: newAccessToken });
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
            const { userName, fullName, phone, email, pass } = req.body;
            try {
                const oldUser = await Users.findOne({
                    where: {
                        userName: userName
                    }
                });
                if (oldUser) {
                    return res.status(400).json({ error: "Tên đăng nhập đã tồn tại." })
                } else {
                    const salt = bcryptjs.genSaltSync(10);
                    const newpass = bcryptjs.hashSync(pass, salt);
                    const newClient = await Users.create({
                        userName: userName,
                        fullName: fullName,
                        pass: newpass,
                        phone: phone,
                        email: email,
                        admin: false,
                        surplus: 0
                    });
                    return res.status(201).json({ Client: newClient, mess: "Đăng ký thành công!" });
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        Logout: async (req, res) => {
        }
    },
    Price: {
        LayGiaTayThe: async (req, res) => {
            try {
                const list = await ListPrices.findAll();
                const VIETTEL = list.filter(card => card.telco === "VIETTEL");
                const VINAPHONE = list.filter(card => card.telco === "VINAPHONE");
                const MOBIFONE = list.filter(card => card.telco === "MOBIFONE");
                const VNMOBI = list.filter(card => card.telco === "VNMOBI");
                const ZING = list.filter(card => card.telco === "ZING");
                const GATE = list.filter(card => card.telco === "GATE");
                const GARENA = list.filter(card => card.telco === "GARENA");
                const VCOIN = list.filter(card => card.telco === "VCOIN");

                const ListCard = [
                    {
                        name: "VIETTEL",
                        value: ["10.000", "20.000", "30.000", "50.000", "100.000", "200.000", "300.000", "500.000", "1.000.000"],
                        list: VIETTEL
                    },
                    {
                        name: "VINAPHONE",
                        value: ["10.000", "20.000", "30.000", "50.000", "100.000", "200.000", "300.000", "500.000"],
                        list: VINAPHONE
                    },
                    {
                        name: "VNMOBI",
                        value: ["10.000", "20.000", "30.000", "50.000", "100.000", "200.000", "300.000", "500.000"],
                        list: VNMOBI
                    },
                    {
                        name: "MOBIFONE",
                        value: ["10.000", "20.000", "30.000", "50.000", "100.000", "200.000", "300.000", "500.000"],
                        list: MOBIFONE
                    },
                    {
                        name: "ZING",
                        value: ["10.000", "20.000", "30.000", "50.000", "100.000", "200.000", "300.000", "500.000", "1.000.000"],
                        list: ZING
                    },
                    {
                        name: "GATE",
                        value: ["10.000", "20.000", "50.000", "100.000", "200.000", "500.000", "1.000.000"],
                        list: GATE
                    },
                    {
                        name: "GARENA",
                        value: ["20.000", "50.000", "100.000", "200.000", "500.000"],
                        list: GARENA
                    },
                    {
                        name: "VCOIN",
                        value: ["10.000", "20.000", "50.000", "100.000", "200.000", "300.000", "500.000", "1.000.000"],
                        list: VCOIN
                    },
                ]

                return res.status(200).json({ ListPrices: ListCard });
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    }
}