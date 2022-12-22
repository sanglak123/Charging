import { CardController } from "../../../controller/card"

export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({ mess: "Tẩy thẻ" })
    } else if (req.method === "POST") {
        await CardController.PostCard(req, res);
    }
};
