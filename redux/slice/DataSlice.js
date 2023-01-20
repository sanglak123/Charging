import { createSlice } from "@reduxjs/toolkit";

const DataSlice = createSlice({
    name: "data",
    initialState: {
        Prices: [],
        TypeCards: [],
        ListBanks: []
    },
    reducers: {
        ListBankSuccess: (state, actions) => {
            state.ListBanks = actions.payload;
        },
        PriceBuyCardSuccess: (state, actions) => {
            state.PriceBuyCards = actions.payload;
        },
        PriceChangeCardSuccess: (state, actions) => {
            state.PriceChangeCards = actions.payload;
        },
        DataSuccess: (state, actions) => {
            state.ListBanks = actions.payload.ListBanks;
            state.Prices = actions.payload.Prices;
            state.TypeCards = actions.payload.TypeCards
        }
    }
});
export const {
    ListBankSuccess,
    PriceBuyCardSuccess,
    PriceChangeCardSuccess,
    DataSuccess
} = DataSlice.actions;

export default DataSlice;