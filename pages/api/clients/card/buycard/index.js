import { ClientCardController } from "../../../../../controller/client/card";

export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({ mess: "Buy Cảd" })
    }
    else if (req.method === "POST") {
        await ClientCardController.BuyCard(req, res)
    }
}