import React, { useEffect, useState } from "react";
import Main from "../../layout/Main";
import Axios from "axios";
import Form from "react-bootstrap/Form";
import { TextField, FormLabel, Button, Select, MenuItem } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Unstable_Grid2";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import UpdatePassword from "./updatePassword";
import DummyProfileImage from "../../assets/Icons/person-dummy.jpg";
import "./style.scss";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { endpoint } from "../../utils/endpoints";

import { postImage, getImage } from "../manage-profile/service";
import { updateUserData } from "./service";
import { useToasts } from "react-toast-notifications";
const env = process.env.REACT_APP_ENV;

const ProfileSettings = (props) => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [openModal, setOpenModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const [imageLoading, setImageLoading] = useState(false);
  const role = sessionStorage.getItem("role");
  const history = useHistory();
  const [dataValue, setDataValue] = useState({
    id: `${loggedInUser.data?.data?.userByEmail?._id}`,
  });
  const accessToken =
    useSelector((state) => state.loggedInUser?.data?.data?.accessToken) || "";
  const userId = loggedInUser.data?.data?.userByEmail?._id;

  useEffect(() => {
    if (!accessToken) {
      history.push("/user-login");
    } else {
      setImageLoading(true);
      getProfileImage(userId);
    }
  }, []);

  const handleOpenModal = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(),
    mode: "onBlur",
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
  };

  const handleSave = async () => {
    dispatch(updateUserData(dataValue));
    try {
      addToast("Form submitted successfully", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      addToast("Form submission failed", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const updateProfileImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("images", file);

      const response = await Axios({
        method: "post",
        url: `${endpoint[env].baseUrl}profileImage/upload`,
        headers: {
          "content-type": "multipart/form-data",
        },
        data: formData,
      });
      if (response.status == 201 && response.data.success) {
        await getProfileImage(userId);
        addToast(response.data.message, {
          appearance: "success",
          autoDismiss: true,
        });
      }
    } catch (error) {
      addToast(`Unable to upload profile image`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const getProfileImage = async (userId) => {
    try {
      const response = await Axios({
        method: "get",
        url: `${endpoint[env].baseUrl}profileImage/${userId}`,
      });
      if (response.status === 200 && response.data.success) {
        setProfileImage(response.data.url);
      }
      setImageLoading(false);
    } catch (error) {
      addToast(`Unable to get profile image`, { appearance: "error", autoDismiss: true });
      setImageLoading(false)
    }
  };

  const handleFileChange = async (event) => {
    setImageLoading(true);
    const selectedFile = event.target.files[0];
    if (selectedFile) await updateProfileImage(selectedFile);
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
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormLabel className="form-labels">User ID</FormLabel>
              <TextField
                disabled
                id="ID no"
                label="Entr User ID"
                variant="outlined"
                type="text"
                className="profile-inputs"
                size="small"
                name="userId"
                defaultValue={
                  role === "SELLER"
                    ? loggedInUser.data?.data?.userByEmail?._id
                    : loggedInUser.data?.data?.userByEmail._id
                }
              />

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
                    name="firstname"
                    {...register("first_name")}
                    defaultValue={
                      dataValue.first_name ||
                      (role === "SELLER"
                        ? loggedInUser.data.data.userByEmail.first_name
                        : loggedInUser.data?.data?.userByEmail.first_name)
                    }
                    onChange={(e) =>
                      setDataValue({ ...dataValue, first_name: e.target.value })
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
                    name="lastname"
                    {...register("last_name")}
                    defaultValue={
                      dataValue.last_name ||
                      (role === "SELLER"
                        ? loggedInUser.data.data.userByEmail.last_name
                        : loggedInUser.data?.data?.userByEmail.last_name)
                    }
                    onChange={(e) =>
                      setDataValue({ ...dataValue, last_name: e.target.value })
                    }
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid xs={6}>
                  <FormLabel className="form-label">Phone No.</FormLabel>
                  <TextField
                    id="phone"
                    label="Enter Phone No."
                    variant="outlined"
                    type="text"
                    className="profile-input"
                    size="small"
                    name="phone"
                    {...register("phone")}
                    defaultValue={
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
                <Grid xs={6}>
                  <FormLabel className="form-label">Email</FormLabel>
                  <TextField
                    disabled
                    id="email_id"
                    label="Enter Email"
                    variant="outlined"
                    type="text"
                    className="profile-input"
                    size="small"
                    name="email"
                    {...register("email_id")}
                    defaultValue={
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
              </Grid>

              <FormLabel className="form-label">Address</FormLabel>
              <TextField
                id="address"
                label="Enter Address"
                variant="outlined"
                type="text"
                className="profileInputs"
                size="small"
                name="address"
                {...register("address_line1")}
                value={
                  dataValue.current_address?.[0]?.address_line1 ||
                  (role === "SELLER"
                    ? loggedInUser.data.data.userByEmail.current_address?.[0]
                        ?.address_line1
                    : loggedInUser.data?.data?.userByEmail.current_address?.[0]
                        ?.address_line1)
                }
                onChange={(e) => {
                  const updatedAddressName = e.target.value;
                  setDataValue((prevState) => ({
                    ...prevState,
                    current_address: [
                      {
                        ...prevState.bank_account?.[0],
                        address_line1: updatedAddressName,
                      },
                    ],
                  }));
                }}
              />

              <Grid container spacing={2}>
                <Grid xs={6}>
                  <FormLabel className="form-label">Father's Name</FormLabel>
                  <TextField
                    id="father_name"
                    label="Enter Father's Name"
                    variant="outlined"
                    type="text"
                    className="profile-input"
                    size="small"
                    name="fathername"
                    {...register("father_name")}
                    defaultValue={
                      dataValue.father_name ||
                      (role === "SELLER"
                        ? loggedInUser.data.data.userByEmail.father_name
                        : loggedInUser.data?.data?.userByEmail.father_name)
                    }
                    onChange={(e) =>
                      setDataValue({
                        ...dataValue,
                        father_name: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid xs={6}>
                  <FormLabel className="form-label">Spouse Name</FormLabel>
                  <TextField
                    id="spouse_name"
                    label="Enter Spouse Name"
                    variant="outlined"
                    type="text"
                    className="profile-input"
                    size="small"
                    name="spousename"
                    {...register("spouse_name")}
                    defaultValue={
                      dataValue.spouse_name ||
                      (role === "SELLER"
                        ? loggedInUser.data.data.userByEmail.spouse_name
                        : loggedInUser.data?.data?.userByEmail.spouse_name)
                    }
                    onChange={(e) =>
                      setDataValue({
                        ...dataValue,
                        spouse_name: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid xs={6}>
                  <FormLabel className="form-label">DOB</FormLabel>
                  <TextField
                    id="dob"
                    variant="outlined"
                    type="date"
                    className="profile-input"
                    size="small"
                    name="dob"
                    {...register("dob")}
                    value={dataValue.dob}
                    defaultValue={
                      dataValue.dob ||
                      (role === "SELLER"
                        ? loggedInUser.data.data.userByEmail.dob
                        : loggedInUser.data?.data?.userByEmail.dob)
                    }
                    onChange={(e) =>
                      setDataValue({
                        ...dataValue,
                        dob: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid xs={6}>
                  <FormLabel className="form-label">Gender</FormLabel>
                  <Select
                    id="gender"
                    variant="outlined"
                    type="date"
                    size="small"
                    name="gender"
                    value={dataValue.gender}
                    defaultValue={
                      dataValue.gender ||
                      (role === "SELLER"
                        ? loggedInUser.data.data.userByEmail.gender
                        : loggedInUser.data?.data?.userByEmail.gender)
                    }
                    onChange={(e) =>
                      setDataValue({ ...dataValue, gender: e.target.value })
                    }
                    className="profile-input"
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </Grid>
              </Grid>

              <FormLabel className="formLabels">Bank Details</FormLabel>

              <div className="bank-details">
                <Grid container spacing={1.5}>
                  <Grid xs={4}>
                    <FormLabel className="form-label">Account Name</FormLabel>
                    <TextField
                      id="account_name"
                      label="Enter Account Name"
                      variant="outlined"
                      type="text"
                      className="profile-input"
                      size="small"
                      name="accountname"
                      {...register("account_name")}
                      fullWidth
                      value={
                        dataValue.bank_account?.[0]?.account_name ||
                        (role === "SELLER"
                          ? loggedInUser.data.data.userByEmail.bank_account?.[0]
                              ?.account_name
                          : loggedInUser.data?.data?.userByEmail
                              .bank_account?.[0]?.account_name)
                      }
                      onChange={(e) => {
                        const updatedAccountName = e.target.value;
                        setDataValue((prevState) => ({
                          ...prevState,
                          bank_account: [
                            {
                              ...prevState.bank_account?.[0],
                              account_name: updatedAccountName,
                              branch_name:
                                prevState.bank_account?.[0]?.branch_name ||
                                (role === "SELLER"
                                  ? loggedInUser.data.data.userByEmail
                                      .bank_account?.[0]?.branch_name
                                  : loggedInUser.data?.data?.userByEmail
                                      .bank_account?.[0]?.branch_name),
                              bank_name:
                                prevState.bank_account?.[0]?.bank_name ||
                                (role === "SELLER"
                                  ? loggedInUser.data.data.userByEmail
                                      .bank_account?.[0]?.bank_name
                                  : loggedInUser.data?.data?.userByEmail
                                      .bank_account?.[0]?.bank_name),
                              ifsc_code:
                                prevState.bank_account?.[0]?.ifsc_code ||
                                (role === "SELLER"
                                  ? loggedInUser.data.data.userByEmail
                                      .bank_account?.[0]?.ifsc_code
                                  : loggedInUser.data?.data?.userByEmail
                                      .bank_account?.[0]?.ifsc_code),
                              account_number:
                                prevState.bank_account?.[0]?.account_number ||
                                (role === "SELLER"
                                  ? loggedInUser.data.data.userByEmail
                                      .bank_account?.[0]?.account_number
                                  : loggedInUser.data?.data?.userByEmail
                                      .bank_account?.[0]?.account_number),
                            },
                          ],
                        }));
                      }}
                    />
                  </Grid>
                  <Grid xs={4}>
                    <FormLabel className="form-label">Account No.</FormLabel>
                    <TextField
                      id="account_number"
                      label="Enter Account No."
                      variant="outlined"
                      type="text"
                      className="profile-input"
                      size="small"
                      name="accountno"
                      {...register("account_number")}
                      fullWidth
                      value={
                        dataValue.bank_account?.[0]?.account_number ||
                        (role === "SELLER"
                          ? loggedInUser.data.data.userByEmail.bank_account?.[0]
                              ?.account_number
                          : loggedInUser.data?.data?.userByEmail
                              .bank_account?.[0]?.account_number)
                      }
                      onChange={(e) => {
                        const updatedAccountName = e.target.value;
                        setDataValue((prevState) => ({
                          ...prevState,
                          bank_account: [
                            {
                              ...prevState.bank_account?.[0],
                              account_number: updatedAccountName,
                              branch_name:
                                prevState.bank_account?.[0]?.branch_name ||
                                (role === "SELLER"
                                  ? loggedInUser.data.data.userByEmail
                                      .bank_account?.[0]?.branch_name
                                  : loggedInUser.data?.data?.userByEmail
                                      .bank_account?.[0]?.branch_name),
                              ifsc_code:
                                prevState.bank_account?.[0]?.ifsc_code ||
                                (role === "SELLER"
                                  ? loggedInUser.data.data.userByEmail
                                      .bank_account?.[0]?.ifsc_code
                                  : loggedInUser.data?.data?.userByEmail
                                      .bank_account?.[0]?.ifsc_code),
                              bank_name:
                                prevState.bank_account?.[0]?.bank_name ||
                                (role === "SELLER"
                                  ? loggedInUser.data.data.userByEmail
                                      .bank_account?.[0]?.bank_name
                                  : loggedInUser.data?.data?.userByEmail
                                      .bank_account?.[0]?.bank_name),
                              account_name:
                                prevState.bank_account?.[0]?.account_name ||
                                (role === "SELLER"
                                  ? loggedInUser.data.data.userByEmail
                                      .bank_account?.[0]?.account_name
                                  : loggedInUser.data?.data?.userByEmail
                                      .bank_account?.[0]?.account_name),
                            },
                          ],
                        }));
                      }}
                    />
                  </Grid>
                  <Grid xs={4}>
                    <FormLabel className="form-label">IFSC Code</FormLabel>
                    <TextField
                      id="ifsc_code"
                      label="Enter IFSC Code"
                      variant="outlined"
                      type="text"
                      className="profile-input"
                      size="small"
                      name="ifsccode"
                      {...register("ifsc_code")}
                      fullWidth
                      value={
                        dataValue.bank_account?.[0]?.ifsc_code ||
                        (role === "SELLER"
                          ? loggedInUser.data.data.userByEmail.bank_account?.[0]
                              ?.ifsc_code
                          : loggedInUser.data?.data?.userByEmail
                              .bank_account?.[0]?.ifsc_code)
                      }
                      onChange={(e) => {
                        const updatedIfscName = e.target.value;
                        setDataValue((prevState) => ({
                          ...prevState,
                          bank_account: [
                            {
                              ...prevState.bank_account?.[0],
                              ifsc_code: updatedIfscName,
                              branch_name:
                                prevState.bank_account?.[0]?.branch_name ||
                                (role === "SELLER"
                                  ? loggedInUser.data.data.userByEmail
                                      .bank_account?.[0]?.branch_name
                                  : loggedInUser.data?.data?.userByEmail
                                      .bank_account?.[0]?.branch_name),

                              bank_name:
                                prevState.bank_account?.[0]?.bank_name ||
                                (role === "SELLER"
                                  ? loggedInUser.data.data.userByEmail
                                      .bank_account?.[0]?.bank_name
                                  : loggedInUser.data?.data?.userByEmail
                                      .bank_account?.[0]?.bank_name),
                              account_name:
                                prevState.bank_account?.[0]?.account_name ||
                                (role === "SELLER"
                                  ? loggedInUser.data.data.userByEmail
                                      .bank_account?.[0]?.account_name
                                  : loggedInUser.data?.data?.userByEmail
                                      .bank_account?.[0]?.account_name),
                            },
                          ],
                        }));
                      }}
                    />
                  </Grid>
                </Grid>
              </div>

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
                    name="bankname"
                    {...register("bank_name")}
                    value={
                      dataValue.bank_account?.[0]?.bank_name ||
                      (role === "SELLER"
                        ? loggedInUser.data.data.userByEmail.bank_account?.[0]
                            ?.bank_name
                        : loggedInUser.data?.data?.userByEmail.bank_account?.[0]
                            ?.bank_name)
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

                            account_name:
                              prevState.bank_account?.[0]?.account_name ||
                              (role === "SELLER"
                                ? loggedInUser.data.data.userByEmail
                                    .bank_account?.[0]?.account_name
                                : loggedInUser.data?.data?.userByEmail
                                    .bank_account?.[0]?.account_name),

                            account_number:
                              prevState.bank_account?.[0]?.account_number ||
                              (role === "SELLER"
                                ? loggedInUser.data.data.userByEmail
                                    .bank_account?.[0]?.account_number
                                : loggedInUser.data?.data?.userByEmail
                                    .bank_account?.[0]?.account_number),

                            ifsc_code:
                              prevState.bank_account?.[0]?.ifsc_code ||
                              (role === "SELLER"
                                ? loggedInUser.data.data.userByEmail
                                    .bank_account?.[0]?.ifsc_code
                                : loggedInUser.data?.data?.userByEmail
                                    .bank_account?.[0]?.ifsc_code),
                          },
                        ],
                      }));
                    }}
                  />
                </Grid>
                <Grid xs={6}>
                  <FormLabel className="form-label">Branch</FormLabel>
                  <TextField
                    id="branch"
                    label="Enter Branch"
                    variant="outlined"
                    type="text"
                    className="profile-input"
                    size="small"
                    name="branch"
                    {...register("branch_name")}
                    value={
                      dataValue.bank_account?.[0]?.branch_name ||
                      (role === "SELLER"
                        ? loggedInUser.data.data.userByEmail.bank_account?.[0]
                            ?.branch_name
                        : loggedInUser.data?.data?.userByEmail.bank_account?.[0]
                            ?.branch_name)
                    }
                    onChange={(e) => {
                      const updatedBranchName = e.target.value;
                      setDataValue((prevState) => ({
                        ...prevState,
                        bank_account: [
                          {
                            ...prevState.bank_account?.[0],
                            branch_name: updatedBranchName,
                            bank_name:
                              prevState.bank_account?.[0]?.bank_name ||
                              (role === "SELLER"
                                ? loggedInUser.data.data.userByEmail
                                    .bank_account?.[0]?.bank_name
                                : loggedInUser.data?.data?.userByEmail
                                    .bank_account?.[0]?.bank_name),
                            account_name:
                              prevState.bank_account?.[0]?.account_name ||
                              (role === "SELLER"
                                ? loggedInUser.data.data.userByEmail
                                    .bank_account?.[0]?.account_name
                                : loggedInUser.data?.data?.userByEmail
                                    .bank_account?.[0]?.account_name),
                            account_number:
                              prevState.bank_account?.[0]?.account_number ||
                              (role === "SELLER"
                                ? loggedInUser.data.data.userByEmail
                                    .bank_account?.[0]?.account_number
                                : loggedInUser.data?.data?.userByEmail
                                    .bank_account?.[0]?.account_number),
                            ifsc_code:
                              prevState.bank_account?.[0]?.ifsc_code ||
                              (role === "SELLER"
                                ? loggedInUser.data.data.userByEmail
                                    .bank_account?.[0]?.ifsc_code
                                : loggedInUser.data?.data?.userByEmail
                                    .bank_account?.[0]?.ifsc_code),
                          },
                        ],
                      }));
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid xs={6}>
                  <FormLabel className="form-label">Adhar No.</FormLabel>
                  <TextField
                    id="adhar_no"
                    label="Enter Adhar No."
                    variant="outlined"
                    type="text"
                    className="profile-input"
                    size="small"
                    name="adhar"
                    {...register("aadhaar")}
                    defaultValue={
                      dataValue.aadhaar ||
                      (role === "SELLER"
                        ? loggedInUser.data.data.userByEmail.aadhaar
                        : loggedInUser.data?.data?.userByEmail.aadhaar)
                    }
                    onChange={(e) =>
                      setDataValue({
                        ...dataValue,
                        aadhaar: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid xs={6}>
                  <FormLabel className="form-label">PAN No.</FormLabel>
                  <TextField
                    id="pan_no"
                    label="Enter PAN No."
                    variant="outlined"
                    type="text"
                    className="profile-input"
                    size="small"
                    name="pan"
                    {...register("pan")}
                    defaultValue={
                      dataValue.pan ||
                      (role === "SELLER"
                        ? loggedInUser.data.data.userByEmail.pan
                        : loggedInUser.data?.data?.userByEmail.pan)
                    }
                    onChange={(e) =>
                      setDataValue({
                        ...dataValue,
                        pan: e.target.value,
                      })
                    }
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
                <div className="image-container">
                  {imageLoading ? (
                    <div className="loader">
                      <CircularProgress />
                    </div>
                  ) : (
                    <img
                      className="image"
                      src={profileImage ? profileImage : DummyProfileImage}
                      alt="Profile Picture"
                    />
                  )}
                </div>
                <div className="input-selection">
                  <input
                    style={{ display: "none" }}
                    id="profile-image"
                    onChange={handleFileChange}
                    type="file"
                  />
                  <label className="label" htmlFor="profile-image">
                    <CameraAltIcon />
                  </label>
                </div>
              </div>
              <Button
                variant="outlined"
                type="submit"
                className="formBtns"
                onClick={handleSave}
              >
                Save
              </Button>
            </Form>
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
export default ProfileSettings;
