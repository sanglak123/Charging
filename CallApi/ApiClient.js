import { toast } from "react-toastify";
import { rootApi } from "./apiConfig";

export const ApiClients = {
    LayGiaTayThe: async (dispath, LayGiaTayTheSuccess, type) => {
        await rootApi({
            method: "GET",
            url: `/card/${type}`
        }).then((res) => {
            dispath(LayGiaTayTheSuccess(res.data.data));
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error);
            } else {
                toast.error(err);
            }
        })
    }
}