import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import ReactTimeAgo from "react-time-ago";

import axios from "../../../../features/axios";

import Invite from "../../portals/messages/Invite";

const Box = ({ notification }) => {
  const [pay, setPay] = useState(false);
  const [seen, setSeen] = useState(notification.seen);
  const [token, setToken] = useState("");

  const closePay = () => {
    setPay(!pay);

    axios
      .post(
        "/notification/diner/seen",
        { notification: notification?._id },
        { headers: { auth: `${token}` } }
      )
      .then((response) => {
        setSeen(true);
      });
  };

  const variants = {
    initial: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.5,
        staggerChildren: 1,
      },
    },
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);
  });

  const createdAt = new Date(notification?.createdAt);

  return (
    <Container>
      {pay == true && <Invite notification={notification} cancel={closePay} />}
      <motion.div
        className="container"
        onClick={closePay}
        variants={variants}
        initial="initial"
        animate="visible"
      >
        <div className="image">
          <img src={notification?.dish?.image} alt={notification?.title} />
        </div>
        <div className="about">
          <p className="bold">{notification?.title}</p>
          <p>{notification?.body}</p>
          <p className="time">
            <ReactTimeAgo date={createdAt} locale="en-US" />
          </p>
        </div>
        {seen == false ? (
          <div className="red"></div>
        ) : (
          <div className="transparent"></div>
        )}
      </motion.div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 80px;
  padding: 0 10px;

  :hover {
    background: var(--grayish);
  }

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin: 5px 0;
    border-bottom: 1px solid var(--opacity);

    .image {
      width: 17%;
      height: 75%;
      overflow: hidden;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .about {
      width: 70%;
      height: 80%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;

      .bold {
        font-weight: bold;
      }

      .time {
        color: var(--opacity);
      }
    }

    .red {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--red);
    }

    .transparent {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: transparent;
    }
  }
`;

export default Box;
