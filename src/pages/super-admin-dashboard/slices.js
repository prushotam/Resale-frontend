import { createSlice } from "@reduxjs/toolkit";
import { getPropertyData, getUsersData } from "./service";

const initialState = {
  value: 0,
  propertyData:[],
  data:[],

};

export const superAdminDashboardSlice = createSlice({
  name: "superAdminDbSlice",
  initialState: {},
  reducers: {
   
  },
  extraReducers: {
    [getPropertyData.pending]: (state, action) =>{
      return {
        ...state,
        message : "",
        status : null,
        propertyData:[]
      }  
    },

    [getPropertyData.fulfilled] : (state, action)=> {
      if(action?.payload?.propertyData){
        return {
          ...state,
          propertyData: action.payload.propertyData
        }  
      } else {
        return {
          ...state,
          status : 'Failure'
        }  
      }
    },

    //User data
    [getUsersData.pending]: (state, action) =>{
      return {
        ...state,
        message : "",
        status : null,
        data:[],
      }  
    },

    [getUsersData.fulfilled] : (state, action)=> {
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

export const { increment } = superAdminDashboardSlice.actions;

export default superAdminDashboardSlice.reducer;
