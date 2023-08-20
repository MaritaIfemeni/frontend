import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { Home, ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { Product } from "../types/Product";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { addCartItem } from "../redux/reducers/cartReducer";

const style = {
  position: "relative" as "relative",
  width: 400,
  margin: "0 auto",
  marginBottom: "2em",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SingleProductPage = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.productsReducer
  );
  const { id } = useParams();
  const selectedProduct =
    products && products.find((product: Product) => product.id === String(id));
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(
    selectedProduct
  );
  useEffect(() => {
    if (selectedProduct) {
      setCurrentProduct(selectedProduct);
      localStorage.setItem("currentProduct", JSON.stringify(selectedProduct));
    }
  }, []);
  useEffect(() => {
    setCurrentProduct(
      JSON.parse(localStorage.getItem("currentProduct") || "{}")
    );
  }, []);
  const handleAddToCart = (product: Product | undefined) => {
    if (product) {
      dispatch(addCartItem(product));
    }
  };

  return (
    <Card sx={style}>
      <CardContent>
        <Box>
          <Typography variant="h5" component="div">
            {currentProduct?.productName}
          </Typography>
          <img src={currentProduct?.productImages[0].link} alt="Product" />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              Description: {currentProduct?.description}
            </Typography>
            <Typography variant="h6" sx={{ mr: 2 }}>
              Price: {currentProduct?.price} £
            </Typography>
          </Box>

          <Box>
            <Button
              variant="contained"
              onClick={() => handleAddToCart(currentProduct)}
            >
              Add to Cart
            </Button>
          </Box>

        </Box>
      </CardContent>
      <CardActions>
        <IconButton component={Link} to="/" color="inherit">
          <Home />
        </IconButton>
        <IconButton component={Link} to="/products" color="inherit">
          <ArrowBack />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default SingleProductPage;
