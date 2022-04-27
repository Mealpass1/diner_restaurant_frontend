import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

//slices
import dinerRestaurantSlice from "./Reducers/Diner/Restaurant";
import restaurantRestaurantSlice from "./Reducers/Restaurant/Restaurant";
import cartSlice from "./Reducers/Diner/Cart";
import menuSlice from "./Reducers/Diner/Menu";
import notificationSlice from "./Reducers/Diner/Notifications";
import packageSlice from "./Reducers/Diner/Package";
import productSlice from "./Reducers/Restaurant/Products";
import requestSlice from "./Reducers/Restaurant/Requests";
import orderSlice from "./Reducers/Restaurant/Orders";
import AdminSlice from "./Reducers/Admin/State";

const diner = combineReducers({
  cart: cartSlice,
  menu: menuSlice,
  restaurant: dinerRestaurantSlice,
  notifications: notificationSlice,
  package: packageSlice,
});

const restaurant = combineReducers({
  restaurant: restaurantRestaurantSlice,
  products: productSlice,
  requests: requestSlice,
  orders: orderSlice,
});

const admin = combineReducers({
  state: AdminSlice,
});

const state = combineReducers({
  diner: diner,
  restaurant: restaurant,
  admin: admin,
});

const store = configureStore({
  reducer: state,
  devTools: true,
});

export default store;
