import axios from "axios";
import dotenv from "dotenv";
import nextConnect from "next-connect";

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

apiRoute.get(async (req, res) => {
    const { type } = req.query;
    try {
        const result = await axios({
            method: "GET",
            url: `https://thecaosieure.com//chargingws/v2/getfee?partner_id=56458364194`
        });
        const Viettel = result.data.filter(card => card.telco === type);

        Viettel.forEach(card => {
            card.fees = card.fees + 1;
        });
        return res.status(200).json({ data: Viettel })
    } catch (error) {
        return res.status(500).json(error);
    }
})


export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};