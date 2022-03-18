import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { BiUser } from "react-icons/bi";

import styles from "./Icons.module.css";

const AccountIcon = () => {
  const { pathname } = useLocation();

  return (
    <div
      className={
        pathname.includes("/account")
          ? `${styles.active}`
          : `${styles.container}`
      }
    >
      <label htmlFor="account">
        <BiUser />
      </label>
      <Link to="/diner/account" id="account">
        Account
      </Link>
    </div>
  );
};

export default AccountIcon;
