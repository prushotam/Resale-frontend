import { createSlice } from "@reduxjs/toolkit";
import { getAllStages } from "../extra-services/stages.services";
const initialState = {
    stages: [],
};

export const stagesSlice = createSlice({
    name: "stagesSlice",
    initialState,
    extraReducers: {
        [getAllStages.pending]: (state, action) => ({
            ...initialState, loading: true,
          }),

        [getAllStages.fulfilled]: (state, action) => ({
            ...initialState,
            loading: false,
            stages: action.payload?.stages,
          }),

        [getAllStages.rejected]: (state, action) => ({
            ...initialState,
            loading: false,
          }),
    }
})

export default stagesSlice.reducer;
