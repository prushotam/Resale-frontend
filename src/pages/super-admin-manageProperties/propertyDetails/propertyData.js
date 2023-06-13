import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import addP from "../../../assets/building.svg";
import { useSelector, useDispatch } from "react-redux";
import editIcon from "../../../assets/edit-icon.svg";
import EditProperty from "../../../layout/PropertyModal/EditPropertyModal/editProperty";
import { getPropertiesData } from "../service";
import { useLocation } from "react-router-dom";
import Loader from "../../../layout/Loader/Loader";
import ArrowCircleLeftSharpIcon from '@mui/icons-material/ArrowCircleLeftSharp';
import ArrowCircleRightSharpIcon from '@mui/icons-material/ArrowCircleRightSharp';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DummypropertyImage from "../../../assets/property-images/pexels-curtis-adams-3288100.jpg";
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import CircularProgress from '@mui/material/CircularProgress';

const PropertyDetailsData = ({user , propertyImageAttribute =[] , addpropertyImages, propertyImageLoader}) => {
  const dispatch = useDispatch();
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  const [isLoading, setIsLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentImage , setCurrentImage] = useState(0);
  const [showImagePreview , setShowImagePreview] = useState(false);
  const viewPropertiesData = useSelector(
    (state) => state.superAdminProperties.propertyData
  );
  const getData = () => {
    setIsLoading(true);
    dispatch(getPropertiesData(searchParams.get("pid"))).then(() =>
      setIsLoading(false)
    );
  };


  const nextSlide = ()=>{
    const length = propertyImageAttribute.length;
    setCurrentImage(currentImage === length-1 ? 0 : currentImage + 1)
  }

  const prevSlide = ()=> {
    const length = propertyImageAttribute.length;
    setCurrentImage(currentImage === 0 ? length -1  : currentImage - 1)
  }


  const handleFileChange = (e)=>{
    const selectedFile = e.target.files[0];
    if(selectedFile){
      addpropertyImages(selectedFile)
    }
  }

  return (
    <>
      <div className="add-property-container">
        {isLoading ? <Loader /> : 
          <div className="add-property-box">
              <div className="add-property-img">
              {
                propertyImageLoader ?
                <div className="loader">
                  <CircularProgress/>
                </div>
                :
                propertyImageAttribute.length ? propertyImageAttribute.map((image,index)=>{
                  return (
                    index < 2 ?
                    <div className="property-image " onClick={()=>{setShowImagePreview(true)}}>
                      <img src={image.url} alt={image.fileName} />
                    </div>
                    : index == 2 ? 
                      <div className="property-image overlay" >
                        <img src={image.url} alt={image.fileName} />
                        <div className="overlay-box">
                          <div onClick={()=>{setShowImagePreview(true)}}>
                            View More 
                          </div>
                        </div>
                      </div>
                    :
                    null
                  ) 
                })
                :
                null
              }
              {
                !propertyImageLoader ?
                 propertyImageAttribute.length < 3 ?
                <div className="property-image overlay"  >
                <input
                style={{ display: "none" }}
                id='property-image'
                onChange={handleFileChange}
                type="file"
              />
                <label className="label" htmlFor='property-image'> 
                  <img src={DummypropertyImage} alt='property image' />
                  <div className="overlay-box">
                    <div >
                      Add Images
                    </div>
                    <div className="add-icon">
                      <AddCircleSharpIcon color="primary"/>
                    </div>
                  </div>
                </label>
              </div>
              : 
              <div className="add-image">
                <input
                style={{ display: "none" }}
                id='property-image'
                onChange={handleFileChange}
                type="file"
              />
                <label className="label" htmlFor='property-image'>  
                    <div className="add-icon" >
                      <AddCircleSharpIcon color="primary"/>
                    </div>
                </label>
              </div>
              :
              null
              }
              
          </div>
          <div className="add-plus-area">
            <img
              src={editIcon}
              className="editIcon"
              onClick={() => setEditModal(!editModal)}
            />
            <div className="left">
              <h4 className="fw-bold">Property Details</h4>
              <table className="property-table">
                <tbody>
                  <tr>
                    <td className="labelArea">Propery Type:</td>{" "}
                    <td className="labelArea">
                      {viewPropertiesData?.PropertyType?.replaceAll("_", "/")}
                    </td>
                  </tr>
                  <tr>
                    <td className="labelArea">ID No:</td>{" "}
                    <td>{viewPropertiesData?.re_id}</td>
                  </tr>
                  <tr>
                    <td className="labelArea">Property Floor No: </td>{" "}
                    <td>{viewPropertiesData?.floor_no}</td>
                  </tr>
                  <tr>
                    <td className="labelArea">Door Facing Direction:</td>{" "}
                    <td>{viewPropertiesData?.floor_no}</td>
                  </tr>
                  <tr>
                    <td className="labelArea">Car parking:</td>{" "}
                    <td>{viewPropertiesData?.car_park}</td>
                  </tr>
                  <tr>
                    <td className="labelArea">Address 1:</td>
                    <td>
                      <td>
                        {" "}
                        {viewPropertiesData?.address?.[0]
                          ? `${viewPropertiesData?.address?.[0]?.address_line1}`
                          : ""}
                      </td>
                    </td>
                  </tr>
                  <tr>
                    <td className="labelArea">City:</td>{" "}
                    <td>
                      <td>{viewPropertiesData?.address?.[0]?.city}</td>
                    </td>
                  </tr>
                  <tr>
                    <td className="labelArea">Society Name:</td>{" "}
                    <td>{viewPropertiesData?.society_name}</td>
                  </tr>
                  <tr>
                    <td className="labelArea">Builder/Developer Name:</td>{" "}
                    <td>{viewPropertiesData?.society_name}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="right">
              <table className="property-table">
                <tbody>
                  {viewPropertiesData?.PropertyType ===
                  "Villa_Independent_house_Row_house" ? (
                    <tr>
                      <td className="labelArea">Villa/House No.:</td>{" "}
                      <td>{viewPropertiesData?.house_no}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td className="labelArea">Flat/unit no:</td>{" "}
                      <td>{viewPropertiesData?.flat_no}</td>
                    </tr>
                  )}
                  <tr>
                    <td className="labelArea">Super Built Up Area:</td>{" "}
                    <td>{viewPropertiesData?.super_built_up_area}</td>
                  </tr>
                  <tr>
                    <td className="labelArea">BHK:</td>{" "}
                    <td>{viewPropertiesData?.bhk}</td>
                  </tr>
                  <tr>
                    <td className="labelArea">Furnishing Status:</td>{" "}
                    <td>{viewPropertiesData?.furnishing_status}</td>
                  </tr>
                  <tr>
                    <td className="labelArea">Address 2:</td>
                    <td>
                      <td>{viewPropertiesData?.address?.[0]?.address_line2}</td>
                    </td>
                  </tr>
                  <tr>
                    <td className="labelArea">Pin Code:</td>
                    <td>
                      {" "}
                      <td>{viewPropertiesData?.address?.[0]?.zipCode}</td>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td className="labelArea">Max Floor in society:</td>{" "}
                    <td>{viewPropertiesData?.no_of_floor}</td>
                  </tr>
                  {viewPropertiesData?.PropertyType === "Pent_house" ? (
                    <>
                      <tr>
                        <td className="labelArea">Terrace Area:</td>
                        <td>
                          {" "}
                          <td>{viewPropertiesData?.terrace_area}</td>{" "}
                        </td>
                      </tr>
                      <tr>
                        <td className="labelArea">Additional Room:</td>{" "}
                        <td>{viewPropertiesData?.additional_room}</td>
                      </tr>
                    </>
                  ) : (
                    ""
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <EditProperty
            setIsEditModal={() => setEditModal(!editModal)}
            isEditModal={editModal}
            data={viewPropertiesData}
            callBack={getData}
            name={user}
          />
        </div>
        }
      </div>
      {
        showImagePreview &&
        <div className="image-show">
        <section className="image-section">
          {
            propertyImageAttribute.length > 1 &&
            <>
              <div className="left-arrow" onClick={prevSlide}>
                <ArrowCircleLeftSharpIcon color="primary"/>
              </div>
              <div className="right-arrow" onClick={nextSlide}>
                <ArrowCircleRightSharpIcon color="primary"/>
              </div>
            </>
          }
          <div className="close-icon" onClick={()=>{setShowImagePreview(false)}}>
                <CancelOutlinedIcon color="error"/>
          </div>
          {
            propertyImageAttribute?.map((image,index)=>{
              return (
                <div className={ currentImage === index ? "slide active" : "slide"}>
                  {
                    index===currentImage &&
                    <img src={image.url} alt="property-image" className="image"/>
                  }
                </div>
              ) 
            })
          }
        </section>
      </div>
      }
    </>
  )

}
export default PropertyDetailsData;
