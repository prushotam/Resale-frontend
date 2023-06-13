import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Main from "../../layout/Main";
import "./style.scss";
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Loader from "../../layout/Loader/Loader";

const OfferLetter = (props) => {
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const accessToken = useSelector((state) => state.loggedInUser?.data?.data?.accessToken) || "";

  useEffect(() => {
    if (!accessToken) {
      history.push("/user-login");
    }
  }, []);
  const routeChange = () => {
    history.push("/backout");
  };
  useEffect(()=>{
    sessionStorage.getItem('rollid')
  })

  return (
    <>{loader ? <Loader /> : <div>
    
      <Main showUserNavbar={!props?.showUserNavbar} showUser={!props?.showUser}>
        <div className="fee-container fee-containers">
          <div className="fee-heading">
            <p>Offer Letter</p>
            <button onClick={routeChange}>Backout</button>
          </div>

          <div className="platform-fee-container">
            <>
              <div className="platform-fee-ck-container">
                <CKEditor
                  editor={ClassicEditor}
                  className="editor"
                />
              </div>
              <div className="offer-button">
                <Button className="m-4 button"> Reject</Button>
                <Button className="m-4 button"> Accept</Button>
              </div>
            </>
          </div>
        </div>
      </Main>
    </div>
    }</>
  );
};
export default OfferLetter;
