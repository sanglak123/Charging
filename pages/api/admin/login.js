import { AdminController } from "../../../controller/admin"

export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({ mess: "Admin Login" })
    } else if (req.method === "POST") {
        await AdminController.Authen.Login(req, res);
    }
}