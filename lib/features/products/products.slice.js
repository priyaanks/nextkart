import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await axios("/api/products");
    return response.data.products;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await axios(`/api/products/${id}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    items: [],
    error: null,
    productDetail: {
      loading: false,
      items: [],
      error: null,
    },
    filteredProducts: [],
  },
  reducers: {
    filterProducts: (state, action) => {
      const query = action.payload && action.payload.toLowerCase();

      if (query.length > 0) {
        state.filteredProducts =
          state.items?.filter((product) => {
            return (
              product.title.toLowerCase().includes(query) ||
              product.description.toLowerCase().includes(query) ||
              product.category.toLowerCase().includes(query)
            );
          }) || [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.productDetail.loading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.productDetail.loading = false;
        state.productDetail.items = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.productDetail.loading = false;
        state.productDetail.error = action.error.message;
      });
  },
});

export const { filterProducts } = productSlice.actions;
export default productSlice.reducer;
