import axios from "axios";
import { Op } from "sequelize";
const bcryptjs = require("bcryptjs");

const { Users, Prices, TypeCards, sequelize, Cards } = require("../../db/models");
const dotenv = require("dotenv");
dotenv.config();

export const AdminController = {
    Data: {
        LoadDataAdmin: async (req, res) => {
            try {
                const listClients = await Users.findAll({
                    where: {
                        admin: false
                    }
                });
                return res.status(200).json({ ListClients: listClients })

            } catch (error) {
                return res.status(500).json(error);
            }
        }
    },
    Prices: {
        EditFessBuy: async (req, res) => {
            const { id } = req.query;
            const { feesBuy } = req.body;
            try {
                const price = await Prices.findOne({
                    where: {
                        id: id
                    },
                    include: [{ model: TypeCards }]
                });
                if (price) {
                    price.feesBuy = feesBuy;
                    await price.save();
                    return res.status(200).json({ mess: "Edit success!" })
                } else {
                    return res.status(404).json({ error: "Price not found!" })
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        UpdateFeesChangeCard: async (req, res) => {
            try {
                await axios({
                    method: "GET",
                    url: "https://doithe1s.vn/chargingws/v2/getfee?partner_id=6155991561"
                }).then(async (result) => {
                    result.data.map(async (card) => {
                        const word = card.telco.toString().toLowerCase();
                        const telco = word.substring(0, 1).toUpperCase() + word.substring(1);

                        const price = await Prices.findOne({
                            where: {
                                value: card.value
                            },
                            include: {
                                model: TypeCards,
                                where: {
                                    telco: telco
                                }
                            }
                        });

                        //Update;
                        price.feesChange = Number(card.fees) + Number(process.env.DISCOUNT);
                        await price.save();
                    });
                    const list = await Prices.findAll();
                    return res.status(200).json({ mess: "Update success!", ListPrices: list });

                }).catch((err) => {
                    return res.status(500).json(err)
                })
            } catch (error) {
                return res.status(500).json(err)
            }

        },
        PostCard: async (req, res) => {
            try {
                const config = {
                    method: 'get',
                    url: 'https://doithe1s.vn/chargingws/v2/getfee?partner_id=6155991561',
                    headers: {}
                };

                await axios(config)
                    .then(function (response) {
                        return res.status(200).json({ ListPrices: response.data });
                    })
                    .catch(function (error) {
                        return res.status(500).json(err)
                    });

            } catch (error) {
                return res.status(500).json(error);
            }
        },
        DeletePrice: async (req, res) => {
            const { id } = req.query;
            try {
                const price = await Prices.findOne({
                    where: {
                        id: id
                    }
                });
                if (price) {
                    await price.destroy();
                    return res.status(200).json({ mess: "Delete success!" })
                } else {
                    return res.status(404).json({ error: "Price not found!" })
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
    },
    Clients: {
        ResetPass: async (req, res) => {
            const { id } = req.query;
            try {
                const client = await Users.findOne({
                    where: {
                        id: id
                    }
                });
                if (client) {
                    const salt = bcryptjs.genSaltSync(10);
                    const newPass = bcryptjs.hashSync(client.phone, salt);
                    client.pass1 = newPass;
                    await client.save();
                    return res.status(200).json({ mess: "Reset password success!" })
                } else {
                    return res.status(404).json({ error: "Client not found!" });
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        AccessBranch: async (req, res) => {
            const { id } = req.query;
            const { lever } = req.body;
            try {
                const client = await Users.findOne({
                    where: {
                        id: id
                    }
                });
                if (client) {
                    client.lever = lever;
                    await client.save();
                    return res.status(200).json({ mess: `Update lever client ${client.userName} upto ${lever} success!` })
                } else {
                    return res.status(404).json({ error: "Client not found!" });
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        GetRevenue: async (req, res) => {
            const { id } = req.query;
            try {
                const date = new Date();
                // date.setMonth(-3);
                const y = date.getFullYear();
                const m = date.getMonth();

                const firstDay = new Date(y, m, 1);
                const lastDay = new Date(y, m + 1, 0);

                const list = await Cards.findAll({
                    where: {
                        [Op.and]: [
                            { idUser: id },
                            {
                                createdAt: {
                                    [Op.between]: [firstDay, lastDay]
                                }
                            }
                        ]
                    },
                    include: [{ model: Prices, include: { model: TypeCards } }]
                });
                return res.status(200).json({ ListCards: list })
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    }
}