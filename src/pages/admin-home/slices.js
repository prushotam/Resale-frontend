import { createSlice } from '@reduxjs/toolkit'
import { getData } from './service'

const initialState = {
  value:0,
  data: [],
}

export const manageChecklistSlice = createSlice({
  name: 'checklistSlice',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
  },
  extraReducers :{
    [getData.pending] : (state, action)=> ({
      loading:true
    }),

    [getData.fulfilled] : (state, action)=>({
      loading:false,
      data : action.payload
    }),

    [getData.rejected] : (state, action)=>({
      loading:false
    }),

  }

})

// Action creators are generated for each case reducer function
export const { increment } = manageChecklistSlice.actions

export default manageChecklistSlice.reducer