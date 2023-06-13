import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import Main from "../../layout/Main";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { storeDocument , postGenerateApi } from "./service";
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useToasts } from "react-toast-notifications";
import Loader from "../../layout/Loader/Loader";
import { initiateSigning } from "../../utils/signed";
import { updateManagePropData } from "../super-admin-manageProperties/service";
import { useHistory , useLocation } from "react-router-dom";
const InitiateOffer = (props) => {
  const history = useHistory();
  const apiResponse = useSelector((state) => state.initiateOffer);
  const dispatch = useDispatch();

  const location = useLocation();
  const propertyId = useSelector((state)=> state?.buyerHomeData?.selectedProperty?._id) || '';
  const pid = location.search.split("=")[1]

  const { addToast } = useToasts();
  const [data, setData] = useState({
    PropertyID: sessionStorage.getItem('propertyID'),
    templateSubType: "OFFER_LETTER",   // currently harrdcoded will change in future
    templateType: "DOCUMENT",                   // currrently hardcoded will change in future
    ExtraFields: {
      checkNo: "",
      checkDate: "",
      bankName: "",
      signAmount: "",
    },
    closing_Date: new Date().toLocaleDateString('en-GB')
  });
  const [showEditor, setShowEditor] = useState(false);
  const [signedPdfData, setSignedPdfData] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const dateFormatList = ["DD/MM/YYYY"];
  const [loader, setLoader] = useState(false);
  const [fileData, setFileData] = useState("");
  const [showPdf, setShowPdf] = useState(false);
  const [signedPdfShow, setSignedPdfShow] = useState(false);

  const accessToken = useSelector((state) => state.loggedInUser?.data?.data?.accessToken) || "";

  useEffect(() => {
    if (!accessToken) {
      history.push("/user-login");
    }else{
      if(!propertyId) history.push("/user-home");
      else if(pid != propertyId) history.push(`/initiate-offer?pid=${propertyId}`)
    }
  }, []);
  // Use effect to dispaly toast message and show ckeditor 
  useEffect(() => {
   if (apiResponse?.addPropStatus && isSubmit) {
      if (apiResponse?.addPropStatus === "Success") {
        addToast(apiResponse.addPropMessage, {
          appearance: "success",
        });
        setFileData(apiResponse?.addPropertyData);
        setIsSubmit(false);
        setShowEditor(true)
        setLoader(false);
      } else if (apiResponse?.addPropStatus === "Failure") {
        addToast(apiResponse.addPropMessage, { appearance: "error" });
        setLoader(false);
      }
    }
   
  }, [apiResponse, isSubmit])

  // function to call the API to create generate offer
  const generateOffer = (e) => {
    
    e.preventDefault();
    setIsSubmit(true);
    setLoader(true);
    dispatch(updateManagePropData({
      id: sessionStorage.getItem('propertyID'),
      document_meta_data: {
        down_payment_amount: data?.down_payment_amount,
        offered_purchase_prize: data?.offered_purchase_prize,
        balance_due: data?.balance_Due
      }
    }));
    dispatch(postGenerateApi(data))
  };

  const initiateFinalize = () => {
    function extractContent(s) {
      var span = document.createElement('span');
      span.innerHTML = s;
      return span.textContent || span.innerText;
    };
        
    const removedHtml = extractContent(fileData);
    dispatch(storeDocument({
      propertyID: sessionStorage.getItem('propertyID'),
      templateSubType: "OFFER_LETTER",
      templateType: "DOCUMENT",
      file: removedHtml
    }))
    setShowPdf(true)
  }

  const callbackFunction = (res) =>{
    setShowEditor(false);
    setSignedPdfShow(true)
    setSignedPdfData(res?.data?.data?.docket_Info[0]?.content);
  }


  return (
    <>{loader ? <Loader /> : <div>
      <Main showUserNavbar={!props?.showUserNavbar} showUser={!props?.showUser}>
        <div className="fee-container fee-containers">
          <div className="fee-heading">
            <p>Initiate Offer</p>
          </div>

          <div className="platform-fee-container">
          {
            signedPdfShow ? <div className="platform-fee-container-embed">  <embed src={`data:application/pdf;base64,${signedPdfData}`} height={500} width={800} /></div>
            :
         showEditor ? (
              <>
              {!showPdf ? 
                <><div className="platform-fee-ck-container">
                        {console.log(fileData)}
                        <CKEditor
                          editor={ClassicEditor}
                          className="editor"
                          data={fileData}
                          onChange={(event, editor) => {
                            const data = editor?.getData();
                            setFileData(data);
                          } } />
                      </div><div>  <Button className="fee-button" onClick={initiateFinalize}> Finalize Offer </Button>
                        </div></>
                :
                <><div className="platform-fee-ck-container">
                        <object data="https://www.africau.edu/images/default/sample.pdf" type="application/pdf" width="100%" height="100%">
                          <p>Alternative text - include a link <a href="https://www.africau.edu/images/default/sample.pdf">to the PDF!</a></p>
                        </object>

                      </div><div>
                          <Button className="fee-buttonEdit" onClick={() => { setShowPdf(false); } }> Back To Edit </Button>
                          <Button className="fee-buttonRight" onClick={() => {
                            setLoader(true);
                            initiateSigning({
                            "propertyId": sessionStorage.getItem("propertyID"),
                            "templateType": "DOCUMENT",
                            "templateSubType": "OFFER_LETTER",
                            "callbackFunction": callbackFunction,
                            "loaderFalse":setLoader
                          })}}>
                            Sign Here </Button>
                        </div></>
              }

              </>
            ) : (
              <Form onSubmit={(e) => generateOffer(e)}>
                <Form.Group className="mb-3">
                 
                  <Form.Label className="fee-label">
                    Offer Purchased Price
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Price"
                    className="fee-inputs"
                    value={data. offered_purchase_prize}
                    required
                    onChange={(e) =>
                      setData({
                        ...data,
                        offered_purchase_prize: e.target.value,
                        ExtraFields: {
                          ...data.ExtraFields,
                          offerPrize: e.target.value
                        },
                        balance_Due: (e.target.value - data.down_payment_amount).toString()
                      })
                    }
                  />
                  <Form.Label className="fee-label">
                    Down Payment Amount
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Amount"
                    className="fee-inputs"
                    required
                    value={data.down_payment_amount}
                    isValid={false}
                    onChange={(e) => {
                      parseInt(
                        setData({
                          ...data, down_payment_amount: e.target.value,
                          ExtraFields: {
                            ...data.ExtraFields,
                            token: e.target.value
                          },
                          balance_Due: ((data.offered_purchase_prize - e.target.value)).toString()
                        })
                      )
                    }}
                  />
                  {parseInt(data.down_payment_amount) > parseInt(data.offered_purchase_prize) ?
                    <Form.Label className="fee-label text-danger">Down Payment cannot be greater than offered purchase price</Form.Label> :
                    ""}
                  <br />
                  <Form.Label className="fee-label">Balance Due</Form.Label>

                  <Form.Control
                    type="number"
                    min="0"
                    step="1"
                    placeholder="Enter Due"
                    className="fee-inputs"
                    disabled
                    value={
                      (parseInt(data.down_payment_amount) > parseInt(data.offered_purchase_prize)) ? 0 :
                        parseInt(data.offered_purchase_prize - data.down_payment_amount)
                    }
                  />
                </Form.Group>
                <Form.Label className="fee-label">Closing Date :</Form.Label>{" "}
                &nbsp;
                <DatePicker
                  defaultValue={dayjs((new Date()).toLocaleDateString('en-GB'), dateFormatList[0])}
                  format={dateFormatList}
                  disabledDate={(current) => current && current.isBefore(dayjs(), "day")}
                  onChange={(e) => {
                    setData({
                      ...data,
                      closing_Date: new Date(e.$d).toLocaleDateString('en-GB'),
                      ExtraFields: {
                        ...data.ExtraFields,
                        closingDate: new Date(e.$d).toLocaleDateString('en-GB')
                      },
                    })
                  }}
                />
                <Button
                  variant="primary"
                  type="submit"
                  className="fee-btn"
                  disabled={(parseInt(data.down_payment_amount) < parseInt(data.offered_purchase_prize)) ? 0 :
                    parseInt(data.offered_purchase_prize - data.down_payment_amount)}
                >
                  Generate Offer
                </Button>
              </Form>
            )}
          </div>
        </div>
        
      </Main>
    </div>
    }</>
  );
};
export default InitiateOffer;