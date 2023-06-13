import React, { useEffect } from "react";
import Main from "../../layout/Main";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";

const Backout = (props) => {
  const history = useHistory();
  const location = useLocation();
  const accessToken =
    useSelector((state) => state.loggedInUser?.data?.data?.accessToken) || "";
  const propertyId =
    useSelector((state) => state?.buyerHomeData?.selectedProperty?._id) || "";
  const pid = location.search.split("=")[1];
  console.log(location, propertyId, pid);

  useEffect(() => {
    if (!accessToken) {
      history.push("/user-login");
    } else {
      if (!propertyId) history.push("/user-home");
      else if (pid != propertyId) history.push(`/backout?pid=${propertyId}`);
    }
  }, []);

  return (
    <div>
      <Main showUserNavbar={!props?.showUserNavbar} showUser={!props?.showUser}>
        <div className="fee-container">
          <div className="container">
            <div className="backout-heading">
              <p>Backout</p>
            </div>

            <Form>
              <div className="backout-area">
                <Form.Label>
                  Back out penalty details and terms n conditions:
                </Form.Label>
                <Form.Control as="textarea" rows={4} disabled/>
              </div>

              <div className="amount-area">
                <p>Penalty Amount :</p>
                <Form.Control type="string" disabled />
              </div>

              <div className="reason-area">
                <p>Reason For Backing Out: </p>
                <Form.Control
                  as="textarea"
                  placeholder="Write the reason of your backout"
                  rows={4}
                />
                <Form.Check
                  label="I agree to the terms and conditions"
                  type={"checkbox"}
                />
              </div>
            </Form>
            <div className="text-center">
                <Button variant="primary" type="submit" className="backout-btn">
                  Backout Continue
                </Button>
                </div>
          </div>
        </div>
      </Main>
    </div>
  );
};
export default Backout;
