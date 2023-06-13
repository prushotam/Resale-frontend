import { createSlice } from "@reduxjs/toolkit";
import { postData } from "./service";

const initialState = {
  value: 0,
  data: [],
  roles:[],
  preferredRole:'',
  isRoleSelectionModalOpen: false,
  selectedRole:{},
  error:{}
};

export const loggedInUserSlice = createSlice({
  name: "loggedInUserSlice",
  initialState,
  reducers: {
    logoutUser: (state, action)=>{
        return initialState
    },
    updatePreferredRole: (state, action)=>({
        ...state,
        preferredRole : action.payload ,
        isRoleSelectionModalOpen : false
    }),
    toggleRoleSelectionModal:(state, action)=>{
      state.isRoleSelectionModalOpen = !state.isRoleSelectionModalOpen
    }
  },
  extraReducers: {
    [postData.pending]: (state, action) => ({
      ...initialState, loading: true,
    }),

    [postData.fulfilled]: (state, action) => ({
      ...initialState,
      loading: false,
      data: action.payload?.data,
      roles: action.payload?.role,
      preferredRole : Array.isArray(action.payload?.role) && action.payload.role?.length === 1 ?  action.payload.role?.[0]?.role_name : '',
      selectedRole : Array.isArray(action.payload?.role) && action.payload.role?.length === 1 ?  action.payload.role?.[0] : {},
      isRoleSelectionModalOpen: Array.isArray(action.payload?.role) && action.payload.role?.length > 1
    }),

    [postData.rejected]: (state, action) => ({
      ...initialState,
      loading: false,
    }),
  },
});

export const {  logoutUser , updatePreferredRole ,toggleRoleSelectionModal} = loggedInUserSlice.actions;

export default loggedInUserSlice.reducer;
