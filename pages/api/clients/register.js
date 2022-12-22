import { ClientController } from "../../../controller/client";

export default async function handler(req, res) {
    if (req.method === "POST") {
        await ClientController.Authen.Register(req, res);
    } else if (req.method === "GET") {
        return res.status(200).json({ mess: "Client register" })
    }
}