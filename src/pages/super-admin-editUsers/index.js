import React ,{useState} from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {
  TextField,
  Button
} from "@mui/material";

import "./style.scss";

import { useDispatch,useSelector } from "react-redux";
import { updateUserData , getData } from "../manage-users/service";

const EditUsers = ({ editModal, setEditModal, id, first_name, last_name,email_id,phone }) => {
  const dispatch = useDispatch();
  
  const [dataValue, setDataValue] = useState({
    id: id,
    first_name:first_name,
    last_name:last_name,
    phone:phone,
    email_id:email_id,
  });


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
  });
  

  const onSubmit = async (data, e) => {
    e.preventDefault();
    dispatch(updateUserData(dataValue));
  };
  

  return (
    <Modal
    size="md"
    show={editModal}
    onHide={() => setEditModal(false)}
    aria-labelledby="example-modal-sizes-title-lg"
    className="editProperty"
    centered
  >
    <div className="edit-form">
      <div className="add-edit-form">
        <div
          className="close-btn"
          onClick={() => {
            setEditModal(false);
          }}
        >
          X
        </div>
        <div className="text">
          <h1>Edit User</h1>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div class="add-admin-rows">
          <TextField
              id="First Name"
              label="First Name"
              variant="outlined"
              type="text"
              value={dataValue.first_name}
              {...register("first_name")}
              onChange={(e) =>
                setDataValue({ ...dataValue, first_name: e.target.value })
              }
            />
            {errors.firstname ? (
              <div className="form-errors">{errors.firstname.message}</div>
            ) : null}
             <TextField
              id="ast name"
              label="Last name"
              variant="outlined"
              type="text"
              value={dataValue.last_name}
              {...register("last_name")}
              onChange={(e) =>
                setDataValue({ ...dataValue, last_name: e.target.value })
              }
            />
            {errors.lastname ? (
              <div className="form-errors">{errors.lastname.message}</div>
            ) : null}
          </div>
          <TextField
            id="Phone no"
            label="Phone no"
            variant="outlined"
            type="number"
            value={dataValue.phone}
            {...register("phone")}
            onChange={(e) =>
              setDataValue({ ...dataValue, phone: e.target.value })
            }
          />
          {errors.phone ? (
            <div className="form-errors">{errors.phone.message}</div>
          ) : null}
           <TextField
            id="email_id"
            label="Email-ID"
            variant="outlined"
            type="text"
            disabled
            value={dataValue.email_id}
            {...register("email_id")}
            onChange={(e) =>
              setDataValue({ ...dataValue, email_id: e.target.value })
            }
          />
          {errors.email_id ? (
            <div className="form-errors">{errors.email_id.message}</div>
          ) : null}
          
          <div class="edit-upload">
            <input
              type="file"
              name="file"
              accept="image/*"
            />
            <p>Upload Photo ↑</p>
          </div>
          <div className="add-edit-btn">
            <Button type="submit" className="add-admin-btn" variant="contained">
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div>
    </Modal>
  );
};
export default EditUsers;