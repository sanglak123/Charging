import { ClientController } from "../../../../controller/client";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { idCard } = req.query;
        return res.status(200).json({ mess: "Delete Card", id: idCard })
    } else if (req.method === "DELETE") {
        await ClientController.Card.DeleteCard(req, res);
    }
}