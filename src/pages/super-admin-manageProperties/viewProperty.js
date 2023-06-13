import React, { useState, useEffect } from "react";
import Main from "../../layout/Main/index";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getPropertiesData, getRoleId, updatePropertyStage, updateCheckListDocument } from "./service";
import { useLocation, useHistory } from "react-router-dom";
import Loader from "../../layout/Loader/Loader";
import { useToasts } from "react-toast-notifications";
import PropertyDetailsData from "./propertyDetails/propertyData";
import OtherDetailsData from "./propertyDetails/otherDetails";
import PriceDetailsData from "./propertyDetails/priceDetails";
import AgreementsData from "./propertyDetails/agreements";
import PropertyDocumentData from "./propertyDetails/PropertyDocument";
import SellerDetailsData from "./propertyDetails/sellersDetails";
import PropertyHistoryData from "./propertyDetails/propertyHistory";
import {endpoint} from "../../utils/endpoints";
import { addSelectedProperty } from "../user-home/slices";
import Axios from "axios";

const env = process.env.REACT_APP_ENV

const ViewProperty = (props) => {
  const history = useHistory(); 
  const { addToast } = useToasts();
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  const [isLoading, setIsLoading] = useState(false);
  const [propertyImageLoader, setPropertyImageLoader] = useState(false)
  const [propertyImages , setPropertyImages] = useState([])
  const dispatch = useDispatch();
  const viewPropertiesData = useSelector(
    (state) => state.superAdminProperties.propertyData
  );
  const role = useSelector((state) => state.loggedInUser.preferredRole);
  const roleId = useSelector((state)=> state.loggedInUser?.selectedRole?._id);
  const userName = useSelector((state) => state.loggedInUser.data.data?.userByEmail?.first_name);
  const accessToken = useSelector((state) => state.loggedInUser?.data?.data?.accessToken) || "";
  const propertyId = useSelector((state)=> state?.buyerHomeData?.selectedProperty?._id) || '';
  const selectedProperty = useSelector((state)=> state?.buyerHomeData?.selectedProperty)

  useEffect(() => {
    const pid = searchParams.get("pid")
    if (!accessToken) {
      history.push("/user-login");
    }else{
      if(!propertyId) history.push("/user-home");
      else if(pid != propertyId) history.push(`/view-property?pid=${propertyId}`)
      else{
          getData();
          dispatch(getRoleId());
          dispatch(updatePropertyStage({roleId,propertyId}))
      }
    }
  }, []);


  const getData = async () => {
    setIsLoading(true);
    dispatch(getPropertiesData(propertyId))
    await getPropertyImages(propertyId)
    setIsLoading(false)
  }

  const addpropertyImages = (selectedFile)=>{
    const formData = new FormData();
    formData.append('propertydoc', selectedFile);
    formData.append('property_id', propertyId);
    formData.append('checklist_name', 'PropertyImages');
    setPropertyImageLoader(true)
    dispatch(updateCheckListDocument(formData)).then(async()=>{
        addToast(`Property Image added successfully`, { appearance: "success", autoDismiss: true });
        await getPropertyImages(propertyId)
        setPropertyImageLoader(false)
    })
  }

  const getPropertyImages = async (propertyId)=>{
    try {
      const response = await Axios({
        method:'get',
        url:`${endpoint[env].baseUrl}property/images/${propertyId}`
      })
      if(response.status===200 && response.data?.success){
        setPropertyImages([...response.data.data])
        dispatch(addSelectedProperty({...selectedProperty, propertyImages:[...response.data.data] }))
      }
    } catch (error) {
      addToast(`Unable to fetch property images`, { appearance: "error", autoDismiss: true });
    }
     
  }


  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Main
          showNav={!props?.showNav}
          showFooter={!props?.showFooter}
          showLogo={!props?.showLogo && 
          role !== "SELLER" && 
          role !== "BUYER" && 
          role !== "BUYER_BANK_AGENT" && 
          role !== "LAWYER" &&
          role !== "CA" &&
          role !== "AGENT"
        }
          showAdminFooter={!props?.showAdminFooter}
          showAdminNavbar={!props?.showAdminNavbar}
          showWelcomePage={!props?.showWelcomePage && role !== "SUPERADMIN" && role !== "ADMIN"}
          currentScreen={"user_home"}
        >
          {viewPropertiesData && (
            <div className="add-property">
              <PropertyDetailsData 
                  user={userName} 
                  propertyImageAttribute={propertyImages} 
                  addpropertyImages={addpropertyImages}
                  propertyImageLoader = {propertyImageLoader}
                  />
              <OtherDetailsData user={userName}/>
              <PriceDetailsData user={userName}/>
              <AgreementsData />
              <PropertyDocumentData />
              <SellerDetailsData user={userName} data={viewPropertiesData?.property_parties_details} viewProperty={viewPropertiesData}/>
              <PropertyHistoryData />
            </div>
          )}
        </Main>
      )}
    </div>
  );
};
export default ViewProperty;