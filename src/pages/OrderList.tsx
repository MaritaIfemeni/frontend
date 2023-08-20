import React, { useEffect } from "react";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { fetchAllOrder } from "../redux/reducers/orderReducer";
import { Order, OrderDetail } from "../types/Order";

const OrderList = () => {
  const dispatch = useAppDispatch();
  const orderData = useAppSelector((state) => state.orderRerducer); // Order or Array of Order

  useEffect(() => {
    dispatch(fetchAllOrder());
  }, [dispatch]);

  const orders = Array.isArray(orderData) ? orderData : [orderData];

  return (
    <div>
      <h2>Orders</h2>
      {orders.map((order) => (
        <div key={order.userId}>
          <p>Full Name: {order.fullName}</p>
          <p>Delivery Address: {order.deliveryAddress}</p>
          <p>User ID: {order.userId}</p>
          <ul>
            {order.orderDetails.map((detail: OrderDetail) => (
              <li key={detail.productId}>
                Product ID: {detail.productId}, Quantity: {detail.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
