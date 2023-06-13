import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import {endpoint} from '../../utils/endpoints';
const env = process.env.REACT_APP_ENV 


export const updateData = createAsyncThunk('updateUserSlice/postData', async (args, {rejectWithValue}) =>{
  try {
     const {data}  = await Axios.patch(`${endpoint[env].baseUrl}superadmin`,args);
     return data
  } catch(e) {
      rejectWithValue(e.response.data)
  }
})

export const getData = createAsyncThunk('updateUserSlice/postData', async (args, {rejectWithValue}) =>{
  try {
     const {data}  = await Axios.get(`${endpoint[env].baseUrl}superadmin`,args);
     return data
  } catch(e) {
      rejectWithValue(e.response.data)
  }
})


export const postImage = createAsyncThunk( "updateUserSlice/postImage", async (args, { rejectWithValue }) => {
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  try {
    const { data } = await Axios.post(`${endpoint[env].baseUrl}images`, args, config );
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}
);


export const getImage = async (imageId) => {
  try {
    const config = {
      responseType: 'arraybuffer',
    };

    const response = await Axios.get(`${endpoint[env].baseUrl}images/${imageId}`, config);

    const data = Buffer.from(response.data, 'binary').toString('base64');
    return data;
  } catch (error) {
    throw error;
  }
};





