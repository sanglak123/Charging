import { AdminController } from "../../../controller/admin"

export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({ mess: "Update list price" })
    } else if (req.method === "PUT") {
        await AdminController.Price.Update(req, res);
    }
}