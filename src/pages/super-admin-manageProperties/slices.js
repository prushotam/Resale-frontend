import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import {
  getPropertiesData,
  getManagePropData,
  postAddProperty,
  updateManagePropData,
  updateCheckListType,
  getStagesData,
  getRoleId,
  getCheckListFolder,
  updateCheckListDocument,
  getAllFilesInsideChecklist,
  getFileFromChecklist,
  deletePropertiesData,
  updatePropertyStage
} from "./service";
const initialState = {
  value: 0,
  data: [],
  propertyStageData:{}
};

export const adminManagePropertiesSlice = createSlice({
  name: "adminManagePropertiesSlice",
  initialState: initialState,
  reducers: {

  },
  extraReducers: {
    [getPropertiesData.pending]: (state, action) => {
      return {
        ...state,
        message: "",
        status: null,
        propertyData: undefined
      }
    },

    [getPropertiesData.fulfilled]: (state, action) => {
      if (action?.payload?.propertyData) {
        return {
          ...state,
          message: "Successfuly Added",
          status: 'Success',
          propertyData: action.payload.propertyData
        }
      } else {
        return {
          ...state,
          message: "Could not add User",
          status: 'Failure'
        }
      }
    },
    [getManagePropData.pending]: (state, action) => {
      return {
        ...state,
        message: "",
        status: null,
        managePropertyData: []
      }
    },

    [getManagePropData.fulfilled]: (state, action) => {
      if (action?.payload?.propertyData) {
        return {
          ...state,
          message: "Successfuly Added",
          status: 'Success',
          managePropertyData: action?.payload?.propertyData
        }
      } else {
        return {
          ...state,
          message: "Could not add User",
          status: 'Failure'
        }
      }
    },
    [postAddProperty.pending]: (state, action) => {
      return {
        ...state,
        addPropMessage: "",
        addPropStatus: null,
        addPropertyData: []
      }
    },
    [postAddProperty.fulfilled]: (state, action) => {
      if (action?.payload?.propertyData) {
        return {
          ...state,
          addPropMessage: `Property "ID No. - ${action?.payload?.propertyData?.re_id}" is added Successfully`,
          addPropStatus: 'Success',
          addPropertyData: action.payload.propertyData
        }
      } else {
        return {
          ...state,
          addPropMessage: "Unable to add Property",
          addPropStatus: 'Failure'
        }
      }
    },
    [updateManagePropData.pending]: (state, action) => {
      return {
        ...state,
        message: "",
        status: null,
        propertyData: []
      }
    },

    [updateManagePropData.fulfilled]: (state, action) => {
      if (action?.payload?.propertyData) {
        return {
          ...state,
          updateManagePropMessage: "Successfuly Updated",
          updateManageStatus: 'Success',
          propertyData: action.payload.propertyData
        }
      } else {
        return {
          ...state,
          updateManagePropMessage: "Failed to update the property",
          updateManageStatus: 'Failure'
        }
      }
    },
    [updateCheckListType.pending]: (state, action) => {
      ;
      return {
        ...state,
        message: "",
        status: null,
        checkListData: undefined
      }
    },
    [updateCheckListType.fulfilled]: (state, action) => {
      ;
      if (action?.payload) {
        return {
          ...state,
          message: "Successfuly Added",
          status: 'Success',
          checkListData: action?.payload?.data
        }
      } else {
        return {
          ...state,
          message: "Could not add User",
          status: 'Failure'
        }
      }
    },
    [getStagesData.pending]: (state, action) => {
      return {
        ...state,
        message: "",
        status: null,
        stages: []
      }
    },

    [getStagesData.fulfilled]: (state, action) => {
      if (action?.payload?.stages) {
        return {
          ...state,
          message: "Successfuly Added",
          status: 'Success',
          stages: action?.payload?.stages
        }
      } else {
        return {
          ...state,
          message: "Could not add User",
          status: 'Failure'
        }
      }
    },
    [getRoleId.pending]: (state, action) => {
      return {
        ...state,
        message: "",
        status: null,
        roles: []
      }
    },

    [getRoleId.fulfilled]: (state, action) => {
      if (action?.payload?.roles) {
        return {
          ...state,
          message: "Success",
          status: 'Success',
          roles: action?.payload?.roles
        }
      } else {
        return {
          ...state,
          message: "Failure",
          status: 'Failure'
        }
      }
    },
    [getCheckListFolder.pending]: (state, action) => {
      return {
        ...state,
        message: "",
        status: null,
        folderStructure: []
      }
    },

    [getCheckListFolder.fulfilled]: (state, action) => {
      if (action?.payload?.folderStructure) {
        return {
          ...state,
          message: "Success",
          status: 'Success',
          folderStructure: action?.payload?.folderStructure
        }
      } else {
        return {
          ...state,
          message: "Failure",
          status: 'Failure'
        }
      }
    },

    [updateCheckListDocument.pending]: (state, action) => {
      return {
        ...state,
        message: "",
        status: null,
        folderStructure: []
      }
    },

    [updateCheckListDocument.fulfilled]: (state, action) => {
      if (action?.payload?.folderStructure) {
        return {
          ...state,
          message: "Document uploaded successfully",
          status: 'Success',
          checkListDoc: action?.payload?.folderStructure
        }
      } else {
        return {
          ...state,
          message: "Failure",
          status: 'Failure'
        }
      }
    },
    [getAllFilesInsideChecklist.pending]: (state, action) => {
      return {
        ...state,
        checkListMessage: "",
        checkListStatus: null,
        checkListDoc: []
      }
    },

    [getAllFilesInsideChecklist.fulfilled]: (state, action) => {
      if (action?.payload?.folderStructure) {
        return {
          ...state,
          checkListMessage: "Success",
          checkListStatus: 'Success',
          checkListDoc: action?.payload?.folderStructure
        }
      } else {
        return {
          ...state,
          checkListMessage: "Failure",
          checkListStatus: 'Failure',
          checkListDoc: []
        }
      }
    },

    [getFileFromChecklist.pending]: (state, action) => {
      return {
        ...state,
        propertyDocMessage: "",
        propertyDocStatus: null,
        propertyDoc: []
      }
    },

    [getFileFromChecklist.fulfilled]: (state, action) => {
      if (action?.payload) {
        return {
          ...state,
          propertyDocMessage: "Success",
          propertyDocStatus: 'Success',
          propertyDoc: action?.payload
        }
      } else {
        return {
          ...state,
          propertyDocMessage: "Failure",
          propertyDocStatus: 'Failure',
          propertyDoc: []
        }
      }
    },

    [deletePropertiesData.pending]: (state, action) => {
      return {
        ...state,
        message: "",
        status: null,
        propertyData: undefined
      }
    },

    [deletePropertiesData.fulfilled]: (state, action) => {
      if (action?.payload?.propertyData) {
        return {
          ...state,
          message: "Successfuly Deleted",
          status: 'Success',
          propertyData: action.payload.propertyData
        }
      } else {
        return {
          ...state,
          message: "Could not delete the Property",
          status: 'Failure'
        }
      }
    },
    [updatePropertyStage.pending]: (state, action) => ({
      ...state, loading: true,
    }),

    [updatePropertyStage.fulfilled]: (state, action) => ({
      ...state,
      propertyStageData:action.payload?.data,
      loading: false,
      
    }),

    [updatePropertyStage.rejected]: (state, action) => ({
      ...state,
      loading: false,
      message: "Could not update stage of  the Property",
      status: 'Failure'
    }),
  },
});

export const { increment } = adminManagePropertiesSlice.actions;

export default adminManagePropertiesSlice.reducer;