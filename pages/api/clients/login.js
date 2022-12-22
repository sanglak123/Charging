import { ClientController } from "../../../controller/client"

export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({ mess: "Client login" })
    } else if (req.method === "POST") {
        await ClientController.Authen.Login(req, res);
    }
}