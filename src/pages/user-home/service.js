import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import {endpoint} from '../../utils/endpoints'


const env = process.env.REACT_APP_ENV 
export const getBuyerPropData = createAsyncThunk(
    "buyerHomePropertiesSlice/getBuyerPropData", async (userId, { rejectWithValue }) => {
      try {
        const { data } = await Axios.get(`${endpoint[env].baseUrl}users/getProperties/${userId}`);
        return data;
      } catch (e) {
        rejectWithValue(e.response.data);
      }
    }
  );
  