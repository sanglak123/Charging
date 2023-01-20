const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
export const CheckLogin = async (req, res, next) => {
    const { accesstoken } = req.headers;
    try {
        jwt.verify(accesstoken, process.env.ACCESS_TOKEN_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ error: "Bạn chưa đăng nhập!" })
            } else {
                next();
            }
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const CheckAdmin = async (req, res, next) => {
    const { accesstoken } = req.headers;
    try {
        jwt.verify(accesstoken, process.env.ACCESS_TOKEN_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ error: "Bạn chưa đăng nhập!" })
            } else {
                if (user.admin) {
                    next();
                } else {
                    return res.status(403).json({ error: "Không đc phép truy cập!" })
                }

            }
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}