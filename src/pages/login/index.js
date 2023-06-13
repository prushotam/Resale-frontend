import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "./service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useHistory, useLocation } from "react-router-dom";
import LandingFooter from "../general-landing-page/LandingFooter";
import GeneralNav from '../general-landing-page/GeneralNav'

import "./style.scss";
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

function Login() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const role = useSelector((state) => state.loggedInUser.preferredRole);
  const loading = useSelector((state) => state.loggedInUser.loading);
  const history = useHistory();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  useEffect(() => {
    if (loggedInUser.data?.data?.accessToken) {
      sessionStorage.setItem("authToken", loggedInUser.data.data.accessToken);
      sessionStorage.setItem("role", role);
      if( role === 'SUPERADMIN' || role === 'ADMIN'){
      history.push("/dashboard");
      }else{
        history.push("/user-home");
      }
    }
  }, [loggedInUser]);
  const loginSchema = yup.object({
    email: yup
      .string()
      .email("invalid email address")
      .required("Enter your email address"),
    password: yup.string().required("Enter your password").min(6),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur"
  });

  const onSubmit = (_data, e) => {
    e.target.reset();
    _data.path = location.pathname
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h2" variant="h5" sx={{ mt: 4 }}>
          Sign In
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        </Box>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...register("email")}
                error={Boolean(errors.email)} />
              <div className="login-errors">
                {errors.email ? (<>{errors.email.message}</>
                ) : null}
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
                  endAdornment={<InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>} />
                <div className="login-errors">
                  {errors.password ? (<>{errors.password.message}</>
                  ) : null}
                </div>
                <Link to={"/forgot-password"} className="forgot-link">
                  Forgot Password?
                </Link>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: 'var(--darkBlue)' }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
    <LandingFooter />
    </>
  );
}
export default Login;
