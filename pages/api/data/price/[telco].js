const { Prices } = require("../../../../db/models")
export default async function handler(req, res) {
    if (req.method === "GET") {
        const { telco, type } = req.query;
        try {
            const list = await Prices.findAll({
                where: {
                    telco: telco
                },
                attributes: ["value"]
            });
            return res.status(200).json({ value: list })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}