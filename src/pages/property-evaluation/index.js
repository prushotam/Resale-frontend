import React,{useState,useEffect} from "react";
import Main from "../../layout/Main";
import "./style.scss";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { FormLabel } from '@mui/material';

import { useDispatch, useSelector } from "react-redux";
import { updateManagePropData } from "../../pages/super-admin-manageProperties/service";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";


const PropertyEvaluation = (props) => {
  const editPropResp = useSelector((state) => state.superAdminProperties);
  const [isSubmit, setIsSubmit] = useState(false);
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [state, setState] = useState({
      id: sessionStorage.getItem('propertyID'),
      bank:{}
  });
  const history = useHistory();

  const accessToken = useSelector((state) => state.loggedInUser?.data?.data?.accessToken) || "";

  useEffect(() => {
    if (!accessToken) {
      history.push("/user-login");
    }
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setIsSubmit(true);
    dispatch(updateManagePropData(state));
  };

  useEffect(() => {
    if (editPropResp.updateManageStatus && isSubmit) {
      if (editPropResp.updateManageStatus === "Success") {
        addToast(editPropResp.updateManagePropMessage, {
          appearance: "success",
        });
        setIsSubmit(false);
      } else {
        addToast(editPropResp.updateManagePropMessage, { appearance: "error" });
        setIsSubmit(false);
      }
    }
  }, [editPropResp]);
  
  return (
    <div>
      <Main showUserNavbar={!props?.showUserNavbar} showUser={!props?.showUser}>
        <div className="fee-container">
          <div className="fees-heading">
            <p>Property Inspection</p>
          
          <div className="datePick">
          <FormLabel className="dateLabel">Pick the date & time on which Bank will conduct the property evaluation to publish notification:</FormLabel>
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker 
        label="Select Date & Time" 
        className="dateWidth"
        onChange={(e) =>
          {
       let data= {...state}
       data.bank={
        inspection_time_date: new Date(e.$d).toLocaleString('en-US'),
        loan_initiated: new Date(e.$d).toLocaleDateString('en-GB')
        }
        setState(data)
          }
        }
        />
    </LocalizationProvider>
            </div>
          <div className="evaluation">
            <Button variant="contained" sx={{bgcolor:'var(--darkBlue)'}} onClick={(e) => onSubmit(e)}>Publish Notification</Button>
          </div>
        </div>
      </Main>
    </div>
  );
};
export default PropertyEvaluation;
