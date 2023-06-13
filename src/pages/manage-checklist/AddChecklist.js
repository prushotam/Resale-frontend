import React, { useEffect, useState } from "react";
import Button from "../../layout/Button";
import Form from "react-bootstrap/Form";
import Axios from "axios";

import Modal from "react-bootstrap/Modal";
import { FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";


function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

export default function Page({
  isOpen = false,
  onClose = () => {},
  onSubmit = () => {},
  currentType,
  ...props
}) {
  const [isDiscard, setIsDiscard] = useState(false);
  const [modalOpen, setModalOpen] = useState(isOpen);
  const [stages, setStages] = useState([]);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const [checklist, setChecklist] = useState({
  });

  useEffect(() => {
    Axios.get("http://localhost:8000/stages").then((res) => {
      if (res?.data?.stages) {
        setStages(res?.data?.stages);
      }
    });
  }, []);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  const onDoSubmit = (e) => {
    e.preventDefault();
    checklist.created_by = `${loggedInUser.data.data.superAdminByEmail._id}`;
    onSubmit(checklist);
    onClose();
  };

  const onDoClose = (e) => {
    e.preventDefault();
    setIsDiscard(true);
  };

  const handleCloseModal = () => {
    setIsDiscard(false);
    setModalOpen(false);
    onClose();
    setModalOpen(false);
  };

  return (
    <Modal
      show={modalOpen}
      onHide={handleCloseModal}
      size="xl"
      aria-labelledby="example-modal-sizes-title-lg"
      className="editProperty"
    >
      <div className="blueBg form-area">
        {isDiscard ? (
          <div className="flex">
            <img className="mt-50" src="/imgs/discard.png" />
            <div className="mt-50"></div>
            <Button
              type="button"
              variant="secondary"
              className="btn-lg pull-left"
              text="Discard"
              onClick={handleCloseModal}
            />
            <Button
              type="button"
              variant="secondary"
              className="btn-lg pull-right"
              text="No"
              onClick={(e) => setIsDiscard(false)}
            />
          </div>
        ) : (
          <Form className="form-middle container-fluid">
            <h1 className="mb-50">Add Checklist</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Document Name</Form.Label>
              <FormControl
                type="text"
                placeholder="Enter Checklist Name"
                fullWidth
                onChange={(e) => {
                  setChecklist({ ...checklist, title: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Document Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => {
                  setChecklist({ ...checklist, description: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Select
              className="form-control mb-3"
              onChange={(e) => {
                setChecklist({
                  ...checklist,
                  PropertyType: e.target.value,
                });
              }}
            >
              <option value="">-- Select --</option>
              <option
                selected={
                  String(currentType).toLowerCase() ==
                  "Flat_Apartment".toLowerCase()
                }
                value="Flat_Apartment"
              >
                Flat Apartment
              </option>
              <option
                selected={
                  String(currentType).toLowerCase() ==
                  "Villa_Independent_house_Row_house".toLowerCase()
                }
                value="Villa_Independent_house_Row_house"
              >
                Villa / Independent House / Raw House
              </option>
              <option
                selected={
                  String(currentType).toLowerCase() ==
                  "Pent_house".toLowerCase()
                }
                value="Pent_house"
              >
                Pent House
              </option>
              <option
                selected={
                  String(currentType).toLowerCase() ==
                  "Empty_land".toLowerCase()
                }
                value="Empty_land"
              >
                Empty Land
              </option>
            </Form.Select>
            <Form.Group className="mb-3" controlId="stages">
              {stages?.map((item) => {
                return (
                  <Form.Check
                    label={item.stage_name}
                    name={item.stage_name}
                    type={"checkbox"}
                    value={true}
                    onChange={(e) => {
                      setChecklist({ ...checklist, stages: item._id });
                    }}
                  />
                );
              })}
            </Form.Group>
            <br />
            <div className="mt-50"></div>
            <Button
              type="button"
              variant="secondary"
              className="btn-lg pull-left"
              text="Add"
              onClick={onDoSubmit}
            />
            <Button
              type="button"
              variant="secondary"
              className="btn-lg pull-right"
              text="Cancel"
              onClick={(e) => onDoClose(e)}
            />
          </Form>
        )}
      </div>
    </Modal>
  );
}
