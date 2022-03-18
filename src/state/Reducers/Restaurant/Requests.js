import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "Requests",
  initialState: {
    requests: [],
  },
  reducers: {
    add: (state, action) => {
      state.requests = action.payload;
    },
  },
});

export const { add } = requestSlice.actions;

export default requestSlice.reducer;
