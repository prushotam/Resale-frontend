import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const getData = createAsyncThunk('checklistSlice/getData', async (args, {rejectWithValue}) =>{
    try {
       const {data}  = await Axios.get('');
       return data
    } catch(e) {
        rejectWithValue(e.response.data)
    }
})