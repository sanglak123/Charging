import axios from "axios";
import { Op } from "sequelize";
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const { ListPrices } = require("../../db/models");

export const AdminController = {
    Authen: {
        Login: async (req, res) => {
            try {

            } catch (error) {
                return res.status(500).json(error);
            }
        },
        Register: async (req, res) => {
            try {

            } catch (error) {
                return res.status(500).json(error);
            }
        },
        Logout: async (req, res) => {
            try {

            } catch (error) {
                return res.status(500).json(error);
            }
        },

    },
    Price: {
        Update: async (req, res) => {
            const { accesstoken } = req.headers;
            try {
                jwt.verify(accesstoken, process.env.ACCESS_TOKEN_KEY, async (err, user) => {
                    if (err) {
                        return res.status(403).json({ error: "Bạn cần đăng nhập!" });
                    } else {
                        if (user.admin = true) {
                            const result = await axios({
                                method: "GET",
                                url: `https://doithe1s.vn/chargingws/v2/getfee?partner_id=${process.env.PARTNER_ID}`
                            });
                            result.data.map(async (price) => {
                               
                            })

                            return res.status(200).json({ mess: "Cập nhật thành công!", ListPrices: result.data })
                        } else {
                            return res.status(403).json({ error: "Không có quyền truy cập!" })
                        }
                    }
                })
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    }
}