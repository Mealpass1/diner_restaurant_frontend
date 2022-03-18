import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    cart: [],
    total: 0,
    fee: 0,
  },
  reducers: {
    add: (state, action) => {
      state.cart = action.payload;
    },
    getTotal: (state, action) => {
      state.total = 0;
      state.cart?.forEach((item) => {
        state.total += item.subTotal;
      });
    },
    getFee: (state, action) => {
      state.fee = state.total * 0.015;
    },
    remove: (state, action) => {
      state.cart = [];
      state.total = 0;
      state.fee = 0;
    },
  },
});

export const { add, getTotal, getFee, remove } = cartSlice.actions;

export default cartSlice.reducer;
