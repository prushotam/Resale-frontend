import React, {useState, useEffect} from "react";
import Main from "../../layout/Main";
import Button from '@mui/material/Button';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from '@mui/material/Unstable_Grid2';
import { FormControl, FormLabel } from "@mui/material";
import "./style.scss"

import { useDispatch, useSelector } from "react-redux";
import { updateManagePropData } from "../../pages/super-admin-manageProperties/service";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";



const LoanSanction = ({ props }) => {
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
          autoDismiss:true
        });
        setIsSubmit(false);
      } else {
        addToast(editPropResp.updateManagePropMessage, { 
          appearance: "error", 
          autoDismiss:true
        });
        setIsSubmit(false);
      }
    }
  }, [editPropResp]);


  return (
    <div>
      <Main showUserNavbar={!props?.showUserNavbar} showUser={!props?.showUser}>
        <div className="fee-container">
          <div className="fees-heading">
            <p>Loan Sanction</p>
            <FormControl
            >
          <div className="datePick">
            <FormLabel className="dateLabel">Select Loan Dispersement Date:</FormLabel>
          <Grid container direction={'column'} spacing={4} className="timePicker">
            <Grid >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
              label="Select Date" 
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
              </Grid>
            </Grid>
            </div>
            <div className="btn-inspection">
          <Button variant="contained" sx={{bgcolor:'var(--darkBlue)'}}
          onClick={(e) => onSubmit(e)}
          >Publish Notification</Button>
          </div>
          </FormControl>
            </div>
        </div>
      </Main>
    </div>
  );
};
export default LoanSanction;
