import { createSlice } from "@reduxjs/toolkit";

const CardSlice = createSlice({
    name: "card",
    initialState: {
        ListPrices: []
    },
    reducers: {
        ListPriceSuccess: (state, actions) => {
            state.ListPrices = actions.payload
        }
    }
});
export const {
    ListPriceSuccess
} = CardSlice.actions;

export default CardSlice;