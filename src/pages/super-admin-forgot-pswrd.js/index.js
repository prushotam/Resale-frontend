import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "./service";
import {
  CssBaseline,
  Button,
  TextField,
  Typography,
  Container,
  Box,
} from "@mui/material";

import "../login/style.scss";

import LandingFooter from "../general-landing-page/LandingFooter";
import GeneralNav from '../general-landing-page/GeneralNav'


const ForgotPassword = () => {
  const dispatch = useDispatch();
  const superAdminForgot = useSelector((state) => state.superAdminForgot);
  const history = useHistory();


  useEffect(() => {
    if (superAdminForgot?.data) {
      history.push("/reset-password");
    }
  }, [superAdminForgot]);

  const passwordSchema = yup.object({
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
    resolver: yupResolver(passwordSchema),
    mode: "onBlur"
  });

  const onSubmit = (_data, e) => {
    e.target.reset();
    dispatch(postData(_data));
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
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h2" variant="h5" sx={{textAlign:'center', mt:4}}>
        Forgot Password
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, bgcolor:'var(--darkBlue)' }}
        >
          Send OTP
        </Button>
      </Box>
    </Box>
  </Container>
  <LandingFooter />
    </>
  );
};

export default ForgotPassword;
