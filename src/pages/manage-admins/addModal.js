import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "../../layout/Button";
import "./style.scss";

import { TextField } from "@mui/material";
import Modal from "react-bootstrap/Modal";

const AddAdminModal = ({ isOpen, onClose, onSubmit, ...props }) => {
  const fileRef = useRef();
  const [addAdmin, setAddAdmin] = useState({});
  const [isDiscard, setIsDiscard] = useState(false);

  const onDoSubmit = (e) => {
    e.preventDefault();
    addAdmin.is_admin = true;
    addAdmin.middle_name = " ";
    onSubmit(addAdmin);
  };
  
  const onDoClose = (e) => {
    e.preventDefault();
    if( Object.keys(addAdmin).length > 0){
      setIsDiscard(true)
    }else{
      onClose()
    }
  };

  return (
    <Modal
      size="xl"
      show={isOpen}
      aria-labelledby="example-modal-sizes-title-lg"
      className="editProperty"
    >
      <div className="blueBg form-area form-area-full">
        {isDiscard ? (
          <div className="flex">
            <img className="mt-50" src="/imgs/discard.png" />
            <div className="mt-50"></div>
            <Button
              type="button"
              variant="secondary"
              className="btn-lg pull-left"
              text="Discard"
              onClick={(e) => onClose()}
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
          <Form className="container-fluid">
            <h1 className="mb-50">Add Admin</h1>
            <div class="row">
              <div class="col-1"></div>
              <div class="col-4">
                {addAdmin.file ? (
                  <img
                    src={URL.createObjectURL(addAdmin.file)}
                    onClick={() => fileRef.current.click()}
                    className="previewImage"
                  />
                ) : (
                  <div
                    className="admin-image"
                    onClick={() => fileRef.current.click()}
                  >
                    <p>Upload Image ↑</p>
                  </div>
                )}

                <input
                  ref={fileRef}
                  className="hidden"
                  type="file"
                  name="file"
                  accept="image/*"
                  onChange={(e) => {
                    const imageSrc = URL.createObjectURL(e.target.files[0]);
                    console.log(imageSrc);
                    setAddAdmin({ ...addAdmin, file: e.target.files[0] });
                  }}
                />
              </div>
              <div class="col-5">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <TextField
                    type="text"
                    label="Enter First Name"
                    fullWidth
                    onChange={(e) => {
                      setAddAdmin({ ...addAdmin, first_name: e.target.value });
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <TextField
                    type="text"
                    label="Enter Last Name"
                    fullWidth
                    onChange={(e) => {
                      setAddAdmin({ ...addAdmin, last_name: e.target.value });
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <TextField
                    type="text"
                    label="Enter Email ID"
                    fullWidth
                    onChange={(e) => {
                      setAddAdmin({ ...addAdmin, email_id: e.target.value });
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <TextField
                    type="text"
                    label="Enter Phone Number"
                    fullWidth
                    onChange={(e) => {
                      setAddAdmin({ ...addAdmin, phone: e.target.value });
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <TextField
                    type="text"
                    label="Enter Admin password"
                    fullWidth
                    onChange={(e) => {
                      setAddAdmin({ ...addAdmin, password: e.target.value });
                    }}
                  />
                </Form.Group>

                <br />
                <div className="mt-50"></div>
                <Button
                  type="button"
                  variant="secondary"
                  className="btn-lg pull-left"
                  text="Add"
                  onClick={(e) => onDoSubmit(e)}
                />
                <Button
                  type="button"
                  variant="secondary"
                  className="btn-lg pull-right"
                  text="Cancel"
                  onClick={(e) => onDoClose(e)}
                />
              </div>
            </div>
          </Form>
        )}
      </div>
    </Modal>
  );
};
export default AddAdminModal;
