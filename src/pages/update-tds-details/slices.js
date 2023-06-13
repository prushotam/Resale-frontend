import { createSlice } from "@reduxjs/toolkit";
import { updateTds } from "./service";
const initialState = {
  value: 0,
  updateTdsMessage: "",
  updateTdsStatus: "",
  propertyData: []
};

export const caTdsUpdateSlice = createSlice({
  name: "caTdsUpdateSlice",
  initialState: {},
  reducers: {
  },
  extraReducers: {
    [updateTds.pending]: (state, action) =>{
      return {
        ...state,
        message : "",
        status : null,
        propertyData:[]
      }  
    },
    [updateTds.fulfilled] : (state, action)=> {
      if(action?.payload?.propertyData){
        return {
          ...state,
          updateTdsMessage : "Successfuly Updated",
          updateTdsStatus : 'Success',
          propertyData: action.payload.propertyData
        }  
      } else {
        return {
          ...state,
          updateTdsMessage : "Failed to update the property",
          updateTdsStatus : 'Failure'
        }  
      }
    },
  },
});



export default caTdsUpdateSlice.reducer;
