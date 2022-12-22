import { toast } from "react-toastify";
import { rootApi } from "./apiConfig";

export const ApiClients = {
    LayGiaTayThe: async (dispath, LayGiaTayTheSuccess) => {
        await rootApi({
            method: "GET",
            url: "/card/listprice"
        }).then((res) => {
            dispath(LayGiaTayTheSuccess(res.data.ListPrices));
        }).catch((err) => {
            if (err.response) {
                toast.error(err.response.data.error);
            } else {
                toast.error(err);
            }
        })
    },
    Authen: {
        Register: async (userName, fullName, phone, email, pass, router) => {
            await rootApi({
                method: "POST",
                url: "/clients/register",
                data: {
                    userName: userName,
                    fullName: fullName,
                    phone: phone,
                    email: email,
                    pass: pass
                }
            }).then((res) => {
                toast.success(res.data.mess);
                router.replace("/")
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Login: async (userName, pass, dispath, LoginSuccess, router) => {
            await rootApi({
                method: "POST",
                url: "/clients/login",
                data: {
                    userName: userName,
                    pass: pass
                }
            }).then((res) => {
                toast.success("Đăng nhập thành công!")
                dispath(LoginSuccess(res.data));
                router.replace("/");
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Logout: async () => {
            await rootApi({
                method: "GET",
                url: "/card/listprice"
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
    },
    Card: {
        PostCard: async (telco, code, seri, value, acessToken) => {
            await rootApi({
                method: "POST",
                url: "/card/postcard",
                data: {
                    telco, code, seri, value
                },
                headers: {
                    accesstoken: acessToken
                }
            }).then(async (res) => {
                toast.success(res.data.mess)
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        CheckCard: async (telco, code, seri, value, request_id, sign) => {
            await rootApi({
                method: "POST",
                url: "/card/checkcard",
                data: {
                    telco, code, seri, value, request_id, sign
                },
                headers: {
                    accesstoken: acessToken
                }
            }).then(async (res) => {
                return res.data
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        }
    }
}