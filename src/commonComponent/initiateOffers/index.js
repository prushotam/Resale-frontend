import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import Main from "../../layout/Main";
import "../../pages/review-mou/style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useToasts } from "react-toast-notifications";
import Loader from "../../layout/Loader/Loader";
import { storeDocument, postGenerateApi } from "../../pages/initiate-offer/service";
import { updateManagePropData } from "../../pages/super-admin-manageProperties/service";
import { useHistory } from "react-router-dom";
import { initiateSigning } from "../../utils/signed";


const InitiateOffers= ({ props,templateSubType, templateType, heading }) => {
  const [signedPdfData, setSignedPdfData] = useState('');
  const dispatch = useDispatch();

  const history = useHistory();
  const apiResponse = useSelector((state) => state.initiateOffer);
  const { addToast } = useToasts();
  const [data, setData] = useState({
    PropertyID: sessionStorage.getItem("propertyID"),
    templateSubType ,// currently hardcoded, will change in the future
    templateType, // currently hardcoded, will change in the future
    ExtraFields: {
      "offerPrize": "39878888",

    "token": "3454",
    
    "checkNo":"1233434",
    "checkDate": "22/03/2023",
    "bankName":"SBI",
    "signAmount": "7888865",
    "closingDate": "23/04/2025"
    },
    closing_Date: new Date().toLocaleDateString("en-GB"),
    "offered_purchase_prize": "10000",
    "balance_Due": "9900",
    "down_payment_amount": "100"
  });
  const [showEditor, setShowEditor] = useState(false);
  const [fileData, setFileData] = useState("");
  const [showPdf, setShowPdf] = useState(false);
  const [signedPdfShow, setSignedPdfShow] = useState(false);
  const accessToken =
    useSelector((state) => state.loggedInUser?.data?.data?.accessToken) || "";

  useEffect(() => {
    if (!accessToken) {
      history.push("/user-login");
    }
  }, []);

  const initiateFinalize = () => {
    function extractContent(s) {
      var span = document.createElement("span");
      span.innerHTML = s;
      return span.textContent || span.innerText;
    }

    const removedHtml = extractContent(fileData);
    dispatch(storeDocument({
      propertyID: sessionStorage.getItem('propertyID'),
      templateSubType,
      templateType,
      file: removedHtml
    }))
    setShowPdf(true);
  };

  const callbackFunction = (res) => {
    setShowEditor(false);
    setSignedPdfShow(true);
    setSignedPdfData(res?.data?.data?.docket_Info[0]?.content);
  };

  useEffect(()=>{
    dispatch(postGenerateApi(data))
    .then((res)=>{
      setFileData(res.payload.createPropertyData.HTMLParsedData)
      setShowEditor(true)
    })
  },[])

  return (
    <>
      <div>
        <Main showUserNavbar={!props?.showUserNavbar} showUser={!props?.showUser}>
          <div className="fee-container fee-containers">
            <div className="fee-heading">
              <p>{heading}</p>
            </div>
            <div className="platform-fee-container">
              {signedPdfShow ? (
                <div className="platform-fee-container-embed">
                  <embed
                    src={`data:application/pdf;base64,${signedPdfData}`}
                    height={500}
                    width={800}
                  />
                </div>
              ) : showEditor ? (
                <>
                  {!showPdf ? (
                    <>
                      <div className="platform-fee-ck-container">
                        {console.log(fileData)}
                        <CKEditor
                          editor={ClassicEditor}
                          className="editor"
                          data={fileData}
                          onChange={(event, editor) => {
                            const data = editor?.getData();
                            setFileData(data);
                          }}
                        />
                      </div>
                      <div>
                        <Button
                          className="fee-button"
                          onClick={initiateFinalize}
                        >
                          Finalize Offer
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="platform-fee-ck-container">
                        <object
                          data="https://www.africau.edu/images/default/sample.pdf"
                          type="application/pdf"
                          width="100%"
                          height="100%"
                        >
                          <p>
                            Alternative text - include a link{" "}
                            <a href="https://www.africau.edu/images/default/sample.pdf">
                              to the PDF!
                            </a>
                          </p>
                        </object>
                      </div>
                      <div>
                        <Button
                          className="fee-buttonEdit"
                          onClick={() => {
                            setShowPdf(false);
                          }}
                        >
                          Back To Edit
                        </Button>
                        <Button
                          className="fee-buttonRight"
                          onClick={() => {
                            initiateSigning({
                              propertyId: sessionStorage.getItem("propertyID"),
                              templateType,
                              templateSubType,
                              callbackFunction: callbackFunction,
                            });
                          }}
                        >
                          Sign Here
                        </Button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </Main>
      </div>
    </>
  );
};

export default InitiateOffers;