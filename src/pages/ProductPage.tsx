import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Select,
  MenuItem,
  Button,
  Typography,
  TextField,
  Card,
  CardMedia,
  Grid,
  CardContent,
  CardActions,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

import {
  fetchAllProducts,
  filterProductsByPrice,
} from "../redux/reducers/productsReducer";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { Product } from "../types/Product";
import useDebounce from "../hooks/useDebounce";
import { addCartItem } from "../redux/reducers/cartReducer";

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce<string>(search, 1000);
  const [order, setOrder] = useState<string>("UpdatedAt");
  const [descending, setDescending] = useState<boolean>(true);
  const [priceFilter, setPriceFilter] = useState<number>(0);
  const products = useAppSelector((state) => state.productsReducer.products);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(
      fetchAllProducts({
        pageNumber: currentPage,
        pageSize: itemsPerPage,
        search: debouncedSearch,
        order,
        descending,
      })
    );
  }, [dispatch, debouncedSearch, order, descending, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleDescendingChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescending(event.target.checked);
  };

  const handleFilterByPrice = () => {
    dispatch(filterProductsByPrice(priceFilter));
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addCartItem(product));
  };

  return (
    <Container>
      <Typography variant="h4" color="primary" sx={{ margin: "0.5em 0" }}>
        Here you can start browsing the products!
      </Typography>
      <TextField
        label="Search"
        value={search}
        onChange={handleSearchChange}
        variant="outlined"
        size="small"
        fullWidth
      />
      <Typography variant="h5" sx={{ margin: "1 1 2em 2em" }}>
        <Select
          value={priceFilter}
          onChange={(e) => setPriceFilter(Number(e.target.value))}
          sx={{ minWidth: "15%", height: "2.5em" }}
        >
          <MenuItem value={0}>Low to High</MenuItem>
          <MenuItem value={1}>High to Low</MenuItem>
        </Select>
        <Button
          variant="contained"
          onClick={handleFilterByPrice}
          sx={{ marginLeft: "1em" }}
        >
          <SortIcon sx={{ marginRight: "0.5em" }} /> Sort by Price
        </Button>
      </Typography>

      <Typography variant="h5" sx={{ margin: "1 1 1em 1em" }}>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={descending}
                onChange={handleDescendingChange}
              />
            }
            label="Newest first"
          />
        </div>
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
               <CardMedia
                component="div"
                sx={{
                  pt: "56.25%",
                }}
                image={product.productImages[0].link}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.productName}
                </Typography>
                <Typography gutterBottom variant="h6">
                  Price: {product.price} £
                </Typography>
                <Typography>{product.description}</Typography>
              </CardContent>
              <CardActions>
                <Link to={`/product/${product.id}`}>
                  <Button size="small">Details</Button>
                </Link>
                <Button size="small" onClick={() => handleAddToCart(product)}>
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button onClick={handlePrevPage} disabled={currentPage === 1}>
        Go to Previous Page
      </Button>
      <Button onClick={handleLoadMore} disabled={products.length < itemsPerPage}>
      Load More
      </Button>
    </Container>
  );
};

export default ProductPage;
