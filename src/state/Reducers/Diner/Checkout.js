import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "Cart",
  initialState: {
    address: "",
    country: "",
    street: "",
    city: "",
    phone: "",
    pickup: {
      name: "",
      phone: "",
    },
  },
  reducers: {},
});

export const {} = checkoutSlice.actions;

export default checkoutSlice.reducer;
