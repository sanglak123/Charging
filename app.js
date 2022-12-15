const express = require("express"); // Sử dụng framework express
const next = require("next"); // Include module next
const cors = require("cors");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 3000 // Port để chạy app Nextjs, cũng là server nodejs
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev })
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    server.use(cors({
        origin: ["*"]
    }));

    server.get('/a', (req, res) => {
        return app.render(req, res, '/a', req.query)
    });

    server.all('*', (req, res) => {
        return handle(req, res)
    });
    const { sequelize } = require("./db/models");

    const CheckDatabase = async () => {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    };
    CheckDatabase();

    server.listen(port, err => {
        if (err) throw err
        console.log(`Server is running on ${process.env.DOMAIN_NAME}:${port}`);
    })
})
