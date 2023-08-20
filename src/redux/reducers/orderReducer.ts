import {
  createAsyncThunk,
  createSlice,
  isAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

import { Order, OrderDetail } from "../../types/Order";


const initialState: Order = {
  fullName: "",
  deliveryAddress: "",
  userId: "",
  orderDetails: [],
};

export const fetchAllOrder = createAsyncThunk(
  "order/fetchAllOrder",
  async () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get<Order>(
        "https://mi-eshop.azurewebsites.net/api/v1/orders",
        { headers: headers }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch orders");
    }
  }
);

export const fetchCreateOrder = createAsyncThunk(
  "order/createOrder",
  async (order: Order) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.post<Order>(
        "https://mi-eshop.azurewebsites.net/api/v1/orders",
        order,
        {
          headers: headers,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to create order");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<Order>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCreateOrder.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchAllOrder.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

const orderReducer = orderSlice.reducer;
export const { createOrder } = orderSlice.actions;
export default orderReducer;
