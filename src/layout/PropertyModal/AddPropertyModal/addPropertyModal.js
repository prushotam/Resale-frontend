import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useToasts } from "react-toast-notifications";
import { postAddProperty } from "../../../pages/super-admin-manageProperties/service";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { getBuyerPropData } from "../../../pages/user-home/service";
const AddPropertyModal = ({ isDisplay, setIsDisplay, getUpdatedProperty }) => {
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const [propertyType, setPropertyType] = useState("");
  const [showTextField, setShowTextField] = useState(false);
  const [showText, setShowText] = useState(true)
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [modal, setModal] = useState(1);
  const [isSubmit, setIsSubmit] = useState(false);
  const [data, setData] = useState({
    user_id: `${loggedInUser.data?.data?.userByEmail?._id}`,
    property_parties_details: [
      {
        user_id: loggedInUser.data?.data?.userByEmail?._id,
        role: loggedInUser.data?.data?.userByEmail?.primary_role?._id,
        role_side: loggedInUser?.preferredRole,
        assigned_date: new Date(),
        assigned_by: loggedInUser.data?.data?.userByEmail?._id,
      },
    ],
  });
  const fetchAddPropertyData = useSelector(
    (state) => state.superAdminProperties
  );
  const role = useSelector((state) => state.loggedInUser.preferredRole);

  useEffect(() => {
    if (fetchAddPropertyData?.addPropStatus && isSubmit) {
      if (fetchAddPropertyData?.addPropStatus === "Success") {
        addToast(fetchAddPropertyData.addPropMessage, {
          appearance: "success",
        });
        setIsDisplay(!isDisplay);
        getUpdatedProperty();
        setIsSubmit(false);
        dispatch(getBuyerPropData(data?.user_id))
      } else {
        addToast(fetchAddPropertyData.addPropMessage, { appearance: "error" });
      }
    }
  }, [fetchAddPropertyData]);

  useEffect(() => {
    setModal(1);
  }, [isDisplay]);

  const onSubmit = (event) => {
    event.preventDefault();
    setData({ ...data, PropertyType: propertyType });
    setModal(2);
  };

  const onSubmitOtherDetails = (event) => {
    event.preventDefault();
    setModal(3);
  };

  const onSubmitPriceDetails = (event) => {
    event.preventDefault();
    dispatch(postAddProperty(data));
    setIsSubmit(true);
  };
  const onPrev = () => {
    setModal(1);
  };
  const onPrevDetails = () => {
    setModal(2);
  };
  
  return (
    <>
      {modal === 1 ? (
        <Modal
          size="lg"
          show={isDisplay}
          onHide={() => setIsDisplay(false)}
          className="addProperty"
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton className="add-modal">
            <Modal.Title
              id="example-modal-sizes-title-lg"
              className="text-center w-100 text-light"
            >
              Add Property Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="add-modal">
            <Form>
              <FormControl
                fullWidth
                variant="outlined"
                className="dropdownProp mb-4 customWidth"
              >
                <InputLabel id="property-type-label">
                  Select Property Type
                </InputLabel>
                <Select
                  label="Select Property Type"
                  value={data?.PropertyType || ""}
                  onChange={(e) => {
                    setPropertyType(e.target.value);
                    setShowTextField(e.target.value === "Pent_house");
                    setShowText(e.target.value === "Flat_Apartment" || e.target.value === "Pent_house" || e.target.value === "Empty_land")
                    setData({ ...data, PropertyType: e.target.value })
                  }}
                >
                  <MenuItem value="Flat_Apartment">Flat/Apartment</MenuItem>
                  <MenuItem value="Villa_Independent_house_Row_house">
                    Villa/Independent/house/Row House
                  </MenuItem>
                  <MenuItem value="Pent_house">Pent House</MenuItem>
                  <MenuItem value="Empty_land">Empty Land</MenuItem>
                </Select>
              </FormControl>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="FlatNo">
                    {showText && (
                      <TextField
                        id="Flat No "
                        label="Flat No."
                        variant="outlined"
                        type="text"
                        value={data?.flat_no || ""}
                        onChange={(e) =>
                          setData({ ...data, flat_no: e.target.value })
                        }
                        className="InputBox fieldWidth"
                      />
                    )}
                    {!showText && (
                      <TextField
                        id="Flat No "
                        label="Villa No./House"
                        variant="outlined"
                        type="text"
                        value={data?.flat_no || ""}
                        onChange={(e) =>
                          setData({ ...data, flat_no: e.target.value })
                        }
                        className="InputBox fieldWidth"
                      />
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="FloorNo">
                    <TextField
                      id="Floor No "
                      label="Floor No "
                      variant="outlined"
                      type="text"
                      value={data?.floor_no || ""}
                      onChange={(e) =>
                        setData({ ...data, floor_no: e.target.value })
                      }
                      className="InputBox fieldWidth"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="Door Facing Direction"
                  >
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
                        value={data?.door_facing_direction || ""}
                        onChange={(e) =>
                          setData({
                            ...data,
                            door_facing_direction: e.target.value,
                          })
                        }
                      >
                        <MenuItem value="South">South</MenuItem>
                        <MenuItem value="North">North</MenuItem>
                        <MenuItem value="East">East</MenuItem>
                        <MenuItem value="West">West</MenuItem>
                      </Select>
                    </FormControl>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="SuperBuiltUpArea">
                    <TextField
                      id="Super Built Up Area"
                      label="Super Built Up Area"
                      variant="outlined"
                      type="text"
                      value={data?.super_built_up_area || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          super_built_up_area: parseInt(e.target.value),
                        })
                      }
                      className="InputBox fieldWidth"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="Bhk">
                    <FormControl
                      variant="outlined"
                      className="InputBox fieldWidth"
                    >
                      <InputLabel id="bhk-label">BHK</InputLabel>
                      <Select
                        labelId="bhk-label"
                        id="bhk-label"
                        label="BHK"
                        value={data?.bhk || ""}
                        onChange={(e) =>
                          setData({ ...data, bhk: e.target.value })
                        }
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
                  <Form.Group className="mb-3" controlId="CarParking">
                    <FormControl
                      variant="outlined"
                      className="InputBox fieldWidth"
                    >
                      <InputLabel id="car-parking-label">
                        Car Parking
                      </InputLabel>
                      <Select
                        labelId="car-parking-label"
                        id="car-parking-label"
                        label="Car Parking"
                        value={data?.car_park || ""}
                        onChange={(e) =>
                          setData({ ...data, car_park: e.target.value })
                        }
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
                  <Form.Group className="mb-3" controlId="FurnishingStatus">
                    <FormControl
                      variant="outlined"
                      className="InputBox fieldWidth"
                    >
                      <InputLabel id="furnishing-status-label">
                        Status
                      </InputLabel>
                      <Select
                        labelId="furnishing-status-label"
                        id="furnishing-status"
                        label="Status"
                        value={data?.furnishing_status || ""}
                        onChange={(e) =>
                          setData({
                            ...data,
                            furnishing_status: e.target.value,
                          })
                        }
                      >
                        <MenuItem value="Furnished">Furnished</MenuItem>
                        <MenuItem value="Unfurnished">Unfurnished</MenuItem>
                        <MenuItem value="Semi Furnished">
                          Semi Furnished
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3" controlId="Nooffloor">
                    <TextField
                      id="No of floor"
                      label="Total No. of Floor"
                      variant="outlined"
                      type="text"
                      value={data?.no_of_floor || ""}
                      onChange={(e) =>
                        setData({ ...data, no_of_floor: e.target.value })
                      }
                      className="inputBox fieldWidth"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="SocietyName">
                    <TextField
                      id="Society Name"
                      label="Society Name"
                      variant="outlined"
                      type="text"
                      value={data?.society_name || ""}
                      onChange={(e) =>
                        setData({ ...data, society_name: e.target.value })
                      }
                      className="inputBox fieldWidth"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="BuilderName">
                    <TextField
                      id="Builder Name"
                      label="Builder Name"
                      variant="outlined"
                      type="text"
                      value={data?.developer_name || ""}
                      onChange={(e) =>
                        setData({ ...data, developer_name: e.target.value })
                      }
                      className="InputBox fieldWidth"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="Address1">
                    <TextField
                      id="Address 1 "
                      label="Address 1 "
                      variant="outlined"
                      type="text"
                      className="inputBox fieldWidth "
                      value={data?.address_line1 || ""}
                      onChange={(e) =>
                        setData({ ...data, address_line1: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="Address2">
                    <TextField
                      id="Address 2 "
                      label="Address 2 "
                      variant="outlined"
                      type="text"
                      className="inputBox  fieldWidth"
                      value={data?.address_line2 || ""}
                      onChange={(e) =>
                        setData({ ...data, address_line2: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="city">
                    <TextField
                      id="City "
                      label="City "
                      variant="outlined"
                      type="text"
                      className="inputBox  fieldWidth"
                      value={data?.city || ""}
                      onChange={(e) =>
                        setData({ ...data, city: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="PinCode">
                    <TextField
                      id="Pin Code"
                      label="Pin Code"
                      variant="outlined"
                      type="text"
                      className="inputBox fieldWidth "
                      value={data?.zipCode || ""}
                      onChange={(e) =>
                        setData({ ...data, zipCode: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              {showTextField && (
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="TerraceArea">
                      <TextField
                        id="terrace_area "
                        label="Terrace Area"
                        variant="outlined"
                        type="text"
                        className="inputBox  fieldWidth"
                        value={data?.terrace_area || ""}
                        onChange={(e) =>
                          setData({ ...data, terrace_area: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="AdditionalRoom">
                      <TextField
                        id="additional_room"
                        label="Additional Room"
                        variant="outlined"
                        type="text"
                        className="inputBox fieldWidth "
                        value={data?.additional_room || ""}
                        onChange={(e) =>
                          setData({ ...data, additional_room: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              )}

              <Row></Row>

              <Row>
                <Col className="text-center pt-5">
                  <Button
                    className="button"
                    variant="light px-5"
                    type="submit"
                    onClick={(e) => onSubmit(e)}
                  >
                    Next
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}
      {modal === 2 ? (
        <Modal
          size="lg"
          show={isDisplay}
          onHide={() => setIsDisplay(false)}
          className="addProperty"
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton className="add-modal">
            <Modal.Title
              id="example-modal-sizes-title-lg"
              className="text-center w-100 text-light"
            >
              Other Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="add-modal">
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="price" fullWidth>
                    <TextField
                      id="price"
                      label="Property Price"
                      variant="outlined"
                      type="number"
                      value={data?.price || ""}
                      onChange={(e) =>
                        setData(
                          ({ ...data, price: parseInt(e.target.value) })
                        )
                      }
                      className="inputBox fieldWidth"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="khata No. ">
                    <TextField
                      id="khata No."
                      label="khata No."
                      variant="outlined"
                      type="text"
                      value={data?.khata_number || ""}
                      onChange={(e) =>
                        setData({ ...data, khata_number: e.target.value })
                      }
                      className="inputBox fieldWidth"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="Registration No.">
                    <TextField
                      id="Registration No."
                      label="Registration No."
                      variant="outlined"
                      type="text"
                      value={data?.registration_number || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          registration_number: e.target.value,
                        })
                      }
                      className="inputBox fieldWidth"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="No. Of Seller">
                    <TextField
                      id="No. Of Seller"
                      label="No. Of Seller"
                      variant="outlined"
                      type="number"
                      value={data?.no_of_owners || ""}
                      InputProps={{
                        inputProps: {
                          max: 4, min: 0
                        }
                      }}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "" || (Number(value) >= 0 && Number(value) <= 4)) {
                          setData({
                            ...data,
                            no_of_owners: parseInt(value),
                          });
                        }
                      }}
                      className="inputBox fieldWidth"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="No. Of Buyer">
                    <TextField
                      id="No. Of Buyer"
                      label="No. Of Buyer"
                      variant="outlined"
                      type="number"
                      value={data?.no_of_buyers|| ""}
                      InputProps={{
                        inputProps: {
                          max: 4, min: 0
                        }
                      }}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "" || (Number(value) >= 0 && Number(value) <= 4)) {
                          setData({
                            ...data,
                            no_of_buyers: parseInt(value),
                          });
                        }
                      }}
                      className="inputBox fieldWidth"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                <Form.Group className="mb-3" controlId="No. Of Survey">
                    <TextField
                      id="No.Of Survey"
                      label="No.Of Survey"
                      variant="outlined"
                      type="text"
                      value={data?.survey_number || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          survey_number: e.target.value,
                        })
                      }
                      className="inputBox fieldWidth"
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
                      value={data?.usp || ""}
                      onChange={(e) =>
                        setData({ ...data, usp: e.target.value })
                      }
                      className="inputBox fieldWidth"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="Schedule No.">
                    <TextField
                      id="Schedule No."
                      label="Schedule No."
                      variant="outlined"
                      type="text"
                      value={data?.schedule_number || ""}
                      onChange={(e) =>
                        setData({ ...data, schedule_number: e.target.value })
                      }
                      className="inputBox fieldWidth"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="  CD Number">
                    <TextField
                      id="CD Number"
                      label="CD Number"
                      variant="outlined"
                      type="text"
                      value={data?.cd_number || ""}
                      onChange={(e) =>
                        setData({ ...data, cd_number: e.target.value })
                      }
                      className="inputBox fieldWidth"
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
                      value={data?.rented ? "Yes" : "No" || ""}
                      label="IsRented"
                      className="inputBox fieldWidth"
                      onChange={(e) => {
                        setData({
                          ...data,
                          ...(e.target.value === "Yes"
                            ? { rented: true }
                            : { rented: false }),
                        });
                      }}
                      defaultValue={"No"}
                    >
                      <MenuItem value={"Yes"}>Yes</MenuItem>
                      <MenuItem value={"No"}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Col>
                {data?.rented && (
                  <Col>
                    <Form.Group className="mb-3" controlId="TenantName">
                      <TextField
                        id="Tenant Name"
                        label="Tenant Name"
                        variant="outlined"
                        type="text"
                        value={data?.tenant?.name}
                        onChange={(e) =>
                          setData({
                            ...data,
                            tenant: { ...data.tenant, name: e.target.value },
                          })
                        }
                        className="inputBox fieldWidth"
                      />
                    </Form.Group>
                  </Col>
                )}
              </Row>
              {data?.rented && (
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="TenantMail">
                      <TextField
                        id="Tenant Mail"
                        label="Tenant Mail"
                        variant="outlined"
                        type="email"
                        value={data?.tenant?.email}
                        onChange={(e) =>
                          setData({
                            ...data,
                            tenant: { ...data.tenant, email: e.target.value },
                          })
                        }
                        className="inputBox fieldWidth"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="TenantPhone">
                      <TextField
                        id="Tenant Phone"
                        label="Tenant Phone"
                        variant="outlined"
                        type="text"
                        value={data?.tenant?.phone}
                        onChange={(e) =>
                          setData({
                            ...data,
                            tenant: {
                              ...data.tenant,
                              phone:
                                parseInt(e.target.value) > 0
                                  ? parseInt(e.target.value)
                                  : 0,
                            },
                          })
                        }
                        className="inputBox fieldWidth"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              )}
              <Row>
                <Col className="text-center  pt-5">
                  <Button
                    className="button"
                    variant="primary px-5"
                    type="submit"
                    onClick={(e) => onPrev(e)}
                  >
                    Prev
                  </Button>
                </Col>
                <Col className="text-center pt-5">
                  <Button
                    className="button"
                    variant="light px-5"
                    type="submit"
                    onClick={(e) => onSubmitPriceDetails(e)}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}
      {modal === 3 ? (
        <Modal
          size="lg"
          show={isDisplay}
          onHide={() => setIsDisplay(false)}
          className="addProperty"
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton className="add-modal">
            <Modal.Title
              id="example-modal-sizes-title-lg"
              className="text-center w-100 text-light"
            >
              Price Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="add-modal">
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="Platform Fee ">
                    <TextField
                      id="Platform Fee"
                      label="Platform Fee"
                      variant="outlined"
                      type="text"
                      value={data?.Platform_Fee}
                      onChange={(e) =>
                        setData({ ...data, Platform_Fee: e.target.value })
                      }
                      className="InputBox fieldWidth"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="Price">
                    <TextField
                      id="Price"
                      label="Price"
                      variant="outlined"
                      type="text"
                      value={data?.price}
                      onChange={(e) =>
                        setData(
                          ({ ...data, price: parseInt(e.target.value) })
                        )
                      }
                      className="InputBox fieldWidth"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="Token amount">
                    <TextField
                      id="Token amount"
                      label="Token amount"
                      variant="outlined"
                      type="text"
                      value={data?.token_amount}
                      onChange={(e) =>
                        setData({ ...data, token_amount: e.target.value })
                      }
                      className="InputBox fieldWidth"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="TDS">
                    <TextField
                      id="TDS"
                      label="TDS"
                      variant="outlined"
                      type="text"
                      value={data?.tds}
                      onChange={(e) =>
                        setData({ ...data, tds: e.target.value })
                      }
                      className="InputBox fieldWidth"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <Form.Group className="mb-3" controlId="Agreement amount">
                    <TextField
                      id="Agreement amount"
                      label="Agreement amount"
                      variant="outlined"
                      type="text"
                      value={data?.agreement_amount}
                      onChange={(e) =>
                        setData({ ...data, agreement_amount: e.target.value })
                      }
                      className="InputBox fieldWidth"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="text-center pt-5">
                  <Button
                    className="button"
                    variant="primary px-5"
                    type="submit"
                    onClick={(e) => onPrevDetails(e)}
                  >
                    Prev
                  </Button>
                </Col>
                <Col className="text-center pt-5">
                  <Button
                    className="button"
                    variant="light px-5"
                    type="submit"
                    onClick={(e) => onSubmitPriceDetails(e)}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

export default AddPropertyModal;