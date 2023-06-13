import { createSlice } from "@reduxjs/toolkit";
import { getData, updateUserData , getDeleteData, updateSuperAdminData ,updateAdminData} from "./service";

const initialState = {
  value: 0,
  data: [],
};

export const superAdminUserSlice = createSlice({
  name: "manageUsersSlice",
  initialState: {},
  reducers: {},

  extraReducers: {
    [getData.pending]: (state, action) => {
      return {
        ...state,
        message: "",
        status: null,
        userData: undefined,
      };
    },

    [getData.fulfilled]: (state, action) => {
      if (action?.payload?.data) {
        return {
          ...state,
          message: "Successfuly Added",
          status: "Success",
          userData: action?.payload?.data,
        };
      } else {
        return {
          ...state,
          message: "Could not add User",
          status: "Failure",
        };
      }
    },

    [updateUserData.pending]: (state, action) => {
      return {
        ...state,
        message: "",
        status: null,
        userData: [],
      };
    },

    [updateUserData.fulfilled]: (state, action) => {
      if (action?.payload?.data) {
        return {
          ...state,
          updateManagePropMessage: "Successfuly Updated",
          updateManageStatus: "Success",
          userData: action.payload.data,
        };
      } else {
        return {
          ...state,
          updateManagePropMessage: "Failed to update the property",
          updateManageStatus: "Failure",
        };
      }
    },


    [getDeleteData.pending]: (state, action) => {
      return {
        ...state,
        message: "",
        status: null,
        userData: [],
      };
    },

    [getDeleteData.fulfilled]: (state, action) => {
      if (action?.payload?.data) {
        return {
          ...state,
          updateManagePropMessage: "Successfuly Deleted",
          updateManageStatus: "Success",
          userData: action.payload.data,
        };
      } else {
        return {
          ...state,
          updateManagePropMessage: "Failed to delete the User",
          updateManageStatus: "Failure",
        };
      }
    },


    [updateSuperAdminData.pending]: (state, action) => {
      return {
        ...state,
        message: "",
        status: null,
        userData: [],
      };
    },

    [updateSuperAdminData.fulfilled]: (state, action) => {
      if (action?.payload?.data) {
        return {
          ...state,
          updateManagePropMessage: "Successfuly Deleted",
          updateManageStatus: "Success",
          userData: action.payload.data,
        };
      } else {
        return {
          ...state,
          updateManagePropMessage: "Failed to delete the User",
          updateManageStatus: "Failure",
        };
      }
    },


    [updateAdminData.pending]: (state, action) => {
      return {
        ...state,
        message: "",
        status: null,
        userData: [],
      };
    },

    [updateAdminData.fulfilled]: (state, action) => {
      if (action?.payload?.data) {
        return {
          ...state,
          updateManagePropMessage: "Successfuly Deleted",
          updateManageStatus: "Success",
          userData: action.payload.data,
        };
      } else {
        return {
          ...state,
          updateManagePropMessage: "Failed to delete the User",
          updateManageStatus: "Failure",
        };
      }
    },


    
  },
});

export const { removeUser } = superAdminUserSlice.actions;
export default superAdminUserSlice.reducer;
