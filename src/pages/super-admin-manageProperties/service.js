import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { endpoint } from '../../utils/endpoints';
const env = process.env.REACT_APP_ENV

export const getPropertiesData = createAsyncThunk(
  "adminManagePropertiesSlice/getPropertiesData", async (propertyId, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(`${endpoint[env].baseUrl}property/${propertyId}`);
      return data;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  });

export const getManagePropData = createAsyncThunk(
  "adminManagePropertiesSlice/getManagePropData", async (args, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(`${endpoint[env].baseUrl}property`, args);
      return data;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  });

export const postAddProperty = createAsyncThunk(
  "adminManagePropertiesSlice/postAddProperty", async (payload, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post(`${endpoint[env].baseUrl}property`, payload);
      return data;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  });

export const updateManagePropData = createAsyncThunk(
  "adminManagePropertiesSlice/updateManagePropData", async (args, { rejectWithValue }) => {
    try {
      const { data } = await Axios.patch(`${endpoint[env].baseUrl}property`, args);
      return data;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  }
);

export const updateCheckListType = createAsyncThunk(
  "adminManagePropertiesSlice/updateCheckListType", async (checklistType, { rejectWithValue }) => {
    try {
      const config = {
        headers: { Authorization: checklistType.accessToken }
      };
      const { data } = await Axios.get(`http://localhost:8000/checklist/type/${checklistType.type}`, config);
      return data;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  }
);

export const getStagesData = createAsyncThunk(
  "adminManagePropertiesSlice/getStagesData", async (args, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(`${endpoint[env].baseUrl}stages`, args);
      return data;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  });

export const getRoleId = createAsyncThunk(
  "adminManagePropertiesSlice/getRoleId", async (args, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(`${endpoint[env].baseUrl}roles`, args);
      return data;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  }
);

export const getCheckListFolder = createAsyncThunk(
  "adminManagePropertiesSlice/getCheckListFolder", async (propertyId, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(`${endpoint[env].baseUrl}property/createChecklistFolder/${propertyId}`);
      return data;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  }
);

export const updateCheckListDocument = createAsyncThunk(
  "adminManagePropertiesSlice/updateCheckListDocument", async (args, { rejectWithValue }) => {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    };
    try {
      const { data } = await Axios.post(`${endpoint[env].baseUrl}property/uploadChecklistDocument`, args, config);
      return data;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  }
);

export const getAllFilesInsideChecklist = createAsyncThunk(
  "adminManagePropertiesSlice/getAllFilesInsideChecklist", async (args, { rejectWithValue }) => {
    try {
      const { data } = await Axios.put(`${endpoint[env].baseUrl}property/getAllFilesInsideChecklist`, args);
      return data;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  });

  export const getFileFromChecklist = createAsyncThunk(
    "adminManagePropertiesSlice/getFileFromChecklist", async (args, { rejectWithValue }) => {
      try {
        const { data } = await Axios.put(`${endpoint[env].baseUrl}property/getFileFromChecklist`, args);
        return data;
      } catch (e) {
        rejectWithValue(e.response.data);
      }
    });


    export const deletePropertiesData = createAsyncThunk(
      "adminManagePropertiesSlice/deletePropertiesData", async (propertyId, { rejectWithValue }) => {
        try {
          const { data } = await Axios.delete(`${endpoint[env].baseUrl}property/${propertyId}`);
          return data;
        } catch (e) {
          rejectWithValue(e.response.data);
        }
      });

      export const updatePropertyStage = createAsyncThunk(
        "adminManagePropertiesSlice/updatePropertyStage", async (args, { rejectWithValue }) => {
          try {
            const { data } = await Axios.put(`${endpoint[env].baseUrl}rules/initiateStageChange`, args);
            return data;
          } catch (e) {
            rejectWithValue(e.response.data);
          }
        });