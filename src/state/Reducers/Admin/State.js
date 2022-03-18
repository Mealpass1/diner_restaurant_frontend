import { createSlice } from "@reduxjs/toolkit";

const AdminSlice = createSlice({
  name: "admin",
  initialState: {
    daysOfWeek: [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ],
    deliveryMode: [
      {
        mode: "Pickup from Restaurant",
        price: 0,
      },
      {
        mode: "Eat from Restaurant",
        price: 0,
      },
    ],
    repeatsInMonth: [
      {
        name: "Just this week",
        value: 1,
      },
      {
        name: "Over the next 2 weeks",
        value: 2,
      },
      {
        name: "Over the next 3 weeks",
        value: 3,
      },
      {
        name: "Over the next 4 weeks",
        value: 4,
      },
    ],
    timeOfMeal: ["breakfast", "lunch", "dinner"],
  },

  reducers: {},
});

export default AdminSlice.reducer;
