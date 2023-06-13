
import { createSlice } from "@reduxjs/toolkit";
import { updateData , getData , postImage, getImage} from "./service";

const initialState = {
  value: 0,
  data: [],
  imageUrl: "",
};

export const updateUserSlice= createSlice({
  name: "updateUserSlice",
  initialState: {},
  reducers: {
    setImageUrl(state, action) {
      state.imageUrl = action.payload;
    },
  },
  extraReducers: {
    [updateData.pending]: (state, action) => ({
      loading: true,
    }),

    [updateData.fulfilled]: (state, action) => ({
      loading: false,
      data: action.payload,
    }),

    [updateData.rejected]: (state, action) => ({
      loading: false,
    }),

    [getData.pending]: (state, action) => ({
      loading: true,
    }),

    [getData.fulfilled]: (state, action) => ({
      loading: false,
      data: action.payload,
    }),

    [getData.rejected]: (state, action) => ({
      loading: false,
    }),


    [postImage.pending]: (state, action) => ({
      loading: true,
    }),

    [postImage.fulfilled]: (state, action) => ({
      loading: false,
      data: action.payload,
    }),

    [postImage.rejected]: (state, action) => ({
      loading: false,
    }),

    [getImage.pending]: (state, action) => ({
      loading: true,
    }),

    [getImage.fulfilled]: (state, action) => ({
      loading: false,
      data: action.payload,
    }),

    [getImage.rejected]: (state, action) => ({
      loading: false,
    }),
  },
});

export const { increment } = updateUserSlice.actions;

export default updateUserSlice.reducer;