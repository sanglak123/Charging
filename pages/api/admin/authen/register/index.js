import { AdminAuthenController } from "../../../../../controller/admin/authen"

export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({ mess: "Register Admin" })
    } else if (req.method = "POST") {
        await AdminAuthenController.Register(req, res)
    }
}