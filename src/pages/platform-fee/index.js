import React,{useEffect} from "react";
import Main from "../../layout/Main";

import { useSelector } from "react-redux";
import { useHistory , useLocation } from "react-router-dom";


import "./style.scss";

const PlatformFee = (props) => {
  const history = useHistory();
  const location = useLocation();
  const accessToken = useSelector((state) => state.loggedInUser?.data?.data?.accessToken) || "";
  const propertyId = useSelector((state)=> state?.buyerHomeData?.selectedProperty?._id) || '';
  const pid = location.search.split("=")[1]


  useEffect(() => {
    if (!accessToken) {
      history.push("/user-login");
    }else{
      if(!propertyId) history.push("/user-home");
      else if(pid != propertyId) history.push(`/platform-fee?pid=${propertyId}`)
    }
  }, []);

  return (
    <div>
      <Main showUserNavbar={!props?.showUserNavbar} showUser={!props?.showUser}>
        <div className="fee-container">
          <div className="fee-heading">
            <p>Pay Platform Fee</p>
          </div>
        </div>
      </Main>
    </div>
  );
};
export default PlatformFee;
