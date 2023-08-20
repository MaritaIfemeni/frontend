import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import shoppingImage from "../img/shopping.jpeg";
import useAppSelector from "../hooks/useAppSelector";

const HomePage = () => {
  const currentUser = useAppSelector((state) => state.userReducer.currentUser);

  return (
    <Container maxWidth="lg">
      <h1>Welcome to MI E-Shop</h1>
      {currentUser && <p>Hi {currentUser.firstName}, welcome to shopping!</p>}
      <Grid>
        <img src={shoppingImage} alt="shopping" width="100%" height="100%" />
      </Grid>
      <Button component={Link} to="/products" variant="contained" sx={{ margin: "2em" }}>
        start shopping
      </Button>
    </Container>
  );
};

export default HomePage;
