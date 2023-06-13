import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import {endpoint} from '../../utils/endpoints'


const env = process.env.REACT_APP_ENV 

export const getAllRoles = createAsyncThunk(
    "rolesSlice/getAllRoles", async (args, { rejectWithValue }) => {
        try {
            const { data } = await Axios.get(`${endpoint[env].baseUrl}roles`, args);
            return data;
        } catch (e) {
            rejectWithValue(e.response.data);
        }
    });