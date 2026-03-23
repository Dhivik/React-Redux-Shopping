import { createSlice } from "@reduxjs/toolkit";

const BASE_URL = "https://fakestoreapi.com";

const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    productList: [],
    isError: false,
  },
  reducers: {
    productListLoading: (state) => {
      state.loading = true;
    },
    productListUpdate: (state, action) => {
      state.loading = false;
      state.productList = action.payload;
    },
    productListError: (state) => {
      state.isError = "Something Went Wrong!!!";
      state.loading = false;
    },
  },
});

export const getProducts = () => (dispatch) => {
  dispatch(productListLoading());
  fetch(`${BASE_URL}/products`)
    .then((res) => res.json())
    .then((data) => dispatch(productListUpdate(data)))
    .catch(() => {
      dispatch(productListError());
    });
};

export const { productListLoading, productListUpdate, productListError } =
  productSlice.actions;

export default productSlice.reducer;
