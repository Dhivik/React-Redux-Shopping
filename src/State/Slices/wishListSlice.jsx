import { createSlice } from "@reduxjs/toolkit";

const checkExistingItem = (state, action) => {
  console.log(state.wishlistItems, action.payload.productId);
  return state.wishlistItems.findIndex(
    (item) => item.productId === action.payload.productId,
  );
};
const wishListSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: [],
    loading: false,
    isError: false,
  },
  reducers: {
    wishListLoading: (state) => {
      state.loading = true;
    },
    loadWishListItems: (state, action) => {
      state.loading = false;
      state.wishlistItems = action.payload?.wishListData || [];
    },
    addWishListItems: (state, action) => {
      state.loading = false;
      const exitingItemIndex = checkExistingItem(state, action);
      console.log(exitingItemIndex);
      if (exitingItemIndex === -1) {
        state.wishlistItems.push({ productId: action.payload.productId });
      }
      localStorage.setItem("wishListitem", JSON.stringify(state.wishlistItems));
    },
    removeWishListItems: (state, action) => {
      const existingItemIndex = checkExistingItem(state, action);
      if (existingItemIndex !== -1) {
        state.wishlistItems.splice(existingItemIndex, 1);
      }
      localStorage.setItem("wishListitem", JSON.stringify(state.wishlistItems));
    },
  },
});

export const {
  addWishListItems,
  removeWishListItems,
  loadWishListItems,
  wishListLoading,
} = wishListSlice.actions;

export default wishListSlice.reducer;
