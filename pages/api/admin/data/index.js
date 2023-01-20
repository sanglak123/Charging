import { AdminController } from "../../../../controller/admin";

export default async function handler(req, res) {
    if (req.method === "GET") {
        await AdminController.Data.LoadDataAdmin(req, res)
    }
}