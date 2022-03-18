import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { AiOutlineHome } from "react-icons/ai";

import styles from "./Icons.module.css";

const ExploreIcon = () => {
  const { pathname } = useLocation();

  return (
    <div
      className={
        pathname.includes("/explore")
          ? `${styles.active}`
          : `${styles.container}`
      }
    >
      <label htmlFor="explore">
        <AiOutlineHome />
      </label>
      <Link to="/diner/explore" id="explore">
        Explore
      </Link>
    </div>
  );
};

export default ExploreIcon;
