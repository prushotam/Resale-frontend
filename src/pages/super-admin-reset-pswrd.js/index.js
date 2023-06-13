import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "./service";

import "../login/style.scss";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
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
} from "@mui/material";

import LandingFooter from "../general-landing-page/LandingFooter";
import GeneralNav from '../general-landing-page/GeneralNav'

const ResetPassword = () => {
  const dispatch = useDispatch();
  const superAdminReset = useSelector((state) => state.superAdminReset);
  const history = useHistory();
  const superAdminLogin = useSelector((state) => state.superAdminLogin);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (superAdminReset?.data) {
      history.push("/super-admin-login");
    }
  }, [superAdminReset]);

  const confirmPasswordSchema = yup.object({
    otp: yup.string().required("Enter your OTP"),
    password: yup.string().required("Enter your password").required(),
    email: yup
      .string()
      .email("invalid email address")
      .required("Enter your email address"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(confirmPasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = (_data, e) => {
    e.target.reset();
    const data = {
      email: _data.email,
      resetPasswordToken: _data.otp,
      newPassword: _data.password,
    };
    dispatch(postData(data));
    history.push("/login");
  };

  return (
    <>
    <GeneralNav />
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 11,
        marginBottom:14,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h2" variant="h5" sx={{mt:4}}>
        Reset Password
      </Typography>
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
    </Box>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
          <Grid item xs={12}>
          <TextField
                id="OTP"
                label="OTP"
                variant="outlined"
                type="text"
                name="otp"
                required
                fullWidth
                {...register("otp")}
                className="input-admin"
                error={Boolean(errors.otp)}
              />
            <div className="login-errors">
             {errors.otp ? (<>{errors.otp.message}</>
          ) : null}
          </div>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                New Password
              </InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                id="password"
                label="Password"
                variant="outlined"
                name="password"
                {...register("password")}
                error={Boolean(errors.password)}
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
             {errors.password ? (<>{errors.password.message}</>
          ) : null}
          </div>
            </FormControl>
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
            />
            <div className="login-errors">
             {errors.email ? (<>{errors.email.message}</>
          ) : null}
          </div>
          </Grid>
          </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, bgcolor:'var(--darkBlue)' }}
        >
          Reset
        </Button>
      </Box>
    </Box>
  </Container>
  <LandingFooter />
    </>
  );
};

export default ResetPassword;
