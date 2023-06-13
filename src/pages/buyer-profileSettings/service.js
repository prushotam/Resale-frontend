import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { endpoint } from '../../utils/endpoints';
const env = process.env.REACT_APP_ENV


export const updateUserData = createAsyncThunk('updateSlice/updateUserData ', async (args, {rejectWithValue}) =>{
  try {
     const {data}  = await Axios.patch(`${endpoint[env].baseUrl}users`,args);
     return data
  } catch(e) {
      rejectWithValue(e.response.data)
  }
})
