import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { getBuyerPropData } from "./service";
const initialState = {
    value: 0,
    data: [],
    selectedProperty:{}
};

export const buyerHomePropertiesSlice = createSlice({
    name: "buyerHomePropertiesSlice",
    initialState: {},
    reducers: {
        addSelectedProperty: (state, action)=>({
            ...state,
            selectedProperty:action.payload
        }),
        removeSelectedProperty: (state, action)=>({
            ...state,
            selectedProperty:{}
        })
    },

    extraReducers: {
        [getBuyerPropData.pending]: (state, action) => {
            return {
                ...state,
                message: "",
                status: null,
                buyerData: []
            }
        },

        [getBuyerPropData.fulfilled]: (state, action) => {
            if (action?.payload?.data) {
                return {
                    ...state,
                    message: "Successfuly Added",
                    status: 'Success',
                    buyerData: action?.payload?.data
                }
            } else {
                return {
                    ...state,
                    message: "Could not add User",
                    status: 'Failure'
                }
            }
        }
    }
})

export const {  addSelectedProperty , removeSelectedProperty } = buyerHomePropertiesSlice.actions;
export default buyerHomePropertiesSlice.reducer;
