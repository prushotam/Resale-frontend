import React,{useState,useEffect} from "react";
import Main from "../../layout/Main";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from '@mui/material/Button';

const LoanAgreement = (props) => {

  const [state, setState] = useState({
    inprogress: false,
    sanctioned: false,
  });
  const history = useHistory();

  const accessToken = useSelector((state) => state.loggedInUser?.data?.data?.accessToken) || "";

  useEffect(() => {
    if (!accessToken) {
      history.push("/user-login");
    }
  }, []);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { inprogress, sanctioned } = state;
  const error = [inprogress, sanctioned].filter((v) => v).length !== 1;

  return (
    <div>
      <Main showUserNavbar={!props?.showUserNavbar} showUser={!props?.showUser}>
        <div className="fee-container">
          <div className="fee-heading">
            <p>Loan Agreement</p>
          </div>
          <div className="picker">
          <FormControl
            required
            error={error}
            component="fieldset"
            variant="standard"
          >
            <FormLabel component="legend">Agreement has to be</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={inprogress}
                    onChange={handleChange}
                    name="inprogress"
                  />
                }
                label="Loan Sanction Accepted"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={sanctioned}
                    onChange={handleChange}
                    name="sanctioned"
                  />
                }
                label="Loan Sanction Rejected"
              />
            </FormGroup>
            <Button variant="contained" sx={{bgcolor:'var(--darkBlue)'}}>Save</Button>
          </FormControl>
          </div>
        </div>
      </Main>
    </div>
  );
};
export default LoanAgreement;
