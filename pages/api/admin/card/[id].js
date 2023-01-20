import { AdminController } from "../../../../controller/admin";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { id } = req.query;
        return res.status(200).json({ idCard: id })
    } else if (req.method === "PUT") {
        await AdminController.Prices.EditFessBuy(req, res)
    } else if (req.method === "DELETE") {
        await AdminController.Prices.DeletePrice(req, res)
    }
}