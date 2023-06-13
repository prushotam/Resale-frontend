import React, { useState, useEffect } from "react";
import Main from "../../layout/Main";
import "./style.scss";
import { BsSearch } from "react-icons/bs";
import ellipse from "../../assets/Ellipse 58.svg";
import circlePlus from "../../assets/circle-plus.svg";
import AddPropertyModal from "../../layout/PropertyModal/AddPropertyModal/addPropertyModal";
import { useDispatch } from "react-redux";
import { getManagePropData } from "../super-admin-manageProperties/service";
import {removeSelectedProperty} from "./slices"
import BuyerHomeData from "./buyer-data";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const BuyerHome = (props) => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState('');
  const[openModal, setOpenModal]=useState(false)
  const role = sessionStorage.getItem("role");
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const history = useHistory();

  const accessToken = useSelector((state) => state.loggedInUser?.data?.data?.accessToken) || "";

  useEffect(() => {
    if (!accessToken) {
      history.push("/user-login");
    }else{
      dispatch(removeSelectedProperty());
    }
  }, []);
  const getProperties = () => {
    dispatch(getManagePropData());
  }
  
  return (
    <div>
      <Main
        showWelcomePage={!props?.showWelcomePage}
        currentScreen={"user_home"}
        showChildren={!props?.showChildren}
      >
        <div className="buyer-container">
          <div className="headings">
          {role === 'SELLER' || 
          role === 'BUYER' || 
          role === 'BANK AGENT' ||
          role === 'AGENT' ||
          role === 'POA' ||
          role === 'LAWYER' ||
          role === 'CA'
          ?
          <p className="welcomeText">Welcome, {loggedInUser.data?.data?.userByEmail?.first_name}!</p>
        :''
        }
          </div>
          <div className="search-box">
            <input type="text" className="input" placeholder="Search for properties" onChange={(e)=>setSearchValue(e.target.value)}/>
            <img src={ellipse} alt="ellipse" className="search-circle" />
            <BsSearch className="bs-search" />
          </div>

          <div className="plusCircle">
          <img
                  src={circlePlus}
                  className="manage-btn-img"
                  onClick={() => setOpenModal(!openModal)}
                />
            <p>Add Property</p>
          </div>
          <div>
            <div className="assigned">
              <p>Properties Assigned</p>
            </div>
            <BuyerHomeData searchData ={searchValue}/>
          </div>
        </div>
        <div className="desktop-footer">
          <footer>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </footer>
          <p>Copyright © 2020. Agarwal Estates. All rights reserved.</p>
        </div>
      </Main>
      <AddPropertyModal
        setIsDisplay={() => setOpenModal(!openModal)}
        isDisplay={openModal}
        getUpdatedProperty = {getProperties}
      />      
    </div>
  );
};
export default BuyerHome;