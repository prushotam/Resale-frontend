import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import {endpoint} from '../../utils/endpoints'


const env = process.env.REACT_APP_ENV || 'development'

const endpointMap = {
  '/super-admin-login' : `${endpoint[env].baseUrl}superadmin/login`,
  '/admin-login' :  `${endpoint[env].baseUrl}admin/login`,
  '/user-login' :  `${endpoint[env].baseUrl}user/login`
}

const roleMapping = {
  '/super-admin-login' : {role_name:'SUPERADMIN'},
  '/admin-login' :  {role_name:'ADMIN'},
}



export const postData = createAsyncThunk('loggedInUserSlice/postData', async (args, {rejectWithValue}) =>{
  try {
    const {path , email , password} = args;
     const {data}  = await Axios.post(endpointMap[path],{email,password});
    const role = roleMapping[path] ?  [roleMapping[path]] : [data.data?.userByEmail?.primary_role];

     return {data , role}
  } catch(e) {
      rejectWithValue(e.response.data)
  }
})