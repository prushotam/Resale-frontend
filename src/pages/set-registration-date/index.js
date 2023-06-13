import React from "react";
import Main from "../../layout/Main";
import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import './style.scss'
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

function SetRegistrationDate() {
  const { addToast } = useToasts();
  const role = useSelector((state) => state.loggedInUser.prefferedRole);

  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");
  const [address, setAddress] = useState("");
  const today = new Date().toLocaleDateString('en-CA');

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleZoneChange = (e) => {
    setZone(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const submit = ()=>{
    addToast("Email notification sent", { appearance: "success", autoDismiss: true });
  }

  return (
    <div>
      <Main showUserNavbar={true} role={role}>
        <div className="container">
          <div className="fee-container">
            <div className="inner-container">
            <Typography
                    variant="h5"
                    component="h5"
                    align="center"
                    sx={{ color: "var(--darkBlue)" ,mb:10}}
                  >
                   Select Registration Date
                  </Typography>
              <Row className="mb-3">
                <Col>
                  <Form.Label>City</Form.Label>
                  <Form.Select onChange={handleCityChange} value={city} className="theme-border">
                    <option value="">Banglore</option>
                    
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Zone</Form.Label>
                  <Form.Select onChange={handleZoneChange} value={zone} className="theme-border">
                    <option value="">Select zone...</option>
                    <option value="Zone A">GANDHINAGAR</option>
                    <option value="Zone B">MALLESHWARA</option>
                    <option value="Zone C">GANGANAGAR</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Address</Form.Label>
                  <Form.Select onChange={handleAddressChange} value={address} className="theme-border">
                    <option value="">Select address...</option>
                    <option value="Address 1">3rd and 4th floor, annexue building,Bangalore D.C. office Compound, Bangalore-560009</option>
                    <option value="Address 2">No.11,12, Ist Floor, I & II Main Road,Palace Guttahalli, Bangalore 03</option>
                    <option value="Address 3">No. 70, Ist Floor, above Kanthi Sweets,5th Main, Ganganagar, Bangalore-32.</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" placeholder="Select date..." className="theme-border" min={today}/>
                </Col>
                <Col>
                  <Form.Label>Time</Form.Label>
                  <Form.Control type="time" placeholder="Select time..." className="theme-border"/>
                </Col>
              </Row>
              <Button variant="primary" type="submit" onClick={() => submit()}>
              Notify All Users
              </Button>
            </div>
          </div>
        </div>
      </Main>
    </div>
  );
}

export default SetRegistrationDate;
