import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import DeleteIcon from "@mui/icons-material/Delete";

import useAppDispatch from "../../hooks/useAppDispatch";
import { deleteProduct } from "../../redux/reducers/productsReducer";
import { Product } from "../../types/Product";

const DeleteProduct = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<Product>();

  const onSubmit: SubmitHandler<Product> = (data) => {
    dispatch(deleteProduct(data.id));
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
        <DeleteIcon
          sx={{
            m: 0.5,
            bgcolor: "error.main",
            minWidth: "15%",
            height: "2.5em",
          }}
        ></DeleteIcon>
        <Typography component="h1" variant="h5">
          Delete products
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
                label="Insert ID of the product you want to delete"
                autoComplete="product-id"
                required
                fullWidth
                id="id"
                {...register("id")}
                name="id"
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 3, mb: 2 }}
            >
              Delete Product Permanently
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default DeleteProduct;
