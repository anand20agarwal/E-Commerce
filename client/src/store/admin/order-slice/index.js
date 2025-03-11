import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Use the deployed backend URL instead of localhost
const API_BASE_URL = "https://e-commerce-v7dd.onrender.com/api/admin/orders";

const initialState = {
  orderList: [],
  orderDetails: null,
  isLoading: false,
};

// Fetch all orders for admin
export const getAllOrdersForAdmin = createAsyncThunk(
  "/order/getAllOrdersForAdmin",
  async () => {
    const response = await axios.get(`${API_BASE_URL}/get`, {
      withCredentials: true, // Ensures cookies/session data are included
    });
    return response.data;
  }
);

// Fetch order details for admin
export const getOrderDetailsForAdmin = createAsyncThunk(
  "/order/getOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(`${API_BASE_URL}/details/${id}`, {
      withCredentials: true,
    });
    return response.data;
  }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `${API_BASE_URL}/update/${id}`,
      { orderStatus },
      { withCredentials: true }
    );
    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
