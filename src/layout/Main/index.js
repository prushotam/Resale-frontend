import React from "react";
import Sidebar from "../Sidebar";
import SearchBar from "../SearchBar";
import UserNavbar from "../UserNavBar";
import "./style.scss";
import { useLocation } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import {toggleRoleSelectionModal } from '../../pages/login/slices'
import Footer from "../Footer";

const Main = ({ children, ...props }) => {
  const url = useLocation();
  const dispatch = useDispatch();

  const role = useSelector(state => state.loggedInUser.preferredRole);
  const allAccessibleRoles = useSelector(state => state.loggedInUser.roles);

  const switchRole = ()=>{
      dispatch(toggleRoleSelectionModal())
  }
  return (
    <>
    <>
    {props?.showAdminNavbar && (
    <div className="page">
      <Sidebar {...props} role={role} allAccessibleRoles={allAccessibleRoles} handleSwitch={switchRole} showStages={url.pathname.includes('view-property')}/>
      <div className="main">
      {!url.pathname.includes('view-property') && 
       !url.pathname.includes('manage-profile') && 
       !url.pathname.includes('super-admin-settings') &&  
       !url.pathname.includes('dashboard') && 
       !url.pathname.includes('manage-checklist') &&
       !url.pathname.includes('manage-admins') &&
       <SearchBar {...props}/>}
        {children}
        {props?.showAdminFooter && (
        <Footer/>
        )}
      </div>
    </div>
    )}
    </>

    <>
     {props?.showUserNavbar && (
      <div className="buyerpage">
      <UserNavbar {...props} role={role}/>
      <div className="buyermain">
        <Sidebar {...props}  role={role} allAccessibleRoles={allAccessibleRoles} handleSwitch={switchRole}/>
        <div className="positioning">
        {children}
        <Footer/>
        </div>
      </div>
    </div>
    )}
     </>

     <>
     {props?.showWelcomePage && (
      <UserNavbar {...props}/>
      )}
      {props?.showChildren && (
      [...children]
      )}
    </>

    </>
  );
};

export default Main;
