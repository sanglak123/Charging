const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const CreateAccessToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        admin: user.type
    },
        process.env.ACCESS_TOKEN_KEY,
        { expiresIn: "1h" })
};

const CreateRefreshToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        admin: user.type
    },
        process.env.REFRESH_TOKEN_KEY,
        { expiresIn: "1800s" })
};

module.exports = {
    CreateAccessToken,
    CreateRefreshToken
}