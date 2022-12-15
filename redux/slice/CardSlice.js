import { createSlice } from "@reduxjs/toolkit";

const CardSlice = createSlice({
    name: "card",
    initialState: {
        GiaTayThe: {
            VIETTEL: [],
            MOBIFONE: [],
            VINAPHONE: [],
            VNMOBI: []
        }
    },
    reducers: {
        VIETTELSuccess: (state, actions) => {
            state.GiaTayThe.VIETTEL = actions.payload
        },
        MOBIFONESuccess: (state, actions) => {
            state.GiaTayThe.MOBIFONE = actions.payload
        },
        VINAPHONESuccess: (state, actions) => {
            state.GiaTayThe.VINAPHONE = actions.payload
        },
        VNMOBISuccess: (state, actions) => {
            state.GiaTayThe.VNMOBI = actions.payload
        },
    }
});
export const {
    VIETTELSuccess,
    MOBIFONESuccess,
    VINAPHONESuccess,
    VNMOBISuccess
} = CardSlice.actions;

export default CardSlice;