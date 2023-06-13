import { createSlice } from "@reduxjs/toolkit";
import { storeDocument, postGenerateApi } from "./service";
const initialState = {
  value: 0,
  data: [],
};

export const initiateOfferSlice = createSlice({
  name: "initiateOfferSlice",
  initialState: {},
  reducers: {},
  extraReducers: {
    [postGenerateApi.pending]: (state, action) => {
      return {
        ...state,
        addPropMessage: "",
        addPropStatus: null,
        addPropertyData: []
      }
    },

    [postGenerateApi.fulfilled]: (state, action) => {
      if (action?.payload?.createPropertyData?.HTMLParsedData) {
        return {
          ...state,
          addPropMessage: "Generate Successfully",
          addPropStatus: 'Success',
          addPropertyData: action.payload.createPropertyData.HTMLParsedData
        }
      } else {
        return {
          ...state,
          addPropMessage: "Unable to generate",
          addPropStatus: 'Failure'
        }
      }
    },
    [storeDocument.pending]: (state, action) => {
      return {
        ...state,
        addPropMessage: "",
        addPropStatus: null,
        addPropertyData: []
      }
    },

    [storeDocument.fulfilled]: (state, action) => {
      if (action) {
        return {
          ...state,
          addStoreDocument: 200
        }
      } else {
        return {
          ...state,
          addPropMessage: "Unable to generate",
          addPropStatus: 'Failure'
        }
      }
    },
  },
});

export default initiateOfferSlice.reducer;
