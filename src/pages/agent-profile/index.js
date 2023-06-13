import React, { useEffect, useState } from "react";
import Main from "../../layout/Main";
import Form from "react-bootstrap/Form";
import Grid from "@mui/material/Unstable_Grid2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, FormLabel } from "@mui/material";
import { FormControl } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateUserData } from "../manage-users/service";
import UpdatePassword from "../buyer-profileSettings/updatePassword";
import "./style.scss";

const AgentProfile = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const role = sessionStorage.getItem("role");
  const history = useHistory();

  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const [dataValue, setDataValue] = useState({
    id: `${loggedInUser.data?.data?.userByEmail?._id}`,
  });
  const accessToken =
    useSelector((state) => state.loggedInUser?.data?.data?.accessToken) || "";

  useEffect(() => {
    if (!accessToken) {
      history.push("/user-login");
    }
  }, []);
  const schema = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email_id: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone number is required"),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (event) => {
    event.preventDefault();
    setIsSubmit(true);
    dispatch(updateUserData(dataValue));
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  return (
    <div className="profile-container">
      <Main
        showWelcomePage={!props?.showWelcomePage}
        showChildren={!props?.showChildren}
      >
        <div className="profile-card">
          <p className="heading">Profile Settings</p>
          <div className="profile-settings-container">
            <div className="agent-form">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid xs={6}>
                    <FormLabel className="form-label">First Name</FormLabel>
                    <TextField
                      id="first_name"
                      label="Enter First Name"
                      variant="outlined"
                      type="text"
                      className="profile-input"
                      size="small"
                      {...register("first_name")}
                      value={
                        dataValue.first_name ||
                        (role === "SELLER"
                          ? loggedInUser.data.data.userByEmail.first_name
                          : loggedInUser.data?.data?.userByEmail.first_name)
                      }
                      onChange={(e) =>
                        setDataValue({
                          ...dataValue,
                          first_name: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid xs={6}>
                    <FormLabel className="form-label">Last Name</FormLabel>
                    <TextField
                      id="last_name"
                      label="Enter Last Name"
                      variant="outlined"
                      type="text"
                      className="profile-input"
                      size="small"
                      {...register("last_name")}
                      value={
                        dataValue.last_name ||
                        (role === "SELLER"
                          ? loggedInUser.data.data.userByEmail.last_name
                          : loggedInUser.data?.data?.userByEmail.last_name)
                      }
                      onChange={(e) =>
                        setDataValue({
                          ...dataValue,
                          last_name: e.target.value,
                        })
                      }
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid xs={6}>
                    <FormLabel className="form-label">Email ID</FormLabel>
                    <TextField
                      disabled
                      id="email_id"
                      label="Enter Email ID"
                      variant="outlined"
                      type="text"
                      className="profile-input"
                      size="small"
                      {...register("email_id")}
                      value={
                        dataValue.email_id ||
                        (role === "SELLER"
                          ? loggedInUser.data.data.userByEmail.email_id
                          : loggedInUser.data?.data?.userByEmail.email_id)
                      }
                      onChange={(e) =>
                        setDataValue({ ...dataValue, email_id: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid xs={6}>
                    <FormLabel className="form-label">Phone No.</FormLabel>
                    <TextField
                      id="phone"
                      label="Enter Phone No."
                      variant="outlined"
                      type="text"
                      className="profile-input"
                      size="small"
                      {...register("phone")}
                      value={
                        dataValue.phone ||
                        (role === "SELLER"
                          ? loggedInUser.data.data.userByEmail.phone
                          : loggedInUser.data?.data?.userByEmail.phone)
                      }
                      onChange={(e) =>
                        setDataValue({ ...dataValue, phone: e.target.value })
                      }
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid xs={6}>
                    <FormLabel className="form-label">Bank Name</FormLabel>
                    <TextField
                      id="bank_name"
                      label="Enter Bank Name"
                      variant="outlined"
                      type="text"
                      className="profile-input"
                      size="small"
                      {...register("bank_name")}
                      value={
                        dataValue.bank_account?.[0]?.bank_name ||
                        (role === "SELLER"
                          ? loggedInUser.data.data.userByEmail.bank_account?.[0]
                              ?.bank_name
                          : loggedInUser.data?.data?.userByEmail
                              .bank_account?.[0]?.bank_name)
                      }
                      onChange={(e) => {
                        const updatedBankName = e.target.value;
                        setDataValue((prevState) => ({
                          ...prevState,
                          bank_account: [
                            {
                              ...prevState.bank_account?.[0],
                              bank_name: updatedBankName,
                              branch_name:
                                prevState.bank_account?.[0]?.branch_name ||
                                (role === "SELLER"
                                  ? loggedInUser.data.data.userByEmail
                                      .bank_account?.[0]?.branch_name
                                  : loggedInUser.data?.data?.userByEmail
                                      .bank_account?.[0]?.branch_name),
                            },
                          ],
                        }));
                      }}
                    />
                  </Grid>
                  <Grid xs={6}>
                    <FormLabel className="form-label">Branch Name</FormLabel>
                    <TextField
                      id="branch_name"
                      label="Enter Branch Name"
                      variant="outlined"
                      type="text"
                      className="profile-input"
                      size="small"
                      {...register("branch_name")}
                      value={
                        dataValue.bank_account?.[0]?.branch_name ||
                        (role === "SELLER"
                          ? loggedInUser.data.data.userByEmail.bank_account?.[0]
                              ?.branch_name
                          : loggedInUser.data?.data?.userByEmail
                              .bank_account?.[0]?.branch_name)
                      }
                      onChange={(e) => {
                        const updatedBranchName = e.target.value;
                        setDataValue((prevState) => ({
                          ...prevState,
                          bank_account: [
                            {
                              ...prevState.bank_account?.[0],
                              bank_name:
                                prevState.bank_account?.[0]?.bank_name ||
                                (role === "SELLER"
                                  ? loggedInUser.data.data.userByEmail
                                      .bank_account?.[0]?.bank_name
                                  : loggedInUser.data?.data?.userByEmail
                                      .bank_account?.[0]?.bank_name),
                              branch_name: updatedBranchName,
                            },
                          ],
                        }));
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="outlined"
                  type="submit"
                  className="form-btns"
                  onClick={handleOpenModal}
                >
                  Change Password
                </Button>
                {openModal && (
                  <UpdatePassword
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                  />
                )}
                <div className="profile-upload">
                  <FormControl type="file" />
                  <p>Upload Photo ↑</p>
                </div>

                <Button
                  variant="contained"
                  type="submit"
                  className="formBtns"
                  onClick={(e) => onSubmit(e)}
                >
                  Save
                </Button>
              </Form>
            </div>
          </div>
        </div>
        <div className="desktop-footer">
          <footer>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </footer>
          <p>Copyright © 2020. Agarwal Estates. All rights reserved.</p>
        </div>
      </Main>
    </div>
  );
};
export default AgentProfile;
