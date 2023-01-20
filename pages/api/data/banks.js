import { DataController } from "../../../controller/data";

export default async function handler(req, res) {
    if (req.method === "GET") {
        await DataController.Banks.GetListBanks(req, res);
    }
}