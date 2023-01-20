import { ClientCardController } from "../../../../../../controller/client/card";

export default async function handler(req, res) {
    if (req.method === "GET") {
        await ClientCardController.Historys(req, res)
    }
}