import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";


   export const addUser = createAsyncThunk(
      "superAdminAddUserSlice/addUser", async (payload, { rejectWithValue }) => {
        try {
          const { data } = await Axios.post("http://localhost:8000/users", payload);
          return data;
        } catch (e) {
          rejectWithValue(e.response.data);
        }
      });

    