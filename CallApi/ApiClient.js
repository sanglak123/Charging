import { toast } from "react-toastify";
import { rootApi } from "./apiConfig";

export const ApiClients = {
    Data: {
        LoadingData: async (dispatch, DataSuccess) => {
            await rootApi({
                method: "GET",
                url: "/data"
            }).then((res) => {
                dispatch(DataSuccess(res.data))
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        GetValueByTelco: async (telco, setCard, type) => {
            await rootApi({
                method: "GET",
                url: `/data/price/${telco}`
            }).then((res) => {
                setCard({
                    telco: telco,
                    value: res.data.value,
                    type: type
                })
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        }
    },
    Authen: {
        Register: async (userName, displayName, phone, email, pass1, router, admin, key) => {
            if (!admin) {
                await rootApi({
                    method: "POST",
                    url: "/clients/authen/register",
                    data: {
                        userName: userName,
                        displayName: displayName,
                        phone: phone,
                        email: email,
                        pass1: pass1,
                        admin: admin
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
            } else {
                await rootApi({
                    method: "POST",
                    url: "/admin/authen/register",
                    data: {
                        userName: userName,
                        displayName: displayName,
                        phone: phone,
                        email: email,
                        pass1: pass1,
                        admin: admin,
                        key: key
                    }
                }).then((res) => {
                    router.replace("/login")
                }).catch((err) => {
                    if (err.response) {
                        toast.error(err.response.data.error);
                    } else {
                        toast.error(err);
                    }
                })
            }

        },
        Login: async (userName, pass1, dispath, LoginSuccess, router) => {
            await rootApi({
                method: "POST",
                url: "/clients/authen/login",
                data: {
                    userName: userName,
                    pass1: pass1
                }
            }).then((res) => {
                toast.success("Đăng nhập thành công!");
                if (res.data.Client.admin) {
                    dispath(LoginSuccess(res.data));
                    router.replace("/admin/dashboard");
                } else {
                    dispath(LoginSuccess(res.data));
                    router.replace("/");
                }

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
                url: "/clients/authen/logout"
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
    Card: {
        PostCard: async (telco, code, seri, value, acessToken, id) => {
            await rootApi({
                method: "POST",
                url: `/clients/card/postcard/${id}`,
                data: {
                    telco, code, seri, value
                },
                headers: {
                    accesstoken: acessToken
                }
            }).then((res) => {
                toast.success(res.data.mess)
                setTimeout(async () => {
                    await ApiClients.Card.CheckCard(telco, code, seri, value, id, acessToken)
                }, 20000)
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error)
                } else {
                    toast.error(err)
                }
            })
        },
        BuyCard: async (telco, value, count, idUser, idToast) => {
            await rootApi({
                method: "POST",
                timeout: 30000,
                url: "/clients/card/buycard",
                data: { telco, value, count, idUser }
            }).then((res) => {
                console.log(res.data);
                setTimeout(() => {
                    toast.update(idToast, { render: res.data.mess, type: "success", isLoading: false });
                }, 1000);

            }).catch((err) => {
                if (err.response) {
                    setTimeout(() => {
                        toast.update(idToast, { render: err.response.data.error, type: "error", isLoading: false });
                    }, 1000);
                } else {
                    setTimeout(() => {
                        toast.update(idToast, { render: err, type: "error", isLoading: false });
                    }, 1000);
                }
            })
        },
        CheckCard: async (telco, code, seri, value, idUser, accessToken) => {
            await rootApi({
                method: "POST",
                url: "/card/checkcard",
                data: {
                    telco: telco,
                    code: code,
                    seri: seri,
                    value: value,
                    idUser: idUser
                },
                headers: {
                    accesstoken: accessToken
                }
            }).then((res) => {
                if (res.data.status === 1 || res.data.status === 2) {
                    toast.success(res.data.mess)
                } else if (res.data.status === 3 || res.data.status === 4) {
                    toast.error(res.data.mess)
                }
                else if (res.data.status === 99) {
                    setTimeout(async () => {
                        await ApiClients.Card.CheckCard(telco, code, seri, value, idUser, accessToken)
                    }, 10000)
                }
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error)
                } else {
                    toast.error(err)
                }
            })
        },
        GetHistory: async (dispatch, ActionSuccess, id, command) => {
            await rootApi({
                method: "GET",
                url: `/clients/card/history/${id}/${command}`
            }).then((res) => {
                dispatch(ActionSuccess(res.data.Historys));
            }).catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else {
                    toast.error(err);
                }
            })
        },
        DeleteCard: async (id, idToast) => {
            await rootApi({
                method: "DELETE",
                url: `/clients/card/${id}`
            }).then((res) => {
                setTimeout(() => {
                    toast.update(idToast, { render: res.data.mess, type: "success", isLoading: false });
                }, 1000);
            }).catch((err) => {
                if (err.response) {
                    setTimeout(() => {
                        toast.update(idToast, { render: err.response.data.error, type: "error", isLoading: false });
                    }, 1000);
                } else {
                    setTimeout(() => {
                        toast.update(idToast, { render: err, type: "error", isLoading: false });
                    }, 1000);
                }
            })
        }
    }
}