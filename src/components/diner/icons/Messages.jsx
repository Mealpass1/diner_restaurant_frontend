import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { AiFillWechat } from "react-icons/ai";

import styles from "./Icons.module.css";

const MessagesIcon = () => {
  const { pathname } = useLocation();

  return (
    <div
      className={
        pathname.includes("/messages")
          ? `${styles.active}`
          : `${styles.container}`
      }
    >
      <label htmlFor="messages">
        <AiFillWechat />
      </label>
      <Link to="/diner/messages" id="messages">
        Messages
      </Link>
    </div>
  );
};

export default MessagesIcon;
