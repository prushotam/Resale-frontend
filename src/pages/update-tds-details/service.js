import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";


export const updateTds = createAsyncThunk(
    "caTdsUpdateSlice/updateTds", async (args, { rejectWithValue }) => {
      try {
        const { data } = await Axios.patch("http://localhost:8000/property", args);
        return data;
      } catch (e) {
        rejectWithValue(e.response.data);
      }
    }
  );