import axios from "axios";
import dotenv from "dotenv";
import nextConnect from "next-connect";
import { ClientController } from "../../../controller/client";

dotenv.config();

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

apiRoute.get(ClientController.Price.LayGiaTayThe)


export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};