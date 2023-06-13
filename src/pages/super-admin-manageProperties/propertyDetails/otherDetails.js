import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import editIcon from "../../../assets/edit-icon.svg";
import OtherDetailEditProperty from "../../../layout/PropertyModal/EditPropertyModal/otherDetailEditProperty";
import Loader from "../../../layout/Loader/Loader";
import { useLocation } from "react-router-dom";
import { getPropertiesData } from "../service";
const OtherDetailsData = ({ user }) => {
  const dispatch = useDispatch();
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  const [isLoading, setIsLoading] = useState(false);
  const [detailEditModal, setDetailEditModal] = useState(false);
  const viewPropertiesData = useSelector(
    (state) => state.superAdminProperties.propertyData
  );
  const getData = () => {
    setIsLoading(true);
    dispatch(getPropertiesData(searchParams.get("pid"))).then(() =>
      setIsLoading(false)
    );
  };
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <details className="other-details-dropdown">
          <summary className="fw-bolder">
            <h4>Other Details</h4>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-caret-down"
                className="dropDown"
                viewBox="0 0 16 16"
              >
                <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
              </svg>
              <img
                src={editIcon}
                className="editIcons"
                onClick={() => setDetailEditModal(!detailEditModal)}
              />
            </div>
          </summary>
          <br />
          <div className="description">
            <div>
              <table className="property-table">
                <tbody>
                  <tr>
                    <td className="labelArea">Khata No:</td>{" "}
                    <td>{viewPropertiesData?.khata_number}</td>
                  </tr>
                  <tr>
                    <td className="labelArea">Registration No:</td>{" "}
                    <td>{viewPropertiesData?.khata_number}</td>
                  </tr>
                  <tr>
                    <td className="labelArea">No. of Owners:</td>{" "}
                    <td>{viewPropertiesData?.no_of_owners}</td>
                  </tr>
                  <tr>
                    <td className="labelArea">Is Rented:</td>{" "}
                    <td>{viewPropertiesData?.rented ? "Yes" : "No"}</td>
                  </tr>
                  {viewPropertiesData?.rented && (
                    <tr>
                      <td className="labelArea">Tenant Email:</td>{" "}
                      <td>{viewPropertiesData?.tenant?.email}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div>
              <table className="property-table">
                <tbody>
                  <tr>
                    <td className="labelArea">Unique Selling Proposition:</td>{" "}
                    <td>{viewPropertiesData?.usp}</td>
                  </tr>
                  <tr>
                    <td className="labelArea">Schedule No.:</td>{" "}
                    <td>{viewPropertiesData?.schedule_number}</td>
                  </tr>
                  <tr>
                    <td className="labelArea">CD Number:</td>{" "}
                    <td>{viewPropertiesData?.cd_number}</td>
                  </tr>
                  {viewPropertiesData?.rented && (
                    <>
                      <tr>
                        <td className="labelArea">Tenant Name:</td>{" "}
                        <td>{viewPropertiesData?.tenant?.name}</td>
                      </tr>
                      <tr>
                        <td className="labelArea">Tenant Phone:</td>{" "}
                        <td>{viewPropertiesData?.tenant?.phone}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </details>
      )}
      <OtherDetailEditProperty
        setIsDetailEditModal={() => setDetailEditModal(!detailEditModal)}
        isDetailEditModal={detailEditModal}
        data={viewPropertiesData}
        callBack={getData}
        name={user}
      />
    </div>
  );
};
export default OtherDetailsData;
