import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPropertyData = createAsyncThunk("superAdminDbSlice/getPropertyData", async (args, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:8000/property", args);
      return data;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  }
);

export const getUsersData = createAsyncThunk("superAdminDbSlice/getUsersData", async (args, { rejectWithValue }) => {
  try {
    const { data } = await axios.get("http://localhost:8000/users", args);
    return data;
  } catch (e) {
    rejectWithValue(e.response.data);
  }
}
);
