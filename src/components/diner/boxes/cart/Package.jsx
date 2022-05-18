import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { AiOutlinePlus } from "react-icons/ai";
import { BiMinus, BiTrash } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";

import axios from "../../../../features/axios";

const Box = (props) => {
  const router = useNavigate();
  const [token, setToken] = useState("");

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

  const goToDish = () => {
    router(`/diner/cart/${props.item._id}`);
  };

  //   console.log(props.item);

  return (
    <Container>
      <motion.div
        className="container"
        variants={variants}
        initial="initial"
        animate="visible"
        exit={{ x: -100, opacity: 0, transition: { duration: 1.5 } }}
      >
        <div className="left">
          <div className="image">
            <img
              src={props.item?.package?.image}
              alt={props.item?.package?.name}
            />
          </div>
          <p>
            <span>From: </span>
            MealPass
          </p>
        </div>
        <div className="about">
          <div className="title">
            <p>{props?.item?.package?.name} package</p>
            <div className="p1">
              <p>{props?.item?.subTotal} RWF</p>
            </div>
          </div>
          <div className="serving">
            <p>Meal Serving</p>
            <p>For a week</p>
          </div>
        </div>
        <div className="right">
          <div className="settings">
            <div
              className="delete"
              onClick={() => props.delete(props.item._id)}
            >
              <BiTrash />
            </div>
          </div>
          <div className="total">
            <p>Sub-Total</p>
            <p>{props?.item?.subTotal} RWF</p>
          </div>
        </div>
      </motion.div>
    </Container>
  );
};

const Container = styled.div`
  width: 95%;
  height: auto;
  margin: 0 0 10px 0;

  .container {
    width: 100%;
    height: 140px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
      inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin: 10px 0;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;

    .left {
      width: 30%;
      height: 90%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;

      .image {
        width: 90%;
        height: 80px;
        border-radius: 5px;
        overflow: hidden;

        img {
          width: 100%;
          border-radius: 5px;
        }
      }

      p {
        font-size: 0.9em;
        width: 90%;
        span {
          font-weight: 700;
        }
      }
    }

    .about {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      .title {
        font-weight: bold;
        text-transform: capitalize;
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;

        .p1 {
          width: 80%;
          height: 30px;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-between;

          p:nth-child(2) {
            font-weight: normal;
            color: var(--red);
          }
        }
      }

      .serving {
        width: auto;
        height: 60px;
        display: flex;

        p:nth-child(2) {
          text-align: left;
          font-weight: 700;
        }
      }
    }

    .right {
      width: 20%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      .settings {
        width: 100%;
        height: 40%;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-end;

        > div {
          font-size: 1.6em;
          margin: 8px;
        }
      }

      .total {
        width: 130%;
        height: 65%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        p {
          font-weight: bold;
        }
      }
    }
  }
`;

export default Box;
