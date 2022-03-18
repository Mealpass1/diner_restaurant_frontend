import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { BiFoodMenu } from "react-icons/bi";

import styles from "./Icons.module.css";

const RecipesIcon = () => {
  const { pathname } = useLocation();

  return (
    <div
      className={
        pathname.includes("/recipes")
          ? `${styles.active}`
          : `${styles.container}`
      }
    >
      <label htmlFor="recipes">
        <BiFoodMenu />
      </label>
      <Link to="/diner/recipes" id="recipes">
        Recipes
      </Link>
    </div>
  );
};

export default RecipesIcon;
