import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { updateManagePropData } from "../../../pages/super-admin-manageProperties/service";
import { useToasts } from "react-toast-notifications";
import { TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const OtherDetailEditProperty = ({
  isDetailEditModal,
  setIsDetailEditModal,
  data,
  callBack,
  name
}) => {
  const { addToast } = useToasts();
  const [editOtherData, setEditOtherData] = useState(data);
  const [isOtherSubmit, setIsOtherSubmit] = useState(false);
  const dispatch = useDispatch();
  const editPropResp = useSelector((state) => state.superAdminProperties);

  useEffect(() => {
    setEditOtherData(data);
  }, [data]);

  const submitEditOtherDetail = (e) => {
    e.preventDefault();
    setIsOtherSubmit(true);
    const updateData = {};
    let propHis = sessionStorage.getItem("propHis")
      ? JSON.parse(sessionStorage.getItem("propHis"))
      : [];
    let his = "";
    for (const item in data) {
      if (data.hasOwnProperty(item)) {
        if (data[item] !== editOtherData[item]) {
          updateData.id = editOtherData._id;
          updateData[item] = editOtherData[item];
          his = ` ${his} ${(item).replaceAll("_", " ")} updated to ${editOtherData[item]}`;
        }
      }
    }
    propHis.push({
      name: name,
      time: new Date(),
      activity: his,
    });
    sessionStorage.setItem("propHis", JSON.stringify(propHis));
    dispatch(updateManagePropData(updateData));
  };

  useEffect(() => {
    if (editPropResp.updateManageStatus && isOtherSubmit) {
      if (editPropResp.updateManageStatus === "Success") {
        addToast(editPropResp.updateManagePropMessage, {
          appearance: "success",
        });
        setIsDetailEditModal(!isDetailEditModal);
        callBack();
        setIsOtherSubmit(false);
      } else {
        addToast(editPropResp.updateManagePropMessage, { appearance: "error" });
      }
    }
  }, [editPropResp]);

  return (
    <>
      <Modal
        size="lg"
        show={isDetailEditModal}
        onHide={() => setIsDetailEditModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        className="editProperty"
      >
        <Modal.Header closeButton className="edit-modal" variant="white">
          <Modal.Title
            id="example-modal-sizes-title-lg"
            className="text-center w-100 text-light"
          >
            Edit Other Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="edit-modal">
          <Form onSubmit={(e) => submitEditOtherDetail(e)}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="KhataNo">
                  <TextField
                    id="Khata No"
                    label="Khata No"
                    variant="outlined"
                    type="text"
                    className="inputBox fieldWidth"
                    onChange={(e) =>
                      setEditOtherData({
                        ...editOtherData,
                        khata_number: e.target.value,
                      })
                    }
                    value={editOtherData?.khata_number}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="RegistrationNo">
                  <TextField
                    id="Registration No"
                    label="Registration No"
                    variant="outlined"
                    type="text"
                    className="inputBox fieldWidth"
                    onChange={(e) =>
                      setEditOtherData({
                        ...editOtherData,
                        registration_number: e.target.value,
                      })
                    }
                    value={editOtherData?.registration_number}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="NoOfOwners">
                  <TextField
                    id="No Of Owners"
                    label="No Of Owners"
                    variant="outlined"
                    type="text"
                    className="inputBox fieldWidth"
                    onChange={(e) =>
                      setEditOtherData(parseInt({
                        ...editOtherData,
                        no_of_owners: parseInt(e.target.value),
                      }))
                    }
                    value={editOtherData?.no_of_owners}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="USP">
                  <TextField
                    id="USP"
                    label="USP"
                    variant="outlined"
                    type="text"
                    className="inputBox fieldWidth"
                    onChange={(e) =>
                      setEditOtherData({
                        ...editOtherData,
                        usp: e.target.value,
                      })
                    }
                    value={editOtherData?.usp}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="ScheduleNo">
                  <TextField
                    id="Schedule No"
                    label="Schedule No"
                    variant="outlined"
                    type="text"
                    className="inputBox fieldWidth"
                    onChange={(e) =>
                      setEditOtherData({
                        ...editOtherData,
                        schedule_number: e.target.value,
                      })
                    }
                    value={editOtherData?.schedule_number}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="CDNumber">
                  <TextField
                    id="CD Number"
                    label="CD Number"
                    variant="outlined"
                    type="text"
                    className="inputBox fieldWidth"
                    onChange={(e) =>
                      setEditOtherData({
                        ...editOtherData,
                        cd_number: e.target.value,
                      })
                    }
                    value={editOtherData?.cd_number}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Is Rented
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={editOtherData?.rented ? "Yes" : "No"}
                    label="IsRented"
                    className="inputBox fieldWidth"
                    onChange={(e) => {
                      setEditOtherData({ ...data, ...e.target.value === "Yes" ? { rented: true } : { rented: false } })
                    }}
                    defaultValue={"No"}
                  >
                    <MenuItem value={"Yes"}>Yes</MenuItem>
                    <MenuItem value={"No"}>No</MenuItem>
                  </Select>
                </FormControl>
              </Col>
              {(editOtherData?.rented) && (
                <Col>
                  <Form.Group className="mb-3" controlId="TenantName">
                    <TextField
                      id="Tenant Name"
                      label="Tenant Name"
                      variant="outlined"
                      type="text"
                      onChange={(e) => setEditOtherData({
                        ...editOtherData,
                        tenant: { ...editOtherData.tenant, name: e.target.value }
                      })}
                      value={editOtherData?.tenant?.name}
                      className="inputBox fieldWidth" />
                  </Form.Group>
                </Col>
              )}
            </Row>
            {(editOtherData?.rented) && (
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="TenantMail">
                    <TextField
                      id="Tenant Mail"
                      label="Tenant Mail"
                      variant="outlined"
                      type="email"
                      onChange={(e) => setEditOtherData({
                        ...editOtherData,
                        tenant: { ...editOtherData.tenant, email: e.target.value }
                      })}
                      value={editOtherData?.tenant?.email}
                      className="inputBox fieldWidth" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="TenantPhone">
                    <TextField
                      id="Tenant Phone"
                      label="Tenant Phone"
                      variant="outlined"
                      onChange={(e) => setEditOtherData({
                        ...editOtherData,
                        tenant: { ...editOtherData.tenant, phone: parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 0 }
                      })}
                      value={editOtherData?.tenant?.phone}
                      type="text"
                      className="inputBox fieldWidth" />
                  </Form.Group>
                </Col>
              </Row>
            )}
            <Row>
              <Col className="text-center pt-5">
                <Button variant="light px-5" type="submit" className="button">
                  Update
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OtherDetailEditProperty;
