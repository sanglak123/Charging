import { createSlice } from "@reduxjs/toolkit";

const AdminDataSlice = createSlice({
    name: "admin",
    initialState: {
        AdminData: {
            Clients: []
        }
    },
    reducers: {
        LoadDataAdminSuccess: (state, actions) => {
            state.AdminData.Clients = actions.payload.ListClients;
        }
    }
});
export const {
    LoadDataAdminSuccess
} = AdminDataSlice.actions;

export default AdminDataSlice;