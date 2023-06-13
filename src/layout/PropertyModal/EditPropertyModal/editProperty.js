import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { updateManagePropData } from "../../../pages/super-admin-manageProperties/service";
import { useToasts } from "react-toast-notifications";
import {
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";

const EditProperty = ({
  isEditModal,
  setIsEditModal,
  data,
  callBack,
  name,
}) => {
  const { addToast } = useToasts();
  const [editOtherData, setEditOtherData] = useState(data);
  const [editData, setEditData] = useState(data);
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const editPropResp = useSelector((state) => state.superAdminProperties);
  useEffect(() => {
    setEditData(data);
  }, [data]);

  const submitEdit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    const changeData = {};
    let propHis = sessionStorage.getItem("propHis")
      ? JSON.parse(sessionStorage.getItem("propHis"))
      : [];
    let his = [];
    for (const item in data) {
      if (data.hasOwnProperty(item)) {
        if (item === "address") {
          // Handle address separately
          const addressFields = [
            "address_line1",
            "address_line2",
            "city",
            "zipCode",
          ];
          const updatedAddress = addressFields
            .map((field) => {
              if (
                data[item]?.[0] && 
                editData[item]?.[0] && 
                data[item][0][field] !== editData[item][0][field]
              )
              {
                changeData.id = editData._id;
                changeData[item] = editData[item];
                return `${field} updated to ${editData[item][0][field]}`;
              }
              return null;
            })
            .filter(Boolean);

          if (updatedAddress.length > 0) {
            his = his.concat(updatedAddress);
          }
        } else if (data[item] !== editData[item]) {
          changeData.id = editData._id;
          changeData[item] = editData[item];
          his.push(`${item} updated to ${editData[item]}`);
        }
      }
    }
    propHis.push({
      name: name,
      time: new Date(),
      activity: his.join(", "),
    });
    sessionStorage.setItem("propHis", JSON.stringify(propHis));
    dispatch(updateManagePropData(changeData));
  };

  useEffect(() => {
    if (editPropResp.updateManageStatus && isSubmit) {
      if (editPropResp.updateManageStatus === "Success") {
        addToast(editPropResp.updateManagePropMessage, {
          appearance: "success",
        });
        setIsEditModal(!isEditModal);
        callBack();
        setIsSubmit(false);
      } else {
        addToast(editPropResp.updateManagePropMessage, { appearance: "error" });
        setIsEditModal(!isEditModal);
        setIsSubmit(false);
      }
    }
  }, [editPropResp]);

  const isPentHouse = editOtherData?.PropertyType === "Pent_house";

  return (
    <>
      <Modal
        size="lg"
        show={isEditModal}
        onHide={() => setIsEditModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        className="editProperty"
      >
        <Modal.Header closeButton className="edit-modal">
          <Modal.Title
            id="example-modal-sizes-title-lg"
            className="text-center w-100 text-light"
          >
            Edit Property Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="edit-modal">
          <Form onSubmit={(e) => submitEdit(e)}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="Id">
                  <TextField
                    id="ID no"
                    label="ID no"
                    variant="outlined"
                    type="text"
                    className={"inputBox fieldWidth"}
                    onChange={(e) =>
                      setEditData({ ...editData, _id: e.target.value })
                    }
                    value={editData?._id}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="FlatNo">
                  <TextField
                    id="Flat No"
                    label="Flat No"
                    variant="outlined"
                    type="text"
                    onChange={(e) =>
                      setEditData({ ...editData, flat_no: e.target.value })
                    }
                    value={editData?.flat_no}
                    className={"inputBox fieldWidth"}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="FloorNo">
                  <TextField
                    id="Floor No"
                    label="Floor No"
                    variant="outlined"
                    type="text"
                    className="inputBox fieldWidth"
                    onChange={(e) =>
                      setEditData({ ...editData, floor_no: e.target.value })
                    }
                    value={editData?.floor_no}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="Door Facing Direction">
                  <FormControl
                    variant="outlined"
                    className="InputBox fieldWidth"
                  >
                    <InputLabel id="Door Facing Direction">
                      Door Facing Direction
                    </InputLabel>
                    <Select
                      labelId="Door-Facing-Direction"
                      id="Door-Facing-Direction"
                      label="Door Facing Direction"
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          door_facing_direction: e.target.value,
                        })
                      }
                      value={editData?.door_facing_direction}
                    >
                      <MenuItem value="South">South</MenuItem>
                      <MenuItem value="North">North</MenuItem>
                      <MenuItem value="East">East</MenuItem>
                      <MenuItem value="West">West</MenuItem>
                    </Select>
                  </FormControl>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="SuperBuiltUpArea">
                  <TextField
                    id="Super BuiltUp Area "
                    label="Super Built Up Area "
                    variant="outlined"
                    type="text"
                    className="InputBox fieldWidth"
                    onChange={(e) =>
                      setEditData(
                        parseInt({
                          ...editData,
                          super_built_up_area: parseInt(e.target.value),
                        })
                      )
                    }
                    value={editData?.super_built_up_area}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="Bhk">
                  <FormControl
                    variant="outlined"
                    className="InputBox fieldWidth"
                  >
                    <InputLabel id="bhk-label">Bhk</InputLabel>
                    <Select
                      labelId="bhk-label"
                      id="bhk-label"
                      label="Bhk"
                      onChange={(e) =>
                        setEditData({ ...editData, bhk: e.target.value })
                      }
                      value={editData?.bhk}
                    >
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                      <MenuItem value="4">4</MenuItem>
                    </Select>
                  </FormControl>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="CarParking">
                  <FormControl
                    variant="outlined"
                    className="InputBox fieldWidth"
                  >
                    <InputLabel id="car-parking-label">Car Parking</InputLabel>
                    <Select
                      labelId="car-parking-label"
                      id="car-parking-label"
                      label="Car Parking"
                      onChange={(e) =>
                        setEditData({ ...editData, car_park: e.target.value })
                      }
                      value={editData?.car_park}
                    >
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                      <MenuItem value="4">4</MenuItem>
                    </Select>
                  </FormControl>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="Status">
                  <FormControl
                    variant="outlined"
                    className="InputBox fieldWidth"
                  >
                    <InputLabel id="furnishing-status-label">Status</InputLabel>
                    <Select
                      labelId="furnishing-status-label"
                      id="furnishing-status"
                      label="Status"
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          furnishing_status: e.target.value,
                        })
                      }
                      value={editData?.furnishing_status}
                    >
                      <MenuItem value="Furnished">Furnished</MenuItem>
                      <MenuItem value="Unfurnished">Unfurnished</MenuItem>
                      <MenuItem value="Semi Furnished">Semi Furnished</MenuItem>
                    </Select>
                  </FormControl>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="No of Floor">
                  <TextField
                    id="No of Floor"
                    label="No of Floor"
                    variant="outlined"
                    type="text"
                    className="inputBox fieldWidth"
                    onChange={(e) =>
                      setEditData({ ...editData, no_of_floor: e.target.value })
                    }
                    value={editData?.no_of_floor}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="SocietyName">
                  <TextField
                    id="Society Name "
                    label="Society Name "
                    variant="outlined"
                    type="text"
                    className="inputBox fieldWidth"
                    onChange={(e) =>
                      setEditData({ ...editData, society_name: e.target.value })
                    }
                    value={editData?.society_name}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="BuilderName">
                  <TextField
                    id="Builder Name "
                    label="Builder Name "
                    variant="outlined"
                    type="text"
                    className="InputBox fieldWidth"
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        developer_name: e.target.value,
                      })
                    }
                    value={editData?.developer_name}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="Address1">
                  <TextField
                    id="Address 1 "
                    label="Address 1 "
                    variant="outlined"
                    type="text"
                    className="InputBox fieldWidth"
                    onChange={(e) => {
                      const address = {
                        ...editData.address[0],
                        address_line1: e.target.value,
                      };
                      const updatedAddress = {
                        ...editData,
                        address: [address],
                      };
                      setEditData(updatedAddress);
                    }}
                    value={`${editData?.address?.[0]?.address_line1}`}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="Address2">
                  <TextField
                    id="Address 2 "
                    label="Address 2 "
                    variant="outlined"
                    type="text"
                    className="InputBox fieldWidth"
                    onChange={(e) => {
                      const address = {
                        ...editData.address[0],
                        address_line2: e.target.value,
                      };
                      const updatedAddress = {
                        ...editData,
                        address: [address],
                      };
                      setEditData(updatedAddress);
                    }}
                    value={`${editData?.address?.[0]?.address_line2}`}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="City">
                  <TextField
                    id="City"
                    label="City"
                    variant="outlined"
                    type="text"
                    className="InputBox fieldWidth"
                    onChange={(e) => {
                      const address = {
                        ...editData.address[0],
                        city: e.target.value,
                      };
                      const updatedAddress = {
                        ...editData,
                        address: [address],
                      };
                      setEditData(updatedAddress);
                    }}
                    value={`${editData?.address?.[0]?.city}`}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="PinCode">
                  <TextField
                    id="Pin Code"
                    label="Pin Code"
                    variant="outlined"
                    type="number"
                    className="InputBox fieldWidth"
                    onChange={(e) => {
                      const address = {
                        ...editData.address[0],
                        zipCode: e.target.value,
                      };
                      const updatedAddress = {
                        ...editData,
                        address: [address],
                      };
                      setEditData(updatedAddress);
                    }}
                    value={`${editData?.address?.[0]?.zipCode}`}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="Price">
                  <TextField
                    id="Price"
                    label="Price"
                    variant="outlined"
                    type="number"
                    className="InputBox fieldWidth"
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        price: parseInt(e.target.value),
                      })
                    }
                    value={editData?.price}
                  />
                </Form.Group>
              </Col>
            </Row>
            {isPentHouse && (
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="Id">
                    <TextField
                      id="terrace_area"
                      label="Terrace Area"
                      variant="outlined"
                      type="text"
                      className={"inputBox fieldWidth"}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          terrace_area: e.target.value,
                        })
                      }
                      value={editData?.terrace_area}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="FlatNo">
                    <TextField
                      id="additional_room"
                      label="Additional Room"
                      variant="outlined"
                      type="text"
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          additional_room: e.target.value,
                        })
                      }
                      value={editData?.additional_room}
                      className={"inputBox fieldWidth"}
                    />
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

export default EditProperty;
