import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "../../layout/Button";
import "./style.scss";

import { TextField } from "@mui/material";
import Modal from "react-bootstrap/Modal";

const EditAdmin = ({
  isOpen,
  setIsOpen,
  onClose,
  onSubmit,
  item,
  ...props
}) => {
  const fileRef = useRef();
  const [editAdmin, setEditAdmin] = useState({ ...item });
  const [isDiscard, setIsDiscard] = useState(false);

  const onDoSubmit = (e) => {
    e.preventDefault();
    let obj = { ...item, ...editAdmin };
    obj.is_admin = true;
    obj.middle_name = " ";
    console.log(obj);
    onSubmit(obj);
  };

  const onDoClose = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Modal
      size="xl"
      show={isOpen}
      onHide={() => setIsOpen(false)}
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
              onSubmit={() => onClose()}
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
            <h1 className="mb-50">Edit Admin</h1>
            <div class="row">
              <div class="col-1"></div>
              <div class="col-4">
                {editAdmin.file ? (
                  <img
                    src={URL.createObjectURL(editAdmin.file)}
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
                    setEditAdmin({ ...editAdmin, file: e.target.files[0] });
                  }}
                />
              </div>
              <div class="col-5">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <TextField
                    type="text"
                    defaultValue={item.first_name}
                    variant="outlined"
                    label="Enter First Name"
                    fullWidth
                    onChange={(e) => {
                      setEditAdmin({
                        ...editAdmin,
                        first_name: e.target.value,
                      });
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <TextField
                    type="text"
                    defaultValue={item.last_name}
                    label="Enter Last Name"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => {
                      setEditAdmin({ ...editAdmin, last_name: e.target.value });
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <TextField
                    type="text"
                    defaultValue={item.email_id}
                    label="Enter Email ID"
                    fullWidth
                    onChange={(e) => {
                      setEditAdmin({ ...editAdmin, email_id: e.target.value });
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <TextField
                    type="text"
                    defaultValue={item.phone}
                    label="Enter Phone Number"
                    fullWidth
                    onChange={(e) => {
                      setEditAdmin({ ...editAdmin, phone: e.target.value });
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <TextField
                    type="text"
                    defaultValue={item.password}
                    label="Enter Admin password"
                    fullWidth
                    onChange={(e) => {
                      setEditAdmin({ ...editAdmin, password: e.target.value });
                    }}
                  />
                </Form.Group>

                <br />
                <div className="mt-50"></div>
                <Button
                  type="button"
                  variant="secondary"
                  className="btn-lg pull-left"
                  text="Update"
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
export default EditAdmin;
