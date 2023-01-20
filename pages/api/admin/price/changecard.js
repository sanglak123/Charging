import nextConnect from "next-connect";
import { AdminPriceController } from "../../../../controller/admin/price";
import { CheckLogin, CheckAdmin } from "../../../../middleware/authen";

const updateRouter = nextConnect({
    onError(error, req, res) {
        res
            .status(501)
            .json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

updateRouter.get((req, res) => {
    return res.status(200).json({ mess: "Admin update List Price" })
});

updateRouter.put(CheckLogin, CheckAdmin, AdminPriceController.ChangeCard.UpdateFees);


export default updateRouter;

export const config = {
    api: {
        bodyParser: false,
    },
};