import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { updateManagePropData } from "../../../pages/super-admin-manageProperties/service";
import { useToasts } from "react-toast-notifications";
import { TextField } from "@mui/material";

const PriceDetailEditProperty = ({
  isPriceEditModal,
  setIsPriceEditModal,
  data,
  callBack,
  name
}) => {
  const { addToast } = useToasts();
  const [editPriceData, setEditPriceData] = useState(data);
  const [isPriceSubmit, setIsPriceSubmit] = useState(false);
  const dispatch = useDispatch();
  const editPropResp = useSelector((state) => state.superAdminProperties);

  useEffect(() => {
    setEditPriceData(data);
  }, [data]);
  const submitPriceEdit = (e) => {
    e.preventDefault();
    setIsPriceSubmit(true);
    const updateData = {};
    let propHis = sessionStorage.getItem("propHis")
    ? JSON.parse(sessionStorage.getItem("propHis"))
    : [];
  let his = "";
    for (const item in data) {
      if (data.hasOwnProperty(item)) {
        if (data[item] !== editPriceData[item]) {
          updateData.id = editPriceData._id;
          updateData[item] = editPriceData[item];
          his = ` ${his} ${(item).replaceAll("_"," ")} updated to ${editPriceData[item]}`;
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
    dispatch(updateManagePropData(updateData));
  };

  useEffect(() => {
    if (editPropResp.updateManageStatus && isPriceSubmit) {
      if (editPropResp.updateManageStatus === "Success") {
        addToast(editPropResp.updateManagePropMessage, {
          appearance: "success",
        });
        setIsPriceEditModal(!isPriceEditModal);
        callBack();
        setIsPriceSubmit(false);
      } else {
        addToast(editPropResp.updateManagePropMessage, { appearance: "error" });
      }
    }
  }, [editPropResp]);

  return (
    <>
      <Modal
        size="lg"
        show={isPriceEditModal}
        onHide={() => setIsPriceEditModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        className="editProperty"
      >
        <Modal.Header closeButton className="edit-modal">
          <Modal.Title
            id="example-modal-sizes-title-lg"
            className="text-center w-100 text-light"
          >
            Edit Price Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="edit-modal">
          <Form onSubmit={(e) => submitPriceEdit(e)}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="PlatformFee">
                  <TextField
                    id="Platform Fee"
                    label="Platform Fee"
                    variant="outlined"
                    type="text"
                    className="inputBox"
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
                    className="inputBox"
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
                    className="inputBox"
                    onChange={(e) =>
                      setEditPriceData(parseInt({
                        ...editPriceData,
                        price: parseInt(e.target.value),
                      }))
                    }
                    value={editPriceData?.price}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="AgreementAmount">
                  <TextField
                    id="Agreement Amount"
                    label="Agreement Amount"
                    variant="outlined"
                    type="text"
                    className="inputBox fieldWidth"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="TokenAmount">
                  <TextField
                    id="Token Amount"
                    label="Token Amount"
                    variant="outlined"
                    type="text"
                    className="inputBox fieldWidth"
                  />
                </Form.Group>
              </Col>
            </Row>

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

export default PriceDetailEditProperty;
