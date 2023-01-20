import { AdminController } from "../../../../controller/admin"

export default async function handler(req, res) {
    if (req.method === "GET") {
        // return res.status(200).json({ mess: "Update FeesChange" })
        await AdminController.Prices.UpdateFeesChangeCard(req, res)
    } else if (req.method === "PUT") {
        await AdminController.Prices.UpdateFeesChangeCard(req, res)
    }
}