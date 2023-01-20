import { AdminController } from "../../../../controller/admin";

export default async function handler(req, res) {
    if (req.method === "GET") {
        await AdminController.Clients.GetRevenue(req, res)
    } else if (req.method === "PUT") {
        await AdminController.Clients.ResetPass(req, res)
    } else if (req.method === "POST") {
        await AdminController.Clients.AccessBranch(req, res)
    }
}