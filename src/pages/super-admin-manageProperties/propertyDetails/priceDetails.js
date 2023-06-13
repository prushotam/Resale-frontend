import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import editIcon from "../../../assets/edit-icon.svg";
import PriceDetailEditProperty from "../../../layout/PropertyModal/EditPropertyModal/priceDetailEditProperty";
import { getPropertiesData } from "../service";
import Loader from "../../../layout/Loader/Loader";
import { useLocation, useHistory } from "react-router-dom";

const PriceDetailsData = () => {
  const role = sessionStorage.getItem("role");
  const history = useHistory();
  const dispatch = useDispatch();
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  const [isLoading, setIsLoading] = useState(false);
  const [priceEditModal, setPriceEditModal] = useState(false);
  const viewPropertiesData = useSelector(
    (state) => state.superAdminProperties.propertyData
  );
  const propertyId =
    useSelector((state) => state?.buyerHomeData?.selectedProperty?._id) || "";

  const getData = () => {
    setIsLoading(true);
    dispatch(getPropertiesData(searchParams.get("pid"))).then(() =>
      setIsLoading(false)
    );
  };

  const handleActionClick = () => {
    if (propertyId) {
      if (role === "SELLER") {
        history.push(`/offer-letter?pid=${propertyId}`);
      } else if (role === "BUYER") {
        history.push(`/platform-fee?pid=${propertyId}`);
      } else if (role === "LAWYER") {
        history.push(`/review-mou?pid=${propertyId}`);
      } else if (role === "BANK AGENT") {
        history.push(`/legal-verification?pid=${propertyId}`);
      } else if (role === "CA") {
        history.push(`/update-tds-details?pid=${propertyId}`);
      }
    }
    sessionStorage.setItem("propertyID", searchParams.get("pid"));
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="view-property-box">
          <div
            className={`view-plus-area ${
              sessionStorage.getItem("role") === "SUPERADMIN" && "extended"
            }`}
          >
            {sessionStorage.getItem("role") === "SUPERADMIN" && (
              <img
                src={editIcon}
                className="editIconSuperadmin"
                onClick={() => setPriceEditModal(!priceEditModal)}
              />
            )}
            <>
              <div className="view-left">
                <h4 className="fw-bold">Price Details</h4>
                <table className="property-table">
                  <tbody>
                    <tr>
                      <td className="labelArea">Platform Fee: </td>
                      <td>To be Filled</td>
                    </tr>
                    <tr>
                      <td className="labelArea">TDS: </td>
                      {viewPropertiesData?.ca?.tds_amount == null ||
                      viewPropertiesData?.ca?.tds_amount == 0 ? (
                        <td>To be Filled</td>
                      ) : (
                        <>
                          <td>{viewPropertiesData?.ca?.tds_amount}</td>
                        </>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="view-right">
                <table className="property-table">
                  <tbody>
                    <tr>
                      <td className="labelArea">Price: </td>
                      {viewPropertiesData?.price == null ||
                      viewPropertiesData?.price == 0 ? (
                        <td>To be Filled</td>
                      ) : (
                        <>
                          <td>{viewPropertiesData?.price}</td>
                        </>
                      )}
                    </tr>
                    <tr>
                      <td className="labelArea">Agreement Amount: </td>
                      <td>To be Filled</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="token-right">
                <table className="property-table">
                  <tbody>
                    <tr>
                      <td className="labelArea">Token Amount: </td>{" "}
                      {viewPropertiesData?.document_meta_data
                        ?.down_payment_amount == null ||
                      viewPropertiesData?.document_meta_data
                        ?.down_payment_amount == 0 ? (
                        <td>To be Filled</td>
                      ) : (
                        <>
                          <td>
                            {
                              viewPropertiesData?.document_meta_data
                                ?.down_payment_amount
                            }
                          </td>
                        </>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          </div>
          {sessionStorage.getItem("role") !== "SUPERADMIN" && (
            <div className="action-button-area" onClick={handleActionClick}>
              <p>Action</p>
            </div>
          )}
        </div>
      )}

      {sessionStorage.getItem("role") === "SUPERADMIN" && (
        <PriceDetailEditProperty
          setIsPriceEditModal={() => setPriceEditModal(!priceEditModal)}
          isPriceEditModal={priceEditModal}
          data={viewPropertiesData}
          callBack={getData}
          // name={user}
        />
      )}
    </div>
  );
};
export default PriceDetailsData;
