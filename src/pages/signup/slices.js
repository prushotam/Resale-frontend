import { createSlice } from "@reduxjs/toolkit";
import { getPrimaryRole } from "./service";
const initialState = {
  value: 0,
  data:[],

};

export const primaryRoleSlice = createSlice({
  name: "primaryRoleSlice",
  initialState: {},
  reducers: {
   
  },
  extraReducers: {
    [getPrimaryRole.pending]: (state, action) =>{
      return {
        ...state,
        message : "",
        status : null,
        data:[]
      }  
    },
    [getPrimaryRole.fulfilled] : (state, action)=> {
      if(action?.payload?.data){
        return {
          ...state,
          message : "Successfuly Added",
          status : 'Success',
          data: action.payload.data
        }  
      } else {
        return {
          ...state,
          message : "Could not add User",
          status : 'Failure'
        }  
      }
    },
  
  },
});

export const { increment } = primaryRoleSlice.actions;

export default primaryRoleSlice.reducer;
