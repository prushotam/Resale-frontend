import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import {endpoint} from '../../utils/endpoints';
const env = process.env.REACT_APP_ENV 

export const AddChecklistData = createAsyncThunk('checklistSlice/AddChecklistData', async (args, {rejectWithValue}) =>{
    try {
       const {data}  = await Axios.post('http://localhost:8000/checklist/', args, {
        headers:{
            "Authorization":  sessionStorage.getItem('authToken')
          }
       });
       return data
    } catch(e) {
        rejectWithValue(e.response.data)
    }
})


export const GetChecklistData = createAsyncThunk('checklistSlice/GetChecklistData', async (args, {rejectWithValue}) =>{
    try {
       const {data}  = await Axios.get('http://localhost:8000/checklist/', {
        headers:{
            "Authorization":  sessionStorage.getItem('authToken')
        }
       });
       return data
    } catch(e) {
        rejectWithValue(e.response.data)
    }
})


export const UpdateChecklistData = createAsyncThunk('checklistSlice/updateChecklistData', async (args, {rejectWithValue}) =>{
    try {
       const {data}  = await Axios.patch('http://localhost:8000/checklist/', args, {
        headers:{
            "Authorization": sessionStorage.getItem('authToken')
        }
       });
       return data
    } catch(e) {
        rejectWithValue(e.response.data)
    }
})

export const DeleteChecklistData = createAsyncThunk( "checklistSlice/deleteChecklistData", async (checklistId, { rejectWithValue }) => {
      try {
        const { data } = await Axios.delete(`${endpoint[env].baseUrl}checklist/${checklistId}`, {
          headers: {
            "Authorization": sessionStorage.getItem('authToken')
          }
        });
        return data;
      } catch (e) {
        rejectWithValue(e.response.data);
      }
    }
  );
