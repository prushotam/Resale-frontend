import { createSlice } from "@reduxjs/toolkit";
import { postData } from "./service";

const initialState = {
  value: 0,
  data: [],
};

export const superAdminForgotSlice = createSlice({
  name: "superAdminForgotSlice",
  initialState: {},
  reducers: {},
  extraReducers: {
    [postData.pending]: (state, action) => ({
      loading: true,
    }),

    [postData.fulfilled]: (state, action) => ({
      loading: false,
      data: action.payload,
    }),

    [postData.rejected]: (state, action) => ({
      loading: false,
    }),
  },
});

export const { increment } = superAdminForgotSlice.actions;

export default superAdminForgotSlice.reducer;
