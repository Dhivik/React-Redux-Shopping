import { createSlice } from "@reduxjs/toolkit";

const checkExistingItemIndex = (state, action) => {
  return state.cartItems.findIndex(
    (item) => item.productId === action.payload.productId,
  );
};
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    isError: false,
  },
  reducers: {
    cartItemsLoading: (state) => {
      state.loading = true;
    },
    loadCartItems: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload?.cartData || [];
    },
    addCartItems: (state, action) => {
      state.loading = false;
      const existingItemIndex = checkExistingItemIndex(state, action);
      if (existingItemIndex === -1) {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      } else {
        state.cartItems[existingItemIndex].quantity += 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeCartItems: (state, action) => {
      const existingItemIndex = checkExistingItemIndex(state, action);
      state.cartItems = state.cartItems.slice(1, existingItemIndex);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    increaseQuantity: (state, action) => {
      const existingItemIndex = checkExistingItemIndex(state, action);
      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity += 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseQuantity: (state, action) => {
      const existingItemIndex = checkExistingItemIndex(state, action);
      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity -= 1;
        if (state.cartItems[existingItemIndex].quantity === 0) {
          state.cartItems.splice(existingItemIndex, 1);
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
  },
});

export const {
  loadCartItems,
  cartItemsLoading,
  addCartItems,
  removeCartItems,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
