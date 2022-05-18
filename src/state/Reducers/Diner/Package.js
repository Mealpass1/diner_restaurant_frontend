import { createSlice } from "@reduxjs/toolkit";

const packageSlice = createSlice({
  name: "Package",
  initialState: {
    dishes: [],
    subTotal: 0,
    mealServing: 0,
  },
  reducers: {
    add: (state, action) => {
      let subTotal = 0;
      let mealServing = 0;
      action?.payload?.forEach((element) => {
        subTotal += element.subTotal;
        mealServing += element.mealServing;
      });
      state.dishes = action.payload;
      state.subTotal = subTotal;
      state.mealServing = mealServing;
    },
    removeDish: (state, action) => {
      let subTotal = 0;
      let mealServing = 0;
      const newDishes = state.dishes.filter((d) => d._id !== action.payload);
      newDishes.forEach((element) => {
        subTotal += element.subTotal;
        mealServing += element.mealServing;
      });
      state.dishes = newDishes;
      state.subTotal = subTotal;
      state.mealServing = mealServing;
    },
  },
});

export const { add, removeDish } = packageSlice.actions;

export default packageSlice.reducer;
