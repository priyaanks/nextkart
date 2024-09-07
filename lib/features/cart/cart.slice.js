import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
    count: 0,
  },
  reducers: {
    addCartItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.count += 1;
        state.total += Number(action.payload.price);
        state.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
        state.total += Number(action.payload.price);
        state.count++;
      }
    },
    removeCartItem: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.total -= Number(
          state.items[index].price * state.items[index].count
        );
        state.count--;
        state.items.splice(index, 1);
      }
    },
    updateProductQuantity: (state, action) => {
      const { item, quantity } = action.payload;
      if (quantity >= 0) {
        const index = state.items.findIndex(
          (cartItem) => cartItem.id === item.id
        );
        if (index !== -1) {
          // Remove the old total for this item
          state.total -= state.items[index].price * state.items[index].count;
          // Update the count
          state.items[index].count = quantity;
          // Add the new total for this item
          state.total += state.items[index].price * quantity;
        }
      }
    },
    resetCart: (state) => {
      state.items = [];
      state.total = 0;
      state.count = 0;
    },
  },
});

export const { addCartItem, removeCartItem, updateProductQuantity, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;
