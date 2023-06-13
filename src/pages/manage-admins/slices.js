import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { getData, addData , updateData } from "./service";

const initialState = {
  value: 0,
  data:[],

};

export const superAdminListSlice = createSlice({
  name: "manageAdminsSlice",
  initialState: {},
  reducers: {
   
  },
  extraReducers: {
    [getData.pending]: (state, action) =>{
      return {
        ...state,
        message : "",
        status : null,
        adminData:[]
      }  
    },

    [getData.fulfilled] : (state, action)=> {
      if(action?.payload?.adminData){
        return {
          ...state,
          adminData: action.payload.adminData
        }  
      } else {
        return {
          ...state,
          status : 'Failure'
        }  
      }
    },

    //add data
    [addData.pending]: (state, action) =>{
      return {
        ...state,
        message : "",
        status : null,
      }  
    },

    [addData.fulfilled] : (state, action)=> {
      if(action?.payload?.adminData){
        return {
          ...state,
          message : "Successfuly Added",
          status : 'Success',
          adminData: action.payload.adminData
        }  
      } else {
        return {
          ...state,
          message : "Could not add User",
          status : 'Failure'
        }  
      }
    },

    //update data
    [updateData.pending]: (state, action) =>{
      return {
        ...state,
        message : "",
        status : null,
      }  
    },

    [updateData.fulfilled] : (state, action)=> {
      if(action?.payload?.adminData){
        return {
          ...state,
          message : "Successfuly Updated",
          status : 'Success',
          adminData: action.payload.adminData
        }  
      } else {
        return {
          ...state,
          message : "Could not Update User",
          status : 'Failure'
        }  
      }
    },

    
  },
});

export const { increment } = superAdminListSlice.actions;

export default superAdminListSlice.reducer;
