import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";


export const postData = createAsyncThunk('superAdminResetSlice/postData', async (args, {rejectWithValue}) =>{
  try {
     const {data}  = await Axios.post('http://localhost:8000/superadmin/reset',args);
     return data
  } catch(e) {
      rejectWithValue(e.response.data)
  }
})