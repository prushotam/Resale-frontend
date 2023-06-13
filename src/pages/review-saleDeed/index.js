import React , {useEffect} from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import InitiateOffers from "../../commonComponent/initiateOffers";

const ReviewSaleDeed = () => {

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
      else if(pid != propertyId) history.push(`/review-sale-deed?pid=${propertyId}`)
    }
  }, []);

  return (
    <InitiateOffers
      templateSubType="SALE_DEED"
      templateType="DOCUMENT"
      heading="Initiate Sale Deed"
    />
  );
};

export default ReviewSaleDeed