//packages
import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//pages
import Home from "./home";
import RLogin from "./restaurant/login";
import Signup from "./restaurant/signup";
import Requests from "./restaurant/requests";
import Products from "./restaurant/products";
import Orders from "./restaurant/orders";
import Profile from "./restaurant/profile";
import DLogin from "./diner/login";
import DSignup from "./diner/signup";
import Explore from "./diner/explore";
import Recipes from "./diner/recipes/index";
import Restaurant from "./diner/recipes/restaurant";
import Product from "./diner/recipes/product";
import Cart from "./diner/cart/index";
import CProduct from "./diner/cart/product";
import Menu from "./diner/menu";
import Available from "./diner/menu/product/available";
import Used from "./diner/menu/product/used";
import Shared from "./diner/menu/product/shared";
import Messages from "./diner/messages/index";
import Account from "./diner/account";
import Settings from "./diner/settings";
import Basket from "./diner/explore/package";
import Width from "./width";
import Payment from "./diner/cart/payment";

function App() {
  const [width, setWidth] = useState("");

  useEffect(() => {
    setWidth(window.innerWidth);
  });

  if (width > 416) {
    return <Width />;
  } else {
    return (
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/restaurant/login" element={<RLogin />} />
          <Route exact path="/restaurant/signup" element={<Signup />} />
          <Route exact path="/restaurant/requests" element={<Requests />} />
          <Route exact path="/restaurant/products" element={<Products />} />
          <Route exact path="/restaurant/orders" element={<Orders />} />
          <Route exact path="/restaurant/profile" element={<Profile />} />
          <Route exact path="/diner/login" element={<DLogin />} />
          <Route exact path="/diner/signup" element={<DSignup />} />
          <Route exact path="/diner/explore" element={<Explore />} />
          <Route exact path="/diner/explore/:package" element={<Basket />} />
          <Route exact path="/diner/recipes" element={<Recipes />} />
          <Route exact path="/diner/cart" element={<Cart />} />
          <Route exact path="/diner/cart/:product" element={<CProduct />} />
          <Route exact path="/diner/cart/payment" element={<Payment />} />
          <Route exact path="/diner/menu" element={<Menu />} />
          <Route exact path="/diner/messages" element={<Messages />} />
          <Route exact path="/diner/account" element={<Account />} />
          <Route exact path="/diner/settings" element={<Settings />} />
          <Route
            exact
            path="/diner/recipes/:restaurant"
            element={<Restaurant />}
          />
          <Route
            exact
            path="/diner/recipes/:restaurant/:product"
            element={<Product />}
          />
          <Route
            exact
            path="/diner/menu/:restaurant/:product/available"
            element={<Available />}
          />
          <Route
            exact
            path="/diner/menu/:restaurant/:product/used"
            element={<Used />}
          />
          <Route
            exact
            path="/diner/menu/:restaurant/:product/shared"
            element={<Shared />}
          />
        </Routes>
      </BrowserRouter>
    );
  }
}
export default App;
