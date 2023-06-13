import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

//import adminProperties from "../pages/admin-home/slices";
import loggedInUser from "../pages/login/slices";
import superAdminDashboard from "../pages/super-admin-dashboard/slices";
import manageUsers from "../pages/manage-users/slices"
import admins from "../pages/manage-admins/slices"
import adminTemplate from '../pages/manage-templates/slices'
import adminChecklist from '../pages/manage-checklist/slices'
import superAdminProperties from '../pages/super-admin-manageProperties/slices';
import adminAddUser from '../pages/super-admin-addUsers/slices';
import initiateOffer from '../pages/initiate-offer/slices';
import buyerHomeData from '../pages/user-home/slices';
import superAdminForgot from "../pages/super-admin-forgot-pswrd.js/slices";
import superAdminReset from "../pages/super-admin-reset-pswrd.js/slices";
import caTdsUpdate from "../pages/update-tds-details/slices";
import stages from "./extra-slices/stages.slices";
import roles from "./extra-slices/roles.slices";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  loggedInUser,
  superAdminForgot,
  superAdminReset,
  superAdminDashboard,
  manageUsers,
  admins,
  adminTemplate,
  adminChecklist,
  superAdminProperties,
  adminAddUser,
  caTdsUpdate,
  buyerHomeData,
  initiateOffer,
  stages,
  roles
})

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});
