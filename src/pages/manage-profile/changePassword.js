import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { TextField, Button } from "@mui/material";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useDispatch, useSelector } from "react-redux";
import { updateData, getData } from "./service";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../login/slices";


import "./style.scss";

const styles={
  background:'white'
}

const ChangePassword = ({ openModal,setOpenModal }) => {
  const history=useHistory()
  const dispatch = useDispatch();
  const superAdminUpdate = useSelector((state) => state.superAdminUpdate);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const [state, setState] = useState({
    id: `${loggedInUser.data?.data?.superAdminByEmail?._id}`,
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const passwordSchema = yup.object({
    password: yup.string().test({
      name: 'passwordMatch',
      message: 'Incorrect password',
      test: function (value) {
        const apiPassword = loggedInUser.data?.data?.superAdminByEmail?.password;
        return value === apiPassword;
      },
    }),
    newPassword: yup
      .string()
      .required("Enter new password")
      .oneOf([yup.ref("confirmPassword"), null], "Passwords must match")
      .required()
      .matches(/^(?=.*[a-z])/, "Must contain one lowercase character")
      .matches(/^(?=.*[A-Z])/, "Must contain one uppercase character")
      .matches(/^(?=.*\d)/, "Must contain one number character")
      .matches(
        /^(?=.*[!@#$%^&*])/,
        "Must contain one special character"
      )
      .min(8, "Must contain 8 characters"),
    confirmPassword: yup
      .string()
      .required("Enter confirm password")
      .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  });

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(passwordSchema),
        mode: "onBlur" 
      });
      const onSubmit = (data) => {
        const { password, newPassword } = data;
        const apiPassword = loggedInUser.data?.data?.superAdminByEmail?.password;
      
        if (password === apiPassword) {
          const updatedData = {
            id: state.id,
            password: newPassword,
          };
          dispatch(updateData(updatedData));
          setOpenModal(false);
          setTimeout(() => {
            dispatch( logoutUser());
            history.push("/super-admin-login");
          }, 500);
        } else {
          
        }
      };
      

  return (
    <Modal
    size="md"
    show={openModal}
    onHide={() => setOpenModal(false)}
    aria-labelledby="example-modal-sizes-title-lg"
    className="editProperty"
  >
    <Modal.Header closeButton className="edit-modal">
          <Modal.Title
            id="example-modal-sizes-title-lg"
            className="text-center w-100 text-light"
          >
            Change Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="edit-modal">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
              <TextField
                id="Enter Current Password"
                label="Enter Current Password"
                variant="outlined"
                type="text"
                className="form-input"
                size="small"
                name="password"
                {...register("password")}
                error={Boolean(errors.password)}
                fullWidth
              />
            </Form.Group>
            {errors.password ? (
              <div className="formErrors">{errors.password.message}</div>
            ): null }

           
            <Form.Group className="mb-3">
              <TextField
                id="Enter New Password"
                label="Enter New Password"
                variant="outlined"
                type="text"
                className="form-input"
                size="small"
                name="newPassword"
                {...register("newPassword")}
                error={Boolean(errors.newPassword)}
                fullWidth
              />
            </Form.Group>
            {errors.newPassword ? (
              <div className="formErrors">{errors.newPassword.message}</div>
            ): null }

<Form.Group className="mb-3">
              <TextField
                id="Enter Confirm Password"
                label="Enter Confirm Password"
                variant="outlined"
                type="text"
                className="form-input"
                size="small"
                name="confirmPassword"
                {...register("confirmPassword")}
                error={Boolean(errors.confirmPassword)}
                fullWidth
              />
            </Form.Group>
            {errors.confirmPassword ? (
              <div className="formErrors">{errors.confirmPassword.message}</div>
            ): null }
            <Row>
                <Col>
             <Button 
            variant="outlined" 
            type="submit"
            className="formBtn" 
            fullWidth
            sx={{styles}}
            >
              Ok
            </Button>
            </Col>
            <Col>
            <Button 
            variant="outlined" 
            type="submit"
            className="formBtn"
            fullWidth
            onClick={()=>{setOpenModal(false)}}
            >
            Cancel
            </Button>
            </Col>
            </Row>
            </Form>
        </Modal.Body>
    </Modal>

  );
};
export default ChangePassword;
