import Axios from "axios";
const SIGN_DESK_API_ESIGN = "https://uat.signdesk.in/api/sandbox/widgetToken";
const SIGN_DESK_UAT_API_KEY_ESIGN = "42564db9b1d5ab2a2cd0f2562d417dc2";
const SIGN_DESK_UAT_API_ID_ESIGN = "agarwalestate_esign_uat";
const LOCALHOSTURL = "http://localhost:8000/";
let documentId = '';
let signerid = '';
let docketid = '';
const width = '1200px'
const height = '600px'
var clientData = {
  document_id: documentId,
  signer_id: signerid,
  docket_id: docketid,
  id: SIGN_DESK_UAT_API_ID_ESIGN,
  widget_width: width,
  widget_height: height,
  "x-parse-rest-api-key": SIGN_DESK_UAT_API_KEY_ESIGN,
  "x-parse-application-id": SIGN_DESK_UAT_API_ID_ESIGN,

  getWidgetToken: function (result) {
    widgetCall({ "widget_token": result })
  },
  signatureStatus: function (result) {
    if (result?.status === "success") {
      Axios({
        method: "post",
        url: `${LOCALHOSTURL}property/getsigndoc`,
        data: {
          docket_id: docketid,
          document_id: result?.document_id,
        }
      }).then((res) => {
        clientData.callback2(res);
      });
    }

  },
  errorLog: function (result) {
  },
};
export const initiateSigning = ({ propertyId, templateType, templateSubType, callbackFunction, addToast, loaderFalse }) => {
  Axios({
    method: "post",
    url: `${LOCALHOSTURL}property/signdoc`,
    data: {
      propertyId,
      templateType,
      templateSubType
    }
  }).then((res) => {
    docketid = res.data.data.docket_id;
    signerid = res.data.data.signer_info[0].signer_id;
    documentId = res.data.data.signer_info[0].document_id;
    clientData.docket_id = res.data.data.docket_id;
    clientData.document_id = res.data.data.signer_info[0].document_id;
    clientData.signer_id = res.data.data.signer_info[0].signer_id;
    clientData.callback2 = callbackFunction;
    clientData.addToast = addToast;
    clientData.loaderFalse = loaderFalse;


    window.esignWidgetCall(clientData);
    loaderFalse(false)


  }).catch((e) => {
    loaderFalse(false)
    addToast("error", { appearance: 'error' })
  });
}

function widgetCall(payloadData) {
  Axios({
    method: "post",
    headers: {
      "x-parse-rest-api-key": SIGN_DESK_UAT_API_KEY_ESIGN,
      "x-parse-application-id": SIGN_DESK_UAT_API_ID_ESIGN,
    },
    url: SIGN_DESK_API_ESIGN,
    data: payloadData,
  }).then((rsp) => { }).catch((e) => {
    clientData.addToast("Unable to open signin", { appearance: 'error' })
    clientData.loaderFalse(false)
  });
}