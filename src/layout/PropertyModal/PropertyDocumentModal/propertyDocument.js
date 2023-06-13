import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Modal, Table, Button } from 'react-bootstrap';
import openFolder1 from "../../../assets/openFolder.svg";
import backBtn from "../../../assets/Icons/arrow-left.svg";
import { getAllFilesInsideChecklist, getFileFromChecklist, getCheckListFolder, updateCheckListDocument, updateCheckListType } from "../../../pages/super-admin-manageProperties/service";
import { useLocation } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { useToasts } from "react-toast-notifications";

const PropertyDocument = ({ isPropertyModal, setIsPropertyModal, openModal, modalInitial, title, setTitle }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("")
  const [documentSubmit, setDocumentSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const getId = useLocation().search;
  const searchParams = new URLSearchParams(getId);
  const propertyId = searchParams.get("pid")
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { addToast } = useToasts();

  const checkListTypeData = useSelector(
    (state) => state.superAdminProperties?.checkListData
  );

  const checkListFolderData = useSelector(
    (state) => state.superAdminProperties
  );

  const addData = () => {
    setDocumentSubmit(true);
    const formData = new FormData();
    selectedFiles.forEach((fileDoc) => {
      formData.append('propertydoc', fileDoc);
    });
    formData.append('property_id', propertyId);
    formData.append('checklist_name', name);
    setIsLoading(true)
    dispatch(updateCheckListDocument(formData)).then(() => setIsLoading(false)).catch(()=>{
      setIsLoading(false)
    });
    setSelectedFiles([]);
  }

  useEffect(() => {
    if (checkListFolderData.status && documentSubmit) {
      if (checkListFolderData.status === "Success") {
        addToast(checkListFolderData.message, {
          appearance: "success",
        });
        setDocumentSubmit(false);
      } else {
        addToast(checkListFolderData.message, { appearance: "error" });
      }
    }
  }, [checkListFolderData]);

  const getData = (propertyData) => {
    const getAllFilesdata = {
      property_id: propertyId,
      checklist_name: propertyData.title
    }
    setIsLoading(true)
    dispatch(getAllFilesInsideChecklist(getAllFilesdata)).then(() => setIsLoading(false)).catch(()=>{
      setIsLoading(false);
    });
  }

  const getPropertyDocuments = (data) => {;
    const propertyDocument = {
      property_id: propertyId,
      checklist_name: title.title,
      document_name: getFileName(data?.Key)
    }
    setIsLoading(true)
    dispatch(getFileFromChecklist(propertyDocument)).then(() => setIsLoading(false));
  }

  const getFileName = (Key) => {
    const fileArr = Key.split('/');
    const fileName = fileArr[fileArr.length - 1];
    return fileName;
  }
  const loggedInUser = useSelector((state) => state.loggedInUser);
  useEffect(() => {
    dispatch(updateCheckListType({ type: 'Flat_Apartment', accessToken: loggedInUser.data.data?.accessToken }))
    dispatch(getCheckListFolder(propertyId));
  }, [])

  const [show, setShow] = useState();
  useEffect(() => {
    setShow(openModal);
    if (!openModal && title?._id) {
      setName(title?.title)
      getData(title);
    }
  }, [openModal, title])

  useEffect(() => {
    if (checkListFolderData.checkListStatus == "Success" && !title?._id) {
      setShow(!show)
    }
  }, [checkListFolderData]);

  return (
    <>
      <Modal
        size="lg"
        show={isPropertyModal}
        onHide={() => { setTitle({}); modalInitial(false); setIsPropertyModal(false) }}
        aria-labelledby="example-modal-sizes-title-lg"
        className='propertyData'
      >
        <Modal.Header closeButton className='property-modal'>
          {!show ? <Button variant="transparent" onClick={() => setShow(!show)}><img src={backBtn} /></Button> : ""}
          <span className="fw-bold">{title?.title ? title?.title : name}</span>
        </Modal.Header>
        {isLoading ? (
          <Loader />
        ) : (
          <Modal.Body className=''>
            {show ? (<Row>
              {checkListTypeData?.map((propertyData) => (
                <Col xs lg="4" className="text-center mb-4"
                  onClick={() => {
                    setName(propertyData.title)
                    getData(propertyData)
                  }}
                >
                  <Card>
                    <Card.Img variant="top" src={openFolder1} />
                    <Card.Body>
                      <Card.Title>{propertyData.title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>) :
              (<Table >
                <thead>
                  <tr>
                    <th className="ps-3">Document Name</th>
                    <th className="ps-2">Last Modified</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody> 
                  <tr>
                    <td className="ps-3">
                      <input type="file" multiple id="fileField" onChange={(e)=> setSelectedFiles([...e.target.files])}/>
                    </td>
                    <td></td>
                    <td><Button className="button-class" onClick={addData} disabled={selectedFiles.length === 0}>Upload</Button></td>
                  </tr>
                  {checkListFolderData?.checkListDoc?.map((data, index) => (
                    index !== 0 && <tr>
                      <td className="ps-3">{getFileName(data.Key)}</td>
                      <td className="ps-2">{new Date(data.LastModified).toLocaleDateString('en-GB')}</td>
                      <td className="ps-5"  onClick={()=>getPropertyDocuments(data)} style={{ textDecoration: 'underline',cursor: "pointer"}}>View</td>
                    </tr>
                  ))}

                </tbody>
              </Table>)
            }
          </Modal.Body>
        )}
      </Modal>

    </>
  );
};

export default PropertyDocument;
