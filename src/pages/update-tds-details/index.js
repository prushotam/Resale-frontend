import React from "react";
import Main from "../../layout/Main";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Form from "react-bootstrap/Form";
import { Button } from "@mui/material";
import { Divider, Typography } from "antd";
import { updateTds } from "./service";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

function UpdateTdsDetails() {

  const role = useSelector((state) => state.loggedInUser.prefferedRole);

  const dispatch = useDispatch();
  const [tdsAmount, setTdsAmount] = useState("");
  const [tdsCalculation, setTdsCalculation] = useState("");
  const history = useHistory();

  const accessToken = useSelector((state) => state.loggedInUser?.data?.data?.accessToken) || "";

  useEffect(() => {
    if (!accessToken) {
      history.push("/user-login");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const args = {
      id: "6439260fa999f97fedca17dc",
      ca: {
        tds_amount: Number(tdsAmount),
        tds_instruction: tdsCalculation,
      },
    };
    dispatch(updateTds(args));
    setTdsAmount("");
    setTdsCalculation("");
  };
  return (
    <div>
      <Main showUserNavbar={true} role={role}>
        <div className="container">
          <div className="fee-container">
            <div className="inner-container">
              <div className="d-flex">
                <Divider plain>
                <Typography
                          variant="h3"
                          component="h3"
                          align="center"
                          sx={{ color: "var(--darkBlue)" }}
                        >TDS UPDATE</Typography>
                </Divider>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>TDS to be paid :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="TDS Amount"
                    className="col-6 custom-border"
                    name="tdsAmount"
                    value={tdsAmount}
                    onChange={(e) => setTdsAmount(e.target.value)}
                  />
                  <Form.Label>TDS Calculations :</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    className="col-md-6 bg"
                    name="tdsCalculations"
                    value={tdsCalculation}
                    onChange={(e) => setTdsCalculation(e.target.value)}
                  />
                </Form.Group>
                <div className="text-center">
                  <Button variant="contained">Submit</Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Main>
    </div>
  );
}

export default UpdateTdsDetails;
