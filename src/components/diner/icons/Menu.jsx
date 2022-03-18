import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { IoFastFoodSharp } from "react-icons/io5";

import styles from "./Icons.module.css";

const MenuIcon = () => {
  const { pathname } = useLocation();

  return (
    <div
      className={
        pathname.includes("/menu") ? `${styles.active}` : `${styles.container}`
      }
    >
      <label htmlFor="menu">
        <IoFastFoodSharp />
      </label>
      <Link to="/diner/menu" id="menu">
        My Menu
      </Link>
    </div>
  );
};

export default MenuIcon;
