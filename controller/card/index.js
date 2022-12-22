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
                    const client = await Users.findOne({
                        where: {
                            id: user.id
                        }
                    });
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
                            amount: Number(value) - (Number(value) * Number(priceCard.fees) / 100),
                            sign: sign,
                            declared_value: value,
                            request_id: request_id,
                            idUser: client.id

                        });
                        //Call API
                        const data = await axios({
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
                        });
                        //Check Data
                        if (data.data.status === 1) {

                            postcard.message = "Thành công!";
                            postcard.status = 1;
                            postcard.trans_id = data.data.trans_id;
                            await postcard.save();

                            client.surplus = (Number(client.surplus) + Number(postcard.amount)).toString();
                            client.save();

                            return res.status(200).json({ mess: "Đổi thẻ thành công!", status: 1, PostCard: postcard })
                        } else if (data.data.status === 2) {

                            postcard.message = "Thành công (Penanty)";
                            postcard.status = 2;
                            postcard.amount = (Number(postcard.amount) / 2).toString();
                            postcard.trans_id = data.data.trans_id;
                            await postcard.save();

                            client.surplus = (Number(client.surplus) + Number(postcard.amount)).toString();
                            client.save();

                            return res.status(200).json({ mess: "Đổi thẻ thành công!", status: 2, PostCard: postcard })
                        } else if (data.data.status === 3) {
                            postcard.message = "Thẻ lỗi!";
                            postcard.save();
                            return res.status(400).json({ error: "Thẻ lỗi!", status: 3 })
                        } else if (data.data.status === 4) {
                            postcard.destroy();
                            return res.status(500).json({ error: "Hệ thống bảo trì!", status: 4, PostCard: postcard })
                        } else if (data.data.status === 99) {
                            postcard.message = "Thẻ chờ xử lý!";
                            postcard.save();
                            return res.status(200).json({ mess: "Thẻ chờ xử lý!", status: 5, PostCard: postcard })
                        }
                    }
                }
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    CheckCard: async (req, res) => {
        const { telco, code, seri, value, request_id, sign } = req.body;
        const { accesstoken } = req.headers;
        try {
            jwt.verify(accesstoken, process.env.ACCESS_TOKEN_KEY, async (err, user) => {
                if (err) {
                    return res.status(403).json({ error: "Bạn chưa đăng nhập" });
                } else {
                    const client = await Users.findOne({
                        where: {
                            id: user.id
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
                    if (postcard) {
                        const result = await axios({
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
                                command: "check"
                            }
                        });
                        if (result.data.status === 1) {

                            postcard.message = "Thành công!";
                            postcard.status = 1;
                            postcard.trans_id = result.data.trans_id;
                            await postcard.save();

                            client.surplus = (Number(client.surplus) + Number(postcard.amount)).toString();
                            client.save();

                            return res.status(200).json({ mess: "Đổi thẻ thành công!", status: 1, PostCard: postcard })
                        } else if (result.data.status === 2) {

                            postcard.message = "Thành công (Penanty)";
                            postcard.status = 2;
                            postcard.amount = (Number(postcard.amount) / 2).toString();
                            postcard.trans_id = data.data.trans_id;
                            await postcard.save();

                            client.surplus = (Number(client.surplus) + Number(postcard.amount)).toString();;
                            client.save();

                            return res.status(200).json({ mess: "Đổi thẻ thành công!", status: 2, PostCard: postcard })
                        } else if (result.data.status === 3) {
                            postcard.message = "Thẻ lỗi!";
                            postcard.save();
                            return res.status(400).json({ error: "Thẻ lỗi!", status: 3, PostCard: postcard })
                        } else if (result.data.status === 4) {
                            postcard.destroy();
                            return res.status(500).json({ error: "Hệ thống bảo trì!", status: 4, PostCard: postcard })
                        } else if (data.data.status === 99) {
                            postcard.message = "Thẻ chờ xử lý!";
                            postcard.save();
                            return res.status(200).json({ mess: "Thẻ chờ xử lý!", status: 5, PostCard: postcard })
                        }
                    } else {
                        return res.status(404).json({ error: "Card không tồn tại trên hệ thống!" })
                    }
                }
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};


