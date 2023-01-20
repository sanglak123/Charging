import axios from "axios";
import { Op } from "sequelize";
const dotenv = require("dotenv");
dotenv.config();
const uuid = require("uuid");
const CryptoJS = require("crypto-js");

const { Users, PriceBuyCards, Cards, Prices, TypeCards } = require("../../../db/models")

export const ClientCardController = {
    BuyCard: async (req, res) => {
        const { telco, value, count, idUser } = req.body;
        try {
            return res.status(200).json({ telco, value, count, idUser, mess: "Mua thẻ thành công!" })
        } catch (error) {
            return res.status(200).json(error);
        }
    },
    ChangeCard: async (req, res) => {

    },
    Historys: async (req, res) => {
        const { id, command } = req.query;
        try {
            const list = await Cards.findAll({
                where: {
                    [Op.and]: [
                        { command: command },
                        { idUser: id }
                    ]
                },
                include: [{ model: Prices, include: { model: TypeCards } }]
            });
            return res.status(200).json({ Historys: list })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}