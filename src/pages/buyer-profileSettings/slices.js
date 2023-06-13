
import { createSlice } from "@reduxjs/toolkit";
import {updateUserData } from "./service";

const initialState = {
  value: 0,
  data: [],
};

export const updateSlice= createSlice({
  name: "updateSlice",
  initialState: {},
  reducers: {},
  extraReducers: {
    [updateUserData.pending]: (state, action) => ({
      loading: true,
    }),

    [updateUserData.fulfilled]: (state, action) => ({
      loading: false,
      data: action.payload,
    }),

    [updateUserData.rejected]: (state, action) => ({
      loading: false,
    }),
  },
});

export const { increment } = updateSlice.actions;

export default updateSlice.reducer;