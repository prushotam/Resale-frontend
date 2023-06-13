import React, { useState, useEffect } from "react";
import Main from "../../layout/Main";
import Axios from "axios";
import { useToasts } from "react-toast-notifications";
import "./style.scss";
import { useSelector } from "react-redux";
import { TextField, InputAdornment, Button } from "@mui/material";
import { Space, Spin, Typography, Divider } from "antd";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { endpoint } from "../../utils/endpoints";

const validationSchema = Yup.object().shape({
  platform_fee_config: Yup.array().of(
    Yup.object().shape({
      platform_fees: Yup.number().required("Platform Fee is required"),
      token_amount: Yup.number().required("Token Amount is required"),
      registration_amount: Yup.number().required(
        "Registration Amount is required"
      ),
    })
  ),
});

const SuperAdminSettings = (props) => {
  const env = process.env.REACT_APP_ENV || 'development'

  const { Title } = Typography;
  const { addToast } = useToasts();
  const loggedInUser = useSelector((state) => state.loggedInUser);

  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const accessToken =
    useSelector((state) => state.loggedInUser?.data?.data?.accessToken) || "";

    useEffect(() => {
    if (!accessToken) {
      history.push("/super-admin-login");
    }
  }, []);

  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    id: `${loggedInUser.data?.data?.superAdminByEmail._id}`,
    platform_fee_config: [
      {
        platform_fees: "",
        platform_fee_description: "",
        token_amount: "",
        token_amount_description: "",
        registration_amount: "",
        registration_amount_description: "",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`${endpoint[env].baseUrl}superAdmin/${loggedInUser.data?.data?.superAdminByEmail._id}`);
        const data = response.data;
        if (data?.superAdminData.platform_fee_config && data.superAdminData.platform_fee_config.length > 0) {
          const platformFeeConfigData = data.superAdminData.platform_fee_config[0];
          setFormData(prevFormData => ({
            ...prevFormData,
            platform_fee_config: [
              {
                platform_fees: platformFeeConfigData.platform_fees || '',
                platform_fee_description: platformFeeConfigData.platform_fee_description || '',
                token_amount: platformFeeConfigData.token_amount || '',
                token_amount_description: platformFeeConfigData.token_amount_description || '',
                registration_amount: platformFeeConfigData.registration_amount || '',
                registration_amount_description: platformFeeConfigData.registration_amount_description || '',
              },
            ],
          }));
        }
      } catch (error) {
        addToast("Error fetching Data", { appearance: "error", autoDismiss: true });
      }
    };

    fetchData();
  }, []);


  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({
      ...formData,
      platform_fee_config: [
        {
          ...formData.platform_fee_config[0],
          [name]: value,
        },
      ],
    });
  };

  const onSave = async (event) => {
    event.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setLoading(true);
      await Axios.patch(`${endpoint[env].baseUrl}superAdmin/`, formData);
      addToast("Data added successfully", {
        appearance: "success",
        autoDismiss: true,
      });
      setFormData({
        id: `${loggedInUser.data?.data?.superAdminByEmail._id}`,
        platform_fee_config: [
          {
            platform_fees: "",
            platform_fee_description: "",
            token_amount: "",
            token_amount_description: "",
            registration_amount: "",
            registration_amount_description: "",
          },
        ],
      });
      setValidationErrors({});
    } catch (error) {
      const validationErrors = {};
    error.inner.forEach((error) => {
      let errorMessage = error.message;
      const maxLength = 50;
      if (errorMessage.length > maxLength) {
        errorMessage = `${errorMessage.substring(0, maxLength)}...`;
      }
      validationErrors[error.path] = errorMessage;
    });
    setValidationErrors(validationErrors);
      addToast("Data not updated", { appearance: "error", autoDismiss: true });
    }
    setLoading(false);
  };

  return (
    <Main
      showNav={!props?.showNav}
      showFooter={!props?.showFooter}
      showLogo={!props?.showLogo}
      showAdminFooter={!props?.showAdminFooter}
      showAdminNavbar={!props?.showAdminNavbar}
    >
      <div className="container">
        <div className="fee-container">
          <div className="inner-container">
            <div className="d-flex">
              <Divider plain>
                <Title level={3}>Property Fee Settings</Title>
              </Divider>
            </div>
            <form onSubmit={onSave}>
              <div className="mt-4 d-flex justify-content-between">
              
                <TextField
                className="textfield-gap"
                fullWidth= {true}
                  required
                  id="outlined-basic"
                  label="Platform Fee"
                  variant="outlined"
                  name="platform_fees"
                  value={formData.platform_fee_config[0].platform_fees}
                  onChange={handleInputChange}
                  size="large"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">₹</InputAdornment>
                    ),
                  }}
                  type="number"
                  error={Boolean(validationErrors["platform_fee_config[0].platform_fees"])}
                  helperText={validationErrors["platform_fee_config[0].platform_fees"]}
                />
                <TextField
                className="textfield-gap"
                fullWidth= {true}
                  required
                  id="outlined-multiline-flexible"
                  label="Description"
                  multiline
                  maxRows={4}
                  name="platform_fee_description"
                  size="medium"
                  value={
                    formData.platform_fee_config[0].platform_fee_description
                  }
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-4 d-flex justify-content-evenly">
                <TextField
                className="textfield-gap"
                fullWidth= {true}
                  required
                  id="outlined-basic"
                  label="Token Amount"
                  variant="outlined"
                  name="token_amount"
                  value={formData.platform_fee_config[0].token_amount}
                  onChange={handleInputChange}
                  size="large"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                  type="number"
                  error={Boolean(validationErrors["platform_fee_config[0].token_amount"])}
                  helperText={validationErrors["platform_fee_config[0].token_amount"]}
                />
                <TextField
                className="textfield-gap"
                fullWidth= {true}
                  required
                  id="outlined-multiline-flexible"
                  label="Description"
                  multiline
                  maxRows={4}
                  name="token_amount_description"
                  value={
                    formData.platform_fee_config[0].token_amount_description
                  }
                  onChange={handleInputChange}
                  size="medium"
                />
              </div>
              <div className="mt-4 d-flex justify-content-evenly">
                <TextField
                className="textfield-gap"
                fullWidth= {true}
                  required
                  id="outlined-basic"
                  label="Registration Advance"
                  variant="outlined"
                  name="registration_amount"
                  value={formData.platform_fee_config[0].registration_amount}
                  onChange={handleInputChange}
                  size="large"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                  type="number"
                  error={Boolean(validationErrors["platform_fee_config[0].registration_amount"])}
                  helperText={validationErrors["platform_fee_config[0].registration_amount"]}
                />
                <TextField
                className="textfield-gap"
                fullWidth= {true}
                  required
                  id="outlined-multiline-flexible"
                  label="Description"
                  multiline
                  maxRows={4}
                  name="registration_amount_description"
                  value={
                    formData.platform_fee_config[0]
                      .registration_amount_description
                  }
                  onChange={handleInputChange}
                  size="medium"
                />
              </div>
              <div className="mt-4 d-flex justify-content-evenly">
                <TextField
                className="textfield-gap"
                fullWidth= {true}
                  required
                  id="outlined-basic"
                  label="Stamp Duty"
                  variant="outlined"
                  name="stamp_duty"
                  value={formData.platform_fee_config[0].registration_amount}
                  onChange={handleInputChange}
                  size="large"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                  type="number"
                  error={Boolean(validationErrors["platform_fee_config[0].registration_amount"])}
                  helperText={validationErrors["platform_fee_config[0].registration_amount"]}
                />
                <TextField
                className="textfield-gap"
                fullWidth= {true}
                  required
                  id="outlined-multiline-flexible"
                  label="Description"
                  multiline
                  maxRows={4}
                  name="stamp_duty_description"
                  value={
                    formData.platform_fee_config[0]
                      .registration_amount_description
                  }
                  onChange={handleInputChange}
                  size="medium"
                />
              </div>
              <div className="mt-4 d-flex justify-content-evenly">
                <TextField
                className="textfield-gap"
                fullWidth= {true}
                  required
                  id="outlined-basic"
                  label="Back out Penalty at MoU"
                  variant="outlined"
                  name="back_out_penalty_at_mou"
                  value={formData.platform_fee_config[0].registration_amount}
                  onChange={handleInputChange}
                  size="large"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                  type="number"
                  error={Boolean(validationErrors["platform_fee_config[0].registration_amount"])}
                  helperText={validationErrors["platform_fee_config[0].registration_amount"]}
                />
                <TextField
                className="textfield-gap"
                fullWidth= {true}
                  required
                  id="outlined-multiline-flexible"
                  label="Description"
                  multiline
                  maxRows={4}
                  name="back_out_penalty_at_mou_description"
                  value={
                    formData.platform_fee_config[0]
                      .registration_amount_description
                  }
                  onChange={handleInputChange}
                  size="medium"
                />
              </div>
              <div className="mt-4 d-flex justify-content-evenly">
                <TextField
                className="textfield-gap"
                fullWidth= {true}
                  required
                  id="outlined-basic"
                  label="Back out Penalty at Agreement"
                  variant="outlined"
                  name="back_out_penalty_at_agreement"
                  value={formData.platform_fee_config[0].registration_amount}
                  onChange={handleInputChange}
                  size="large"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                  type="number"
                  error={Boolean(validationErrors["platform_fee_config[0].registration_amount"])}
                  helperText={validationErrors["platform_fee_config[0].registration_amount"]}
                />
                <TextField
                className="textfield-gap"
                fullWidth= {true}
                  required
                  id="outlined-multiline-flexible"
                  label="Description"
                  multiline
                  maxRows={4}
                  name="back_out_penalty_at_agreement_description"
                  value={
                    formData.platform_fee_config[0]
                      .registration_amount_description
                  }
                  onChange={handleInputChange}
                  size="medium"
                />
              </div>
              <div className="mt-4 d-flex justify-content-evenly">
                <TextField
                className="textfield-gap"
                fullWidth= {true}
                  required
                  id="outlined-basic"
                  label="Back out penalty at Sale deed"
                  variant="outlined"
                  name="back_out_penalty_at_sale_deed"
                  value={formData.platform_fee_config[0].registration_amount}
                  onChange={handleInputChange}
                  size="large"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                  type="number"
                  error={Boolean(validationErrors["platform_fee_config[0].registration_amount"])}
                  helperText={validationErrors["platform_fee_config[0].registration_amount"]}
                />
                <TextField
                className="textfield-gap"
                fullWidth= {true}
                  required
                  id="outlined-multiline-flexible"
                  label="Description"
                  multiline
                  maxRows={4}
                  name="back_out_penalty_at_sale_deed_description"
                  value={
                    formData.platform_fee_config[0]
                      .registration_amount_description
                  }
                  onChange={handleInputChange}
                  size="medium"
                />
              </div>
            </form>

            <div className="mt-4 d-flex justify-content-center">
              <Button
                variant="contained"
                onClick={onSave}
                sx={{ bgcolor: "var(--darkBlue)", textTransform: "capitalize" }}
              >
                Save
              </Button>
              {loading ? (
                <Space size="middle">
                  <Spin size="large" />
                </Space>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default SuperAdminSettings;
