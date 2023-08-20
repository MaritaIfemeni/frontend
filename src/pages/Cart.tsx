import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Modal,
  Typography,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { closeModal } from "../redux/reducers/modalReducer";
import {
  addMoreOneItem,
  decreaseOneItem,
  deleteCartItem,
  clearCart,
} from "../redux/reducers/cartReducer";
import { ModalProps } from "../types/ModalProps";
import { CartItem } from "../types/CartItem";
import { CartType } from "../types/CartType";
import { fetchCreateOrder } from "../redux/reducers/orderReducer";
import { User } from "../types/User";
import { OrderDetail } from "../types/Order";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Cart = (props: ModalProps) => {
  const { isOpen } = props;
  const { items, totalSum, totalProducts }: CartType = useAppSelector(
    (state) => state.cartReducer
  );
  const dispatch = useAppDispatch();
  const [fullName, setFullName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [isOrdering, setIsOrdering] = useState(false);
  const isLoggedIn = localStorage.getItem("token") !== null;

  if (!isOpen) {
    return null;
  }

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleDeleteCartItem = (cartId: string) => {
    dispatch(deleteCartItem(cartId));
  };

  const handleAddMoreOneItem = (cartId: string) => {
    dispatch(addMoreOneItem(cartId));
  };

  const handleDecreaseOneItem = (cartId: string) => {
    dispatch(decreaseOneItem(cartId));
  };

  const handleStartOrder = () => {
    if (!isLoggedIn) {
      alert("You need to be logged in to place an order.");
      return;
    }
    setIsOrdering(true);
  };

  const handlePlaceOrder = async () => {
    const orderDetails: OrderDetail[] = items.map((item: CartItem) => ({
      productId: item.id,
      quantity: item.total,
    }));

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get<User>(
        "https://mi-eshop.azurewebsites.net/api/v1/users/profile",
        {
          headers: headers,
        }
      );
      const user: User = response.data;

      const order = {
        fullName,
        deliveryAddress,
        orderDetails,
        userId: user.id,
      };

      dispatch(fetchCreateOrder(order));
      alert("Order placed successfully!");
      setIsOrdering(false);
      setFullName("");
      setDeliveryAddress("");
      dispatch(clearCart());
      handleCloseModal();
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Shopping cart
          </Typography>
          {!isOrdering && (
            <Button variant="contained" onClick={handleStartOrder}>
              Order
            </Button>
          )}
          {isOrdering && isLoggedIn && (
            <>
              <TextField
                required
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                required
                label="Delivery Address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                sx={{ mb: 2 }}
              />
            </>
          )}
          {items.length === 0 ? (
            <Typography variant="body1">
              Your shopping cart is empty.
            </Typography>
          ) : (
            <>
              {items.map((item: CartItem) => (
                <Box
                  key={item.cartId}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ mr: 2 }}>
                      Product: {item.productName}
                    </Typography>
                    <Typography variant="body1" sx={{ mr: 2 }}>
                      Price: {item.price}
                    </Typography>
                    <Typography variant="body1" sx={{ mr: 2 }}>
                      Quantity: {item.total}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteCartItem(item.cartId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleAddMoreOneItem(item.cartId)}
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDecreaseOneItem(item.cartId)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))}
              <Typography variant="body1">
                Total Products in Your Cart: {totalProducts}
              </Typography>
              <Typography variant="body1">
                Total Sum of Your Cart: {totalSum}
              </Typography>
              <Button variant="contained" onClick={handleClearCart}>
                Clear
              </Button>
              {isOrdering && isLoggedIn && (
                <Button variant="contained" onClick={handlePlaceOrder}>
                  Place Order
                </Button>
              )}
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Cart;
