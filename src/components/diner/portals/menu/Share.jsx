import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactDom from "react-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import axios from "../../../../features/axios";

import { FiUserCheck } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { BiMinus } from "react-icons/bi";

const Share = ({ cancel, success, order, dish, restaurant }) => {
  const [quantity, setQuantity] = useState(0);
  const [person, setPerson] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const handlePerson = (e) => {
    setPerson(e.target.value);
  };

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity === 0) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const share = () => {
    setLoading(true);

    axios
      .post(
        "/menu/share",
        {
          person: person,
          quantity: quantity,
          order: order,
          dish: dish,
          restaurant: restaurant,
        },
        { headers: { auth: `${token}` } }
      )
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        if (response.data.status == "error") {
          toast.error("Invalid user or quantity...", {
            toastId: "customId",
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        } else {
          toast.success("Meal shared", {
            toastId: "customId",
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          cancel();
          success();
        }
      });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);
  }, []);

  const variants = {
    initial: {
      y: 300,
    },
    visible: {
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return ReactDom.createPortal(
    <Container>
      <div className="cancel" onClick={() => cancel()}></div>
      <motion.div
        className="content"
        variants={variants}
        initial="initial"
        animate="visible"
      >
        <div className="title">
          <p>Meal sharing</p>
          <p onClick={() => cancel()}>Cancel</p>
        </div>
        <p>
          <span>Note: </span>
          You can only invite a mealpass member
        </p>
        <p>Invite expires in 24 hours</p>
        <div className="invite">
          <div className="email">
            <label htmlFor="email">
              <FiUserCheck />
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Username/Email"
              value={person}
              onChange={handlePerson}
              autoComplete="OFF"
            />
          </div>
          <div className="amount">
            <p>Quantity</p>
            <div className="quantity">
              <div className="plus" onClick={increment}>
                <AiOutlinePlus />
              </div>
              <p>{quantity}</p>
              <div className="minus" onClick={decrement}>
                <BiMinus />
              </div>
            </div>
          </div>
          <button onClick={share}>
            {loading ? <img src="/loader.svg" alt="loader" /> : <p>Invite</p>}
          </button>
        </div>
      </motion.div>
    </Container>,
    document.querySelector("#portal")
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  z-index: 10000;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background: rgba(0, 0, 0, 0.6);

  .cancel {
    width: 100%;
    height: 50%;
  }

  .content {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 30px 30px 0 0;
    background: white;

    span {
      font-weight: bold;
    }

    .title {
      width: 100%;
      height: 15%;
      padding: 0 30px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      p:nth-child(1) {
        font-weight: bold;
        text-decoration: underline;
      }

      p:nth-child(2) {
        padding: 7px 20px;
        background: var(--red);
        border-radius: 5px;
        color: var(--white);
      }
    }
    .invite {
      width: 100%;
      height: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      .email {
        width: 75%;
        height: 40px;
        padding: 0 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-radius: 5px;
        background: var(--grayish);

        input {
          width: 85%;
          height: 100%;
          border: none;
          outline: none;
          background: transparent;
        }
      }

      .amount {
        width: 75%;
        height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .quantity {
          width: 50%;
          height: 35px;
          padding: 0 10px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;

          > div {
            width: 22%;
            height: 70%;
            border-radius: 50%;
            box-shadow: 0px 0.5px 3px rgba(0, 0, 0, 0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2em;
            background: var(--grayish);
          }

          p {
            padding: 5px 10px;
            background: var(--opacity);
          }
        }
      }

      button {
        width: 75%;
        height: 35px;
        border: none;
        outline: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        background: var(--gray);

        img {
          width: 20%;
        }
      }
    }
  }
`;

export default Share;
