import React, { useEffect } from "react";
import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { fetchAllOrder } from "../redux/reducers/orderReducer";
import { OrderDetail } from "../types/Order";
import { fetchProductById } from "../redux/reducers/productsReducer";

const OrderList = () => {
  const dispatch = useAppDispatch();
  const orderData = useAppSelector((state) => state.orderRerducer);
  const productInfo = useAppSelector(
    (state) => state.productsReducer.productInfo
  );

  useEffect(() => {
    dispatch(fetchAllOrder());
  }, [dispatch]);

  const orders = Array.isArray(orderData) ? orderData : [orderData];

  useEffect(() => {
    const productIdsToFetch = new Set<string>();
    orders.forEach((order) => {
      order.orderDetails.forEach((detail: any) => {
        if (!productInfo.find((product) => product.id === detail.productId)) {
          productIdsToFetch.add(detail.productId);
        }
      });
    });

    productIdsToFetch.forEach((productId) => {
      dispatch(fetchProductById(productId));
    });
  }, [dispatch, orders, productInfo]);

  return (
    <Container>
      <Typography variant="h4" color="primary" sx={{ margin: "0.5em 0" }}>
        List of Orders
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Delivery Address</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Order Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.userId}>
                <TableCell>{order.fullName}</TableCell>
                <TableCell>{order.deliveryAddress}</TableCell>
                <TableCell>{order.userId}</TableCell>
                <TableCell>
                  <ul>
                    {order.orderDetails.map((detail: OrderDetail) => (
                      <li key={detail.productId}>
                        Product:{" "}
                        {productInfo.find(
                          (product) => product.id === detail.productId
                        )?.productName || "Loading..."}
                        , Quantity: {detail.quantity}
                      </li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default OrderList;
