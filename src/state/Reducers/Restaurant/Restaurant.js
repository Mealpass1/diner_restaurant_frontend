import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
  name: "Restaurant",
  initialState: {
    restaurant: {},
  },
  reducers: {
    add: (state, action) => {
      state.restaurant = action.payload;
    },
  },
});

export const { add } = restaurantSlice.actions;

export default restaurantSlice.reducer;
