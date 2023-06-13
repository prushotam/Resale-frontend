import React, { useEffect, useState } from "react";
import Main from "../../layout/Main";
import circlePlus from "../../assets/circle-plus.svg";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getManagePropData, getStagesData } from "./service";
import AddPropertyModal from "../../layout/PropertyModal/AddPropertyModal/addPropertyModal";
import Loader from "../../layout/Loader/Loader";
import { DropdownButton, Dropdown } from "react-bootstrap";
import AddProperties from "./adding-property";
import { useHistory } from "react-router-dom";


const ManageProperties = (props) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const [addModal, setAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [selectedValue, setSelectedValue] = useState('');
  const [search, setSearch] = useState('');
  const accessToken = useSelector((state) => state.loggedInUser?.data?.data?.accessToken) || "";

  const handleSelect = (eventKey) => {
    setSelectedValue(eventKey);
  };
  const allStagesData = useSelector(
    (state) => state?.stagesData?.stages
  );
  useEffect(() => {
    getProperties();
    dispatch(getStagesData());
  }, []);

  useEffect(() => {
    if (!accessToken) {
      history.push("/super-admin-login");
    }
  }, []);

  // function to fetch all the propeties from backend  
  const getProperties = () => {
    setIsLoading(true)
    dispatch(getManagePropData()).then(() => setIsLoading(false));
  }

  return (
    <div>
      {isLoading ? <Loader /> :
        <Main
          showNav={!props?.showNav}
          showFooter={!props?.showFooter}
          showLogo={!props?.showLogo}
          showAdminFooter={!props?.showAdminFooter}
          showAdminNavbar={!props?.showAdminNavbar}
          onChange={setSearch}>
          <div className="manage-area">
            <div className="mainCont">
              <div className="manage-btn-wrapper">
                <img
                  src={circlePlus}
                  className="manage-btn-img"
                  onClick={() => setAddModal(!addModal)}
                />
                <h6 className="addPropText">Add Property</h6>
              </div>
              <div className="selectStageContainer">
                <DropdownButton
                  id="dropdown-basic-button"
                  className="selectStage1"
                  title={selectedValue || "Select Stage"}
                  onSelect={handleSelect}
                >
                  <Dropdown.Item eventKey="">All Stages</Dropdown.Item>
                  {allStagesData?.map((item) => (
                    <Dropdown.Item eventKey={item.stage_name}>
                      {item.stage_name}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>

              </div>
            </div>
            <AddProperties event={search} selectedValue={selectedValue}/>
          </div>
        </Main>
      }
      <AddPropertyModal
        setIsDisplay={() => setAddModal(!addModal)}
        isDisplay={addModal} 
        getUpdatedProperty={getProperties}
      />
    </div>
  );
};
export default ManageProperties;
