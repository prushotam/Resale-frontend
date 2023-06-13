import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import {endpoint} from '../../utils/endpoints'

const env = process.env.REACT_APP_ENV 
export const postGenerateApi = createAsyncThunk(
  "initiateOfferSlice/postGenerateApi", async (payload, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post(`${endpoint[env].baseUrl}property/generateDocument`, payload);
      return data;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  });

  export const storeDocument = createAsyncThunk(
    "initiateOfferSlice/storeDocument",
    async (payload, { rejectWithValue }) => {
      try {
        const { data } = await Axios.put(`${endpoint[env].baseUrl}property/storeDocument`,payload);
        return data;
      } catch (e) {
        rejectWithValue(e.response.data);
      }
    }
  );