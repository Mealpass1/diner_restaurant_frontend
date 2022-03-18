import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "Notifications",
  initialState: {
    notifications: [],
  },
  reducers: {
    add: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const { add } = notificationSlice.actions;

export default notificationSlice.reducer;
