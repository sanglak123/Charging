const { Users } = require("../../../db/models");
const dotenv = require("dotenv");
dotenv.config();
const bcryptjs = require("bcryptjs");
const uuid = require("uuid");
const CryptoJS = require("crypto-js");

export const AdminAuthenController = {
    Login: async (req, res) => {
        try {

        } catch (error) {
            return res.status(500).json(error);
        }
    },
    Register: async (req, res) => {
        const { userName, displayName, phone, email, pass1, admin, key } = req.body;
        try {
            if (key === process.env.KEY_ADMIN) {
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
                        admin: true
                    });
                    return res.status(200).json({ mess: "Đăng ký thành công!", user: newUsser });
                }

            } else {
                return res.status(400).json({ error: "KEY_ADMIN WRONG!" })
            }
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
}