import React, { useState, useEffect } from "react";
import Main from "../../layout/Main";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Axios from "axios";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CircularProgress from '@mui/material/CircularProgress';
import "./style.scss";
import {endpoint} from "../../utils/endpoints"
import { TextField, Button } from "@mui/material";
import { useToasts } from "react-toast-notifications";
import ChangePassword from "./changePassword";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {updateSuperAdminData , updateAdminData } from "../manage-users/service";
import DummyProfileImage from '../../assets/Icons/person-dummy.jpg'
const env = process.env.REACT_APP_ENV


const ManageProfile = (props) => {
  const dispatch=useDispatch();
  const { addToast } = useToasts();
  const [openModal, setOpenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageLoading , setImageLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const role = useSelector((state) => state.loggedInUser.preferredRole);

  const history = useHistory();
  const [dataValue, setDataValue] = useState({
    id:
    role === "SUPERADMIN"
      ? loggedInUser.data?.data?.superAdminByEmail?._id || ""
      : loggedInUser.data?.data?.adminByEmail?._id || "",
  });
  const accessToken = useSelector((state) => state.loggedInUser?.data?.data?.accessToken) || "";
  const superAdminId = useSelector((state) => state.loggedInUser.data?.data?.superAdminByEmail?._id) || ''
  const adminId = useSelector((state) => state.loggedInUser.data?.data?.adminByEmail?._id) || ''
  const userId =  role === "SUPERADMIN" ? superAdminId : adminId ;


  useEffect(() => {
    if (!accessToken) {
      history.push("/admin-login");
    }else{
      getProfileImage(userId)
    }
  }, []);

  const manageProfileSchema = yup.object({
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
    phone: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable()
      .required("Enter your Phone No."),
      email_id : yup
      .string()
      .email("invalid email address")
      .required("Enter your email address"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(manageProfileSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
  };



  const handleSave = async () => {
    if (role === "SUPERADMIN") {
      dispatch(updateSuperAdminData(dataValue));
    } else {
      dispatch(updateAdminData(dataValue));
    }
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

  const updateProfileImage = async (file)=>{
    try {
      const formData = new FormData();
        formData.append("userId" , userId);
        formData.append("images" , file)

        const response = await Axios({
          method: "post",
          url: `${endpoint[env].baseUrl}profileImage/upload`,
          headers: {
            "content-type": "multipart/form-data",
          },
          data: formData,
        });
        if(response.status == 201 && response.data.success){
          await getProfileImage(userId)
          addToast(response.data.message, { appearance: "success", autoDismiss: true });
        }
    } catch (error) {
      addToast(`Unable to upload profile image`, { appearance: "error", autoDismiss: true });
    }
        
  }

  const getProfileImage = async (userId) => {
    try {
      const response = await Axios({
        method: "get",
        url: `${endpoint[env].baseUrl}profileImage/${userId}`
      })
      if(response.status === 200 && response.data.success){
        setProfileImage(response.data.url);
      }
      setImageLoading(false)
    } catch (error) {
      addToast(`Unable to get profile image`, { appearance: "error", autoDismiss: true });
      setImageLoading(false)
    }

  }

  const handleFileChange = async (event) => {
    setImageLoading(true)
    const selectedFile = event.target.files[0];
    if(selectedFile) await updateProfileImage(selectedFile);
  };



  return (
    <div>
      <Main
        showNav={!props?.showNav}
        showFooter={!props?.showFooter}
        showLogo={!props?.showLogo}
        showAdminFooter={!props?.showAdminFooter}
        showAdminNavbar={!props?.showAdminNavbar}
      >
        <p className="heading">Manage Profile</p>
        <div className="manage-profile-container">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="first_name"
              label="Enter First Name"
              variant="outlined"
              type="text"
              className="form-inputs"
              size="small"
              name="first_name"
              {...register("first_name")}
              error={Boolean(errors.first_name)}
              defaultValue={dataValue.first_name || (
                role === "SUPERADMIN"
                ? loggedInUser.data?.data?.superAdminByEmail?.first_name
                : loggedInUser.data?.data?.adminByEmail?.first_name)}
              onChange={(e) => setDataValue({ ...dataValue, first_name: e.target.value })}
            />
            <TextField
              id="last_name"
              label="Enter Last Name"
              variant="outlined"
              type="text"
              className="form-inputs"
              size="small"
              name="last_name"
              {...register("last_name")}
              error={Boolean(errors.last_name)}
              defaultValue={dataValue.last_name || (
                role === "SUPERADMIN"
                ? loggedInUser.data?.data?.superAdminByEmail?.last_name
                : loggedInUser.data?.data?.adminByEmail?.last_name)}
              onChange={(e) => setDataValue({ ...dataValue, last_name: e.target.value })}
            />
            <TextField
              id="email_id"
              label="Email"
              disabled
              variant="outlined"
              type="text"
              size="small"
              name="email_id "
              {...register("email_id")}
              className="form-inputs"
              defaultValue={dataValue.email_id || (
                role === "SUPERADMIN"
                ? loggedInUser.data?.data?.superAdminByEmail?.email_id
                : loggedInUser.data?.data?.adminByEmail?.email_id)}
              onChange={(e) => setDataValue({ ...dataValue, email_id: e.target.value })}
            />
            <TextField
              id="phone"
              label="Phone No."
              variant="outlined"
              type="text"
              className="form-inputs"
              size="small"
              name="phone"
              {...register("phone")}
              error={Boolean(errors.phone)}
              defaultValue={dataValue.phone || (
                role === "SUPERADMIN"
                ? loggedInUser.data?.data?.superAdminByEmail?.phone
                : loggedInUser.data?.data?.adminByEmail?.phone)}
              onChange={(e) => setDataValue({ ...dataValue, phone: e.target.value })}
            />
            <p className="change-link">Change your password below</p>
            <Button
              variant="contained"
              type="submit"
              className="form-btn"
              onClick={() => setOpenModal(true)}
            >
              Change password
            </Button>
            {openModal && (
              <ChangePassword
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            )}
            <div className="profile-upload">
                <div className="image-container">
                  {
                    imageLoading ?
                    <div className="loader">
                        <CircularProgress />
                    </div>
                    :
                   <img className="image" src={profileImage ? profileImage : DummyProfileImage} alt="Profile Picture"/>
                  }
                </div>
                <div className="input-selection">
                  <input
                    style={{ display: "none" }}
                    id='profile-image'
                    onChange={handleFileChange}
                    type="file"
                  />
                    <label className="label" htmlFor='profile-image'>
                      <CameraAltIcon/>
                    </label>        
                </div>
            </div>
            
            <Button type="submit" variant="contained" sx={{mt:30, ml:68, background:"var(--darkBlue)"}} onClick={handleSave}>
              Save
            </Button>
          </Form>
        </div>
      </Main>
    </div>
  );
};
export default ManageProfile;
