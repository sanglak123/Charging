import { CardController } from "../../../controller/card"

export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({ mess: "Check card" })
    } else if (req.method === "POST") {
        await CardController.CheckCard(req, res)
    }
}