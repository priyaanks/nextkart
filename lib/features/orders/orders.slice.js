import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const ordersSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {
    updateOrderDetails: (state, action) => {
      state.push(action.payload);
    },
    resetOrders: (state) => {
      state = initialState;
    },
  },
});

export const { updateOrderDetails, resetOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
