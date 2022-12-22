import { createSlice } from "@reduxjs/toolkit";

const ClientSlice = createSlice({
    name: "client",
    initialState: {
        Client: [],
        Store: []
    },
    reducers: {
        LoginSuccess: (state, actions) => {
            state.Client = actions.payload
        },
        LogoutSuccess: (state) => {
            state.Client = [];
        }
    }
});
export const {
    LoginSuccess,
    LogoutSuccess
} = ClientSlice.actions;

export default ClientSlice;