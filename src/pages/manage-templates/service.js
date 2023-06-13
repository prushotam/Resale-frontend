import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const AddTemplateData = createAsyncThunk('templateSlice/AddTemplateData', async (args, {rejectWithValue}) =>{
    try {
       const {data}  = await Axios.post('http://localhost:8000/template/', args, {
        headers:{
            "Content-Type":'multipart/form-data',
            "Authorization":  sessionStorage.getItem('authToken')
          }
       });
       return data
    } catch(e) {
        rejectWithValue(e.response.data)
    }
})


export const GetTemplateData = createAsyncThunk('templateSlice/GetTemplateData', async (args, {rejectWithValue}) =>{
    try {
       const {data}  = await Axios.get('http://localhost:8000/template/', {
        headers:{
            "Authorization":  sessionStorage.getItem('authToken')
          }
       });
       return data
    } catch(e) {
        rejectWithValue(e.response.data)
    }
})



export const updateTemplateData = createAsyncThunk('templateSlice/updateTemplateData', async (args, {rejectWithValue}) =>{
    try {
       const {data}  = await Axios.patch('http://localhost:8000/template/', args, {
        headers:{
            "Authorization":  sessionStorage.getItem('authToken')
        }
       });
       return data
    } catch(e) {
        rejectWithValue(e.response.data)
    }
})
