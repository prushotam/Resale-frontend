import React,{ useState, useEffect } from "react";
import Main from "../../layout/Main";
import "./style.scss";

import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from '@mui/material/Button';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const LegalVerification = (props) => {

  const [state, setState] = useState({
    completed: false,
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

  const { inprogress, completed } = state;
  const error = [inprogress, completed].filter((v) => v).length !== 1;

  return (
    <div>
      <Main showUserNavbar={!props?.showUserNavbar} showUser={!props?.showUser}>
        <div className="fee-container">
          <div className="fee-heading">
            <p>Legal Verification of property documents by Bank</p>
          </div>
          <div className="picker">
          <FormControl
            required
            error={error}
            component="fieldset"
            variant="standard"
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={inprogress}
                    onChange={handleChange}
                    name="inprogress"
                    disabled
                  />
                }
                label="In Progress"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={completed}
                    onChange={handleChange}
                    name="completed"
                  />
                }
                label="Completed"
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
export default LegalVerification;
