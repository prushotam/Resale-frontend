import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addUser } from "../super-admin-addUsers/service";
import { getAllRoles } from "../../redux/extra-services/roles.services";
import { useDispatch, useSelector } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CssBaseline,
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Box,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import "../login/style.scss";

import LandingFooter from "../general-landing-page/LandingFooter";
import GeneralNav from "../general-landing-page/GeneralNav";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [value, setValue] = useState("1");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const getRoles = useSelector((state) => state.roles.roles);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [showPassword, setShowPassword] = useState(false);
  const [selectOption, setSelectOption] = useState("");
  const dispatch = useDispatch();
  const [dataValue, setDataValue] = useState({
    is_admin: true,
    gender: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginSchema = yup.object({
    selectRole: yup.string().required("Role is required"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("invalid email address")
      .required("Enter your email address"),
    phone: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable()
      .required("Enter your Phone No."),
    password: yup.string().required("Enter your password").min(6),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = (_data, e) => {
    e.target.reset();
    const selectedRole = getRoles.filter(
      (role) => role.role_name === dataValue.selectRole
    )[0];
    if (selectedRole) {
      const updatedPayload = {
        ...dataValue,
        primary_role: selectedRole._id,
      };
      dispatch(addUser(updatedPayload)).then(() => {
        setFirstName(updatedPayload.first_name);
        setShowSuccessModal(true);
      });
    }
  };
  useEffect(() => {
    dispatch(getAllRoles());
  }, []);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <GeneralNav />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 11,
            marginBottom: 14,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h2" variant="h5" sx={{ mt: 4 }}>
            Sign up
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="selectRole"
                    name="selectRole"
                    label="Select Role"
                    autoFocus
                    {...register("selectRole")}
                    error={Boolean(errors.selectRole)}
                    onChange={(e) => {
                      const roleValue = e.target.value;
                      setDataValue({ ...dataValue, selectRole: roleValue });
                    }}
                  >
                    {/*needed the commented code*/}
                    <MenuItem value={"BUYER"}>Buyer</MenuItem>
                    <MenuItem value={"SELLER"}>Seller</MenuItem>
                    <MenuItem value={"BUYER_LAWYER"}>Buyer Lawyer</MenuItem>
                    {/* <MenuItem value={"SELLER_LAWYER"}>Seller Lawyer</MenuItem> */}
                    <MenuItem value={"CA"}>CA</MenuItem>
                    <MenuItem value={"BUYER_BANK_AGENT"}>
                      Buyer Bank Agent
                    </MenuItem>
                    {/* <MenuItem value={"SELLER_BANK_AGENT"}>Seller Bank Agent</MenuItem> */}
                    <MenuItem value={"BUYER_AGENT"}>Buyer Agent</MenuItem>
                    <MenuItem value={"SELLER_AGENT"}>Seller Agent</MenuItem>
                    <MenuItem value={"BUYER_POA"}>Buyer POA</MenuItem>
                    <MenuItem value={"SELLER_POA"}>Seller POA</MenuItem>
                  </Select>
                  <div className="login-errors">
                    {errors.selectRole ? (
                      <>{errors.selectRole.message}</>
                    ) : null}
                  </div>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  {...register("firstName")}
                  error={Boolean(errors.firstName)}
                  onChange={(e) =>
                    setDataValue({ ...dataValue, first_name: e.target.value })
                  }
                />
                <div className="login-errors">
                  {errors.firstName ? <>{errors.firstName.message}</> : null}
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  {...register("lastName")}
                  error={Boolean(errors.lastName)}
                  onChange={(e) =>
                    setDataValue({ ...dataValue, last_name: e.target.value })
                  }
                />
                <div className="login-errors">
                  {errors.lastName ? <>{errors.lastName.message}</> : null}
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email")}
                  error={Boolean(errors.email)}
                  onChange={(e) =>
                    setDataValue({ ...dataValue, email_id: e.target.value })
                  }
                />
                <div className="login-errors">
                  {errors.email ? <>{errors.email.message}</> : null}
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone No."
                  type="phone"
                  id="phone"
                  autoComplete="phone"
                  {...register("phone")}
                  error={Boolean(errors.phone)}
                  onChange={(e) =>
                    setDataValue({ ...dataValue, phone: e.target.value })
                  }
                />
                <div className="login-errors">
                  {errors.phone ? <>{errors.phone.message}</> : null}
                </div>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    id="password"
                    label="Password"
                    variant="outlined"
                    name="password"
                    {...register("password")}
                    error={Boolean(errors.password)}
                    onChange={(e) =>
                      setDataValue({ ...dataValue, password: e.target.value })
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <div className="login-errors">
                    {errors.password ? <>{errors.password.message}</> : null}
                  </div>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background: "var(--darkBlue)" }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
      <LandingFooter />
      <Dialog
        open={showSuccessModal}
        onClose={handleCloseSuccessModal}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent>
          <Typography sx={{ color: "var(--darkGreen)" }}>
            {firstName} registered successfully!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseSuccessModal}
            color="primary"
            component={Link}
            to="user-login"
          >
            Go to Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
