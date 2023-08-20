import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import Cart from "../pages/Cart";
import useModal from "../hooks/useModal";
import { logoutToken } from "../redux/reducers/userReducer";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.userReducer.currentUser);
  const { toggle, isOpen } = useModal();
  const [anchorEl, setAnchorEl] = useState(null);
  const { totalProducts } = useAppSelector((state) => state.cartReducer);

  const handleLogout = () => {
    dispatch(logoutToken());
    setAnchorEl(null);
    navigate("/");
  };
  const handleMenuOpen = (e: any) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 0, textDecoration: "none", color: "inherit" }}
        >
          MI E-Shop
        </Typography>
        <Typography sx={{ flexGrow: 25 }}>
          <Button component={Link} to="/products" color="inherit">
            Products
          </Button>
        </Typography>
        <IconButton color="inherit" onClick={toggle} sx={{ flexGrow: 0.5 }}>
          <Badge badgeContent={totalProducts} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <Cart isOpen={isOpen} toggle={toggle} />
        {currentUser && (
          <>
            <Typography variant="subtitle2" sx={{ marginRight: "1rem" }}>
              Logged in as {currentUser.firstName}
            </Typography>
          </>
        )}
        {currentUser ? (
          <>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {currentUser.isAdmin && [
                <MenuItem
                  component={Link}
                  to="/modifyproducts"
                  key="modifyproducts"
                  onClick={handleMenuClose}
                >
                  Modify Products
                </MenuItem>,
                <MenuItem
                  component={Link}
                  to="/userlist"
                  key="userlist"
                  onClick={handleMenuClose}
                >
                  User List
                </MenuItem>,
                <MenuItem
                  component={Link}
                  to="/orderlist"
                  key="orderlist"
                  onClick={handleMenuClose}
                >
                  Orders List
                </MenuItem>,
              ]}
              <MenuItem
                component={Link}
                to="/profile"
                onClick={handleMenuClose}
              >
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button component={Link} to="/login" color="inherit">
            Log In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
