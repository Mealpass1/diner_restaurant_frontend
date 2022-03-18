import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
  name: "Restaurant",
  initialState: {
    restaurant: {},
    restaurants: [],
  },
  reducers: {
    add: (state, action) => {
      state.restaurant = action.payload;
    },
    all: (state, action) => {
      state.restaurants = action.payload;
    },
  },
});

export const { add, all } = restaurantSlice.actions;

export default restaurantSlice.reducer;
