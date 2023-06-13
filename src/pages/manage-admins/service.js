import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const getData = createAsyncThunk(
  "checklistSlice/getData", async (args, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get("http://localhost:8000/admin",  {
        headers:{
            "Authorization":  sessionStorage.getItem('authToken')
        }
       });
      return data;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  }
);

export const addData = createAsyncThunk(
  "checklistSlice/postData", async (args, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post("http://localhost:8000/admin/", args, {
        headers:{
            "Authorization":  sessionStorage.getItem('authToken')
        }
       });
      return data;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  }
);


export const updateData = createAsyncThunk(
  "checklistSlice/postData", async (args, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post("http://localhost:8000/admin/", args, {
        headers:{
            "Authorization":  sessionStorage.getItem('authToken')
        }
       });
      return data;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  }
);

