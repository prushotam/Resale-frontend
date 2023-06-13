import { createSlice } from "@reduxjs/toolkit";
import { getAllRoles } from "../extra-services/roles.services";
const initialState = {
    roles: [],
};

export const rolesSlice = createSlice({
    name: "rolesSlice",
    initialState,
    extraReducers: {
        [getAllRoles.pending]: (state, action) => ({
            ...initialState, loading: true,
          }),

        [getAllRoles.fulfilled]: (state, action) => ({
            ...state,
            loading: false,
            roles: action.payload?.roles,
          }),

        [getAllRoles.rejected]: (state, action) => ({
            ...initialState,
            loading: false,
          }),
    }
})

export default rolesSlice.reducer;
