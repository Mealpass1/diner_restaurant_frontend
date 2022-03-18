import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "Menu",
  initialState: {
    menu: [],
  },
  reducers: {
    add: (state, action) => {
      state.menu = action.payload;
    },
  },
});

export const { add } = menuSlice.actions;

export default menuSlice.reducer;
