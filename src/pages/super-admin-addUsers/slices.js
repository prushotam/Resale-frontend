import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { addUser } from "./service";
const initialState = {
  value: 0,
  data:[],

};

export const superAdminAddUserSlice = createSlice({
  name: "superAdminAddUserSlice",
  initialState: {},
  reducers: {
   
  },
  extraReducers: {
    [addUser.pending]: (state, action) =>{
      return {
        ...state,
        message : "",
        status : null,
        data:[]
      }  
    },
    [addUser.fulfilled] : (state, action)=> {
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

export const { increment } = superAdminAddUserSlice.actions;

export default superAdminAddUserSlice.reducer;
