import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Use the deployed backend URL instead of localhost
const API_BASE_URL = "https://e-commerce-v7dd.onrender.com/api/admin/products";

const initialState = {
  isLoading: false,
  productList: [],
};

// Add a new product
export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(`${API_BASE_URL}/add`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Ensures authentication works with cookies
    });

    return result?.data;
  }
);

// Fetch all products
export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(`${API_BASE_URL}/get`, {
      withCredentials: true,
    });

    return result?.data;
  }
);

// Edit a product
export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    const result = await axios.put(`${API_BASE_URL}/edit/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return result?.data;
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(`${API_BASE_URL}/delete/${id}`, {
      withCredentials: true,
    });

    return result?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;
