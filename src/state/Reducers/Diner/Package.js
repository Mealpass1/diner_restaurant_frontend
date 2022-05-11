import { createSlice } from "@reduxjs/toolkit";

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
      state.dishes = newDishes
    }
  },
});

export const { add, removeDish } = packageSlice.actions;

export default packageSlice.reducer;
