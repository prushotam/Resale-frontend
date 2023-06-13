import React, { useState, useEffect } from "react";
import Main from "../../layout/Main";
import "./style.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { Row, Col, Card, Table, Modal } from "react-bootstrap";
import openFolder from "../../assets/openFolder.svg";
import {
  Button,
  TextField,
  Typography,
  Skeleton,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { Checkbox } from "antd";
import { useToasts } from "react-toast-notifications";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { ArrowLeft } from "react-bootstrap-icons";
import { endpoint } from "../../utils/endpoints";
import pulse from "../../assets/Pulse-0.9s-200px.svg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReviewDocuments = () => {
  const env = process.env.REACT_APP_ENV || "development";
  const { addToast } = useToasts();
  const role = useSelector((state) => state.loggedInUser.prefferedRole);
  const userRoleId = useSelector(
    (state) => state.loggedInUser.data.data.userByEmail.primary_role._id
  );
  const userId = useSelector(
    (state) => state.loggedInUser.data.data.userByEmail._id
  );

  const viewPropertiesData = useSelector(
    (state) => state.superAdminProperties.propertyData
  );
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [folders, setFolders] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [fileKeys, setFileKeys] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [listLoading, setListLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [fileStatus, setFileStatus] = useState("-");
  const [isApproveAllChecked, setIsApproveAllChecked] = useState(false);
  const [isRejectAllChecked, setIsRejectAllChecked] = useState(false);
  const [reasonOfRejectAll, setReasonOfRejectAll] = useState("");
  const [viewingFile, setViewingFile] = useState("");
  const [openDialog, setOpenDialog] = useState(true);
  const [approveRejectAllMode, setApproveRejectAllMode] = useState(true);
  const [approveRejectOneByOne, setApproveRejectOneByOne] = useState(true);


//Folder Load API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${endpoint[env].baseUrl}property/createChecklistFolder/${viewPropertiesData._id}`
        );
        setFolders(response.data);
      } catch (error) {
        addToast(`Error fetching data: ${error.message}`, {
          appearance: "error",
          autoDismiss: true,
        });
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  //Get folder files API
  const fetchFilesInsideChecklist = async (clickedTitle) => {
    try {
      const response = await axios.put(
        `${endpoint[env].baseUrl}property/getAllFilesInsideChecklist`,
        {
          property_id: viewPropertiesData._id,
          checklist_name: clickedTitle,
        }
      );
      const files = response.data;
      const fileKeys = files.folderStructure.map((file) => file.Key);
      setFileKeys(fileKeys);
      setOpenDialog(true)
    } catch (error) {
      addToast(`Error fetching files inside checklist: ${error.message}`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
    setListLoading(false);
    
  };

  
//View Document API
  const handleViewDocument = async (fileLink) => {
    setShowModal(true);
    setFileLoading(true);
    setViewingFile(fileLink.split("/").pop());
    try {
      const response = await axios.put(
        `${endpoint[env].baseUrl}property/getFileFromChecklist`,
        {
          property_id: viewPropertiesData._id,
          checklist_name: selectedTitle,
          document_name: fileLink.split("/").pop(),
        },
        { responseType: "arraybuffer" }
      );

      const buffer = Buffer.from(response.data, "binary");
      const base64Data = buffer.toString("base64");

      const fileType = getFileType(fileLink);

      const document = {
        uri: `data:${fileType};base64,${base64Data}`,
        fileType: fileType,
      };

      setSelectedFile(document);
    } catch (error) {
      addToast(`Error fetching document: ${error.message}`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
    setFileLoading(false);
  };

  const getFileType = (fileName) => {
    const extension = fileName.split(".").pop();
    switch (extension) {
      case "pdf":
        return "application/pdf";
      case "doc":
      case "docx":
        return "application/msword";
      case "xls":
      case "xlsx":
        return "application/vnd.ms-excel";
      case "ppt":
      case "pptx":
        return "application/vnd.ms-powerpoint";
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      default:
        return "application/octet-stream";
    }
  };

  const handleReasonChange = (event) => {
    setReasonOfRejectAll(event.target.value);
  };

  const handleCloseModal = () => {
    setSelectedFile("");
    setShowModal(false);
  };

  //Approve-single doc API
  const handleApprove = async () => {
    const payload = {
      checklistName: selectedTitle,
      propertyId: viewPropertiesData._id,
      fileName: viewingFile,
      documentType: "CHECKLIST_CHECKLIST",
      approve: true,
      userRoleId: userRoleId,
      userId: userId,
    };

    try {
      const response = await axios.put(
        `${endpoint[env].baseUrl}propertydocument/approvereject`,
        payload
      );
      addToast("Approved Successfully", { appearance: "success", autoDismiss: true });
    } catch (error) {
      addToast(`Some error in approving document: ${error.message}`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
    setShowModal(false);
    
  };

  //Reject-single doc API
  const handleReject = async () => {
    const payload = {
      checklistName: selectedTitle,
      propertyId: viewPropertiesData._id,
      fileName: viewingFile,
      documentType: "CHECKLIST_CHECKLIST",
      approve: false,
      userRoleId: userRoleId,
      userId: userId,
    };

    try {
      const response = await axios.put(
        `${endpoint[env].baseUrl}propertydocument/approvereject`,
        payload
      );
      addToast("Rejected Successfully", { appearance: "success", autoDismiss: true });
    } catch (error) {
      addToast(`Some error in rejecting document: ${error.message}`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
    setShowModal(false);
  };
  const handleApproveAll = () => {
    setIsApproveAllChecked(true);
    setIsRejectAllChecked(false);
    setFileStatus("Approve");
  };

  const handleRejectAll = () => {
    setIsRejectAllChecked(true);
    setIsApproveAllChecked(false);
    setFileStatus("Reject");
  };


  //Approve All - Reject All API
  const onSubmit = async () => {
    const payload = {
      checklistName: selectedTitle,
      propertyId: viewPropertiesData._id,
      documentType: "CHECKLIST_CHECKLIST",
      approve: isApproveAllChecked,
      userRoleId: userRoleId,
      userId: userId,
    };

    try {
      const response = await axios.put(
        `${endpoint[env].baseUrl}propertydocument/approverejectall`,
        payload
      );
      addToast(isApproveAllChecked?"Approved all Successfully":"Rejected all Successfully", { appearance: "success", autoDismiss: true });
    } catch (error) {
      addToast(`Error Submiting Status: ${error.message}`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const handleApproveRejectAllMode = () => {
    setApproveRejectOneByOne(false)
    setApproveRejectAllMode(true)
    setOpenDialog(false)
  };

  const handleApproveRejectOneByOneMode = () => {
    setApproveRejectAllMode(false)
    setApproveRejectOneByOne(true)
    setOpenDialog(false)
  };
  return (
    <div>
      <Main showUserNavbar={true} role={role}>
        <div className="container">
          <div className="fee-container">
            <div className="inner-container">
              {show ? (
                <>
                  <div className="d-flex justify-content-start">
                    <span>
                      <Button
                        onClick={() => {
                          setShow(false);
                          setFileKeys([]);
                          setFileStatus("-")
                          setIsApproveAllChecked(false)
                          setIsRejectAllChecked(false)
                        }}
                      >
                        <ArrowLeft size={20} /> Back
                      </Button>
                    </span>
                  </div>
                  <Table className="reviewDocument-table ">
                    <thead
                      style={{
                        backgroundColor: "var(--darkBlue)",
                        width: "100vh",
                      }}
                    >
                      <tr>
                        <th
                          colSpan="4"
                          style={{ textAlign: "center", color: "white" }}
                        >
                          <div>{selectedTitle}</div>
                        </th>
                      </tr>
                    </thead>

                    {listLoading ? (
                      <Box sx={{ pt: 0.5 }}>
                        <Typography
                          variant="h5"
                          component="h5"
                          align="center"
                          sx={{ color: "var(--darkBlue)" }}
                        >
                          Listing Documents
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Skeleton
                            sx={{
                              width: "70%",
                              height: "50px",
                              borderRadius: "4px",
                              my: 1,
                            }}
                            animation="wave"
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Skeleton
                            sx={{
                              width: "40%",
                              height: "50px",
                              borderRadius: "4px",
                              my: 1,
                            }}
                            animation="wave"
                          />
                        </Box>
                      </Box>
                    ) : (
                      <tbody>
                        <tr>
                          <td colSpan="4">
                            {approveRejectAllMode && (
                              <div className="checkbox-container">
                                <Checkbox
                                  checked={isApproveAllChecked}
                                  onChange={handleApproveAll}
                                >
                                  Approve All
                                </Checkbox>
                                <Checkbox
                                  checked={isRejectAllChecked}
                                  onChange={handleRejectAll}
                                >
                                  Reject All
                                </Checkbox>
                              </div>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th>S.No</th>
                          <th>File Name</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                        {fileKeys.map((fileKey, index) => {
                          if (index !== 0) {
                            return (
                              <tr key={index}>
                                <td>{index}</td>
                                <td>{fileKey.split("/").pop()}</td>
                                <td>{fileStatus}</td>
                                <td>
                                  <div className="btn-container">
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={() =>
                                        handleViewDocument(fileKey)
                                      }
                                    >
                                      View Document
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                          return null;
                        })}
                        <Dialog
                          open = {openDialog}
                          TransitionComponent={Transition}
                          keepMounted
                          aria-describedby="alert-dialog-slide-description"
                         
                        >
                          <DialogTitle  className="selection-dialog">
                            {"Approval of documents"}
                          </DialogTitle>
                          <DialogContent  className="selection-dialog">
                            <DialogContentText id="alert-dialog-slide-description" className="selection-dialog">
                              <Typography variant="h5">
                                {" "}
                                Select the method of approving the property documents.
                              </Typography>
                              <Typography variant="h6">
                                {" "}
                                a. Click Approve-Reject-All for
                                approve-reject all documents after viewing
                                them.
                              </Typography>
                              <Typography variant="h6">
                                {" "}
                                b. Click Approve-Reject-One-By-One to
                                approve-reject one at a time while viewing
                                them.
                              </Typography>
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              variant="contained"
                              onClick={handleApproveRejectAllMode}
                            >
                              Approve-Reject-All{" "}
                            </Button>
                            <Button
                              variant="contained"
                              onClick={handleApproveRejectOneByOneMode}
                            >
                              One-By-One
                            </Button>
                          </DialogActions>
                        </Dialog>
                        {isRejectAllChecked && (
                          <tr>
                            <td colSpan="4">
                              <div>
                                <TextField
                                  placeholder="Reason of Rejecting all Documents"
                                  value={reasonOfRejectAll}
                                  onChange={handleReasonChange}
                                  fullWidth
                                  required
                                  error={!reasonOfRejectAll ? true : false}
                                  helperText="Mandtory Field"
                                />
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    )}
                    <tfoot>
                      <tr>
                        <td colSpan="4">
                          <div className="btn-container text-center">
                            {approveRejectAllMode && (
                              <Button
                              variant="contained"
                              color="primary"
                              onClick={onSubmit}
                              disabled={
                                isRejectAllChecked && !reasonOfRejectAll
                              }
                            >
                              Submit
                            </Button>
                            )}
                            
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                    <Modal show={showModal} dialogClassName="custom-modal">
                      <div className="d-flex justify-content-start">
                        <span>
                          <Button onClick={() => handleCloseModal()}>
                            <ArrowLeft size={20} /> Back
                          </Button>
                        </span>
                      </div>
                      <Modal.Body>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Card elevation={5}>
                            {fileLoading ? (
                              <img src={pulse} alt="loading" />
                            ) : (
                              ""
                            )}
                          </Card>
                        </Box>

                        {selectedFile && (
                          <DocViewer
                            documents={[selectedFile]}
                            renderer={DocViewerRenderers.AUTO}
                          />
                        )}
                      </Modal.Body>
                      {approveRejectOneByOne && (
                        <Modal.Footer>
                          <Button
                            className="btn-container button"
                            variant="contained"
                            onClick={() => handleApprove()}
                          >
                            Approve
                          </Button>
                          <Button
                            className="btn-container button"
                            variant="contained"
                            onClick={() => handleReject()}
                          >
                            Reject
                          </Button>
                        </Modal.Footer>
                      )}
                    </Modal>
                  </Table>
                </>
              ) : loading ? (
                <Box sx={{ pt: 0.5 }}>
                  <Typography
                    variant="h5"
                    component="h5"
                    align="center"
                    sx={{ color: "var(--darkBlue)" }}
                  >
                    Fetching Files...
                  </Typography>
                  <Skeleton
                    sx={{ height: 190, borderRadius: "8px" }}
                    animation="wave"
                    variant="rectangular"
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton
                      sx={{
                        width: "70%",
                        height: "20px",
                        borderRadius: "4px",
                        my: 1,
                      }}
                      animation="wave"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton
                      sx={{
                        width: "40%",
                        height: "20px",
                        borderRadius: "4px",
                        my: 1,
                      }}
                      animation="wave"
                    />
                  </Box>
                </Box>
              ) : (
                <Row xl={3}>
                  {folders?.folderStructure?.map((folder) => (
                    <Col
                      className="text-center mb-5"
                      onClick={() => {
                        setShow(true);
                        const clickedTitle = folder.Prefix.split("/")[1]
                          .trim()
                          .toString();
                        setSelectedTitle(clickedTitle);
                        fetchFilesInsideChecklist(clickedTitle);
                        setListLoading(true);
                      }}
                    >
                      <Card className="reviewDocumentsCard">
                        <Card.Img
                          variant="top"
                          src={openFolder}
                          className="card-img"
                        />
                        <Card.Body>
                          <Card.Title>
                            {folder.Prefix.split("/")[1].trim()}
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </div>
        </div>
      </Main>
    </div>
  );
};
export default ReviewDocuments;
