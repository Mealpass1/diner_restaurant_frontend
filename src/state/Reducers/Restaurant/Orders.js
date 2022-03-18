import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "Orders",
  initialState: {
    orders: [],
  },
  reducers: {
    add: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { add } = orderSlice.actions;

export default orderSlice.reducer;
