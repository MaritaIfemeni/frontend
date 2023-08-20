import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { createNewUser, setUserResponse } from "../redux/reducers/userReducer";
import { User } from "../types/User";
import registrationSchema, {
  RegistrationFormData,
} from "../validation/registrationSchema";

const RegitsrationForm = () => {
  const { userResponse } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    await dispatch(createNewUser(data));
    navigate("/login", {
      state: { successMessage: "Account created successfully!" },
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                {...register("username")}
                label="username"
                name="username"
                autoComplete="username"
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="firstName"
                {...register("firstName")}
                label="firstName"
                name="firstName"
                autoComplete="firstName"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="lastName"
                {...register("lastName")}
                label="lastName"
                name="lastName"
                autoComplete="lastName"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                {...register("email")}
                label="Email Address"
                name="email"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                {...register("address")}
                name="address"
                label="address"
                autoFocus
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                 required
                 fullWidth
                 id="city"
                 {...register("city")}
                 name="city"
                 label="city"
                 autoFocus
                 error={!!errors.city}
                 helperText={errors.city?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                 required
                 fullWidth
                 id="postcode"
                 {...register("postcode")}
                 name="postcode"
                 label="postcode"
                 autoFocus
                 error={!!errors.postcode}
                 helperText={errors.postcode?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                 required
                 fullWidth
                 id="phone"
                 {...register("phone")}
                 name="phone"
                 label="phone"
                 autoFocus
                 error={!!errors.phone}
                 helperText={errors.phone?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                {...register("password")}
                name="password"
                autoComplete="new-password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Avatar URL"
                id="avatar"
                {...register("avatar")}
                name="avatar"
                autoComplete="new-avatar"
                error={!!errors.avatar}
                helperText={errors.avatar?.message}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegitsrationForm;
