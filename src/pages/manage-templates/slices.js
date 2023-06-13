import { createSlice } from '@reduxjs/toolkit'
import { AddTemplateData, GetTemplateData, updateTemplateData } from './service'

const initialState = {

}

export const manageChecklistSlice = createSlice({
  name: 'checklistSlice',
  initialState,
  reducers: {
    
  },
  extraReducers :{
    [GetTemplateData.pending]: (state, action) =>{
      return {
        ...state,
        message : "",
        status : null,
        templates:[]
      }  
    },
    [GetTemplateData.fulfilled] : (state, action)=> {


      if(action.payload?.data){
        return {
          ...state,
          templates : action.payload?.data
        }  
      } else {
        return {
          ...state,
          message : "Could Fetch  Templates",
          status : 'Failure'
        }  
      }
    },


    [AddTemplateData.pending]: (state, action) =>{
      return {
        ...state,
        message : "",
        status : null
      }  
    },
    [AddTemplateData.fulfilled] : (state, action)=> {
      if(action.payload?.data?.createTemplateData){
        return {
          ...state,
          message : "Successfuly Added",
          status : 'Success'
        }  
      } else {
        return {
          ...state,
          message : "Could not add Template",
          status : 'Failure'
        }  
      }
    },

  

    [updateTemplateData.pending]: (state, action) =>{
      return {
        ...state,
        message : "",
        status : null
      }  
    },
    [updateTemplateData.fulfilled] : (state, action)=> {
      if(action.payload?.data){
        return {
          ...state,
          message : "Successfuly Updated",
          status : 'Success'
        }  
      } else {
        return {
          ...state,
          message : "Could not update Template",
          status : 'Failure'
        }  
      }
    },

  }

})

// Action creators are generated for each case reducer function
export const {  } = manageChecklistSlice.actions

export default manageChecklistSlice.reducer