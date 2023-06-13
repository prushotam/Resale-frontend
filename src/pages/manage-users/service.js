import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import {endpoint} from '../../utils/endpoints';
const env = process.env.REACT_APP_ENV 

export const getData = createAsyncThunk(
  "manageUsersSlice/getData",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get("http://localhost:8000/users");
      return data;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  }
);

export const updateUserData = createAsyncThunk(
  "adminManagePropertiesSlice/updateUserData",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await Axios.patch("http://localhost:8000/users", args, {
        headers: {
          Authorization: sessionStorage.getItem("authToken"),
        },
      });
      return data;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  }
);

export const getDeleteData = createAsyncThunk(
  "manageUsersSlice/getDeleteData",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await Axios.delete(`${endpoint[env].baseUrl}users/${userId}`, {
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

export const updateSuperAdminData = createAsyncThunk(
  "adminManagePropertiesSlice/updateSuperAdminData",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await Axios.patch(`${endpoint[env].baseUrl}superadmin`, args, {
        headers: {
          Authorization: sessionStorage.getItem("authToken"),
        },
      });
      return data;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  }
);


export const updateAdminData = createAsyncThunk(
  "adminManagePropertiesSlice/updateAdminData",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await Axios.patch(`${endpoint[env].baseUrl}admin`, args, {
        headers: {
          Authorization: sessionStorage.getItem("authToken"),
        },
      });
      return data;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  }
);
