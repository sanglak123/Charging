import nextConnect from "next-connect";
import { ClientController } from "../../../../../controller/client";
import { CheckLogin } from "../../../../../middleware/authen";

const apiRoute = nextConnect({
    onError(error, req, res) {
        res
            .status(501)
            .json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.get((req, res) => {
    const { id } = req.query;
    return res.status(200).json({ mess: "Post card", id: id })
})

apiRoute.post(CheckLogin, ClientController.Card.PostCard)

export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    },
};