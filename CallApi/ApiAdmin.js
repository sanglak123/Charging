import { toast } from "react-toastify";
import { rootApi } from "./apiConfig";

export const ApiAdmin = {
    Authen: {
        Register: async (userName, fullName, phone, email, pass, router) => {
            await rootApi({
                method: "POST",
                url: "/admin/register",
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
        Login: async (userName, pass, key, dispath, LoginSuccess, router) => {
            await rootApi({
                method: "POST",
                url: "/admin/login",
                data: {
                    userName: userName,
                    pass: pass,
                    key: key
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
        Logout: async (dispatch, LogoutSuccess) => {
            await rootApi({
                method: "GET",
                url: "/admin/logout"
            }).then((res) => {
                toast.success("Đăng xuất thành công")
                dispatch(LogoutSuccess());
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        }
    },
    Data: {
        GetAdminData: async (dispatch, LoadDataAdminSuccess) => {
            await rootApi({
                method: "GET",
                url: "/admin/data",
            }).then((res) => {
                dispatch(LoadDataAdminSuccess(res.data))
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        }
    },
    Prices: {
        EditFessBuy: async (id, feesBuy, accessToken) => {
            await rootApi({
                method: "PUT",
                url: `/admin/card/${id}`,
                data: {
                    feesBuy
                },
                headers: {
                    accesstoken: accessToken
                }
            }).then((res) => {
                toast.success(res.data.mess)
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        UpdateFessChange: async (accessToken) => {
            await rootApi({
                method: "PUT",
                url: "admin/card/update",
                headers: {
                    accesstoken: accessToken
                }
            }).then((res) => {
                toast.success(res.data.mess)
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        DeletePrice: async (id, accessToken) => {
            await rootApi({
                method: "DELETE",
                url: `/admin/card/${id}`,
                headers: {
                    accesstoken: accessToken
                }
            }).then((res) => {
                toast.success(res.data.mess)
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        }
    },
    Clients: {
        ResetPass: async (idUser, accessToken) => {
            await rootApi({
                method: "PUT",
                url: `/admin/clients/${idUser}`,
                headers: {
                    accesstoken: accessToken
                }
            }).then((res) => {
                toast.success(res.data.mess)
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        AccpetBranch: async (idUser, accessToken, lever) => {
            await rootApi({
                method: "POST",
                url: `/admin/clients/${idUser}`,
                data: {
                    lever: lever
                },
                headers: {
                    accesstoken: accessToken
                }
            }).then((res) => {
                toast.success(res.data.mess);
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        GetHistoryByClient: async (id, accessToken, setHistory) => {
            await rootApi({
                method: "GET",
                url: `/admin/clients/${id}`,
                headers: {
                    accesstoken: accessToken
                }
            }).then((res) => {
                setHistory(res.data.ListCards)
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