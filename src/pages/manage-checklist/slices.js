import { createSlice } from '@reduxjs/toolkit'
import { AddChecklistData, GetChecklistData, UpdateChecklistData,DeleteChecklistData } from './service'

const initialState = {

}

export const manageChecklistSlice = createSlice({
  name: 'checklistSlice',
  initialState,
  reducers: {
    
  },
  extraReducers :{
    [GetChecklistData.pending]: (state, action) =>{
      return {
        ...state,
        message : "",
        status : null,
        checklists:[]
      }  
    },
    [GetChecklistData.fulfilled] : (state, action)=> {
      if(action.payload?.data){
        return {
          ...state,
          checklists : action.payload?.data
        }  
      } else {
        return {
          ...state,
          message : "Could Fetch Checklists",
          status : 'Failure'
        }  
      }
    },


    [AddChecklistData.pending]: (state, action) =>{
      return {
        ...state,
        message : "",
        status : null
      }  
    },

    [AddChecklistData.fulfilled] : (state, action)=> {
      if(action.payload?.data?.createChecklistData){
        return {
          ...state,
          message : "Successfuly Added",
          status : 'Success'
        }  
      } else {
        return {
          ...state,
          message : "Could not add Checklist",
          status : 'Failure'
        }  
      }
    },

  

    [UpdateChecklistData.pending]: (state, action) =>{
      return {
        ...state,
        message : "",
        status : null
      }  
    },
    [UpdateChecklistData.fulfilled] : (state, action)=> {
      if(action.payload?.data){
        return {
          ...state,
          message : "Successfuly Updated",
          status : 'Success'
        }  
      } else {
        return {
          ...state,
          message : "Could not update Checklist",
          status : 'Failure'
        }  
      }
    },


    [DeleteChecklistData.pending]: (state, action) =>{
      return {
        ...state,
        message : "",
        status : null
      }  
    },
    [DeleteChecklistData.fulfilled] : (state, action)=> {
      if(action.payload?.data){
        return {
          ...state,
          message : "Successfuly Deleted",
          status : 'Success'
        }  
      } else {
        return {
          ...state,
          message : "Could not delete Checklist",
          status : 'Failure'
        }  
      }
    },

  }

})

// Action creators are generated for each case reducer function
export const {  } = manageChecklistSlice.actions

export default manageChecklistSlice.reducer