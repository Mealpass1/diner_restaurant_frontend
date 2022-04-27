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
  },
});

export const { add } = packageSlice.actions;

export default packageSlice.reducer;
