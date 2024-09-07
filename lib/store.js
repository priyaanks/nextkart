import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/products/products.slice";
import cartReducer from "./features/cart/cart.slice";
import ordersReducer from "./features/orders/orders.slice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
});
