import { createSlice } from "@reduxjs/toolkit";

const ClientSlice = createSlice({
    name: "client",
    initialState: {
        Client: [],
        HistoryChangeCards: [],
        HistoryBuyCards: [],
        Store: []
    },
    reducers: {
        LoginSuccess: (state, actions) => {
            state.Client = actions.payload
        },
        LogoutSuccess: (state) => {
            state.Client = [];
            state.Store = [];
            state.HistoryBuyCards = [];
            state.HistoryChangeCards = [];
        },
        ChooseCardSuccess: (state, actions) => {
            const index = state.Store.findIndex(el => el.telco === actions.payload.telco && el.value === actions.payload.value);
            if (index >= 0) {
                return;
            } else {
                state.Store = [...state.Store, actions.payload]
            }
        },
        AddCardSuccess: (state, actions) => {
            const index = state.Store.findIndex(el => el.telco === actions.payload.telco && el.value === actions.payload.value);
            if (index >= 0) {
                state.Store[index].count += 1;
            }
        },
        SubtractionCardSuccess: (state, actions) => {
            const index = state.Store.findIndex(el => el.telco === actions.payload.telco && el.value === actions.payload.value);
            if (index >= 0) {
                if (state.Store[index].count > 1) {
                    state.Store[index].count -= 1;
                } else {
                    state.Store.splice(index, 1);
                }
            }
        },
        DeleteCardSuccess: (state, actions) => {
            const index = state.Store.findIndex(el => el.telco === actions.payload.telco && el.value === actions.payload.value);
            if (index >= 0) {
                state.Store.splice(index, 1);
            }
        },
        BuyCardSuccess: (state, actions) => {
            state.Store = [];
        },
        //History Change card
        HistoryChangeCardSuccess: (state, actions) => {
            state.HistoryChangeCards = actions.payload
        },
        HistoryBuyCardSuccess: (state, actions) => {
            state.HistoryBuyCards = actions.payload
        }
    }
});
export const {
    //Authen
    LoginSuccess,
    LogoutSuccess,

    //Store
    ChooseCardSuccess,
    AddCardSuccess,
    SubtractionCardSuccess,
    DeleteCardSuccess,
    BuyCardSuccess,

    //History Change Card
    HistoryChangeCardSuccess,
    HistoryBuyCardSuccess
} = ClientSlice.actions;

export default ClientSlice;