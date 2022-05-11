import { createSlice, current } from "@reduxjs/toolkit";

import axios from "../../../features/axios"

const packageSlice = createSlice({
  name: "Package",
  initialState: {
    dishes: [],
  },
  reducers: {
    add: (state, action) => {
      state.dishes = action.payload;
    },
    removeDish: (state, action) => {
      const newDishes = state.dishes.filter(d => d._id !== action.payload)
      state.dishes = newDishes;
    },
    addToCart: (state, action) => {
      console.log(current(state));
    }
  },
});

const addToCartApi = (dishes) => {

}

export const { add, removeDish, addToCart } = packageSlice.actions;

export default packageSlice.reducer;
