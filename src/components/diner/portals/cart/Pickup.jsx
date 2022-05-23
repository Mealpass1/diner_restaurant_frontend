import React from "react";
import ReactDom from "react-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { AiOutlinePlus } from "react-icons/ai";

const Pickup = ({ cancel }) => {
  const variants = {
    initial: {
      y: 300,
    },
    visible: {
      y: 0,
      transition: {
        type: "tween",
      },
    },
  };

  return ReactDom.createPortal(
    <Container>
      <motion.div
        className="content"
        variants={variants}
        initial="initial"
        animate="visible"
      >
        <div className="delivery">
          <div className="top">
            <p>
              <AiOutlinePlus /> Add Pickup Method Info
            </p>
            <button type="button" onClick={() => cancel()}>
              Cancel
            </button>
          </div>
          <div className="form">
            <div className="box">
              <label htmlFor="address">Name of Pickup Person</label>
              <input type="text" id="address" />
            </div>
            <div className="box">
              <p>Delivery times in a week(3)</p>
              <p className="bold">Monday, Sunday, Friday</p>
            </div>
            <div className="box">
              <label htmlFor="country">Pickup Person Phone Number</label>
              <input type="text" id="country" />
            </div>
            <div className="box">
              <p>Packaging per meal:</p>
              <p className="bold">500 RWF</p>
            </div>
          </div>
          <p className="bold">
            Total Packaging Cost (For the week) = 2,500 RWF
          </p>
          <button type="button" className="add">
            <Link to="/diner/cart/payment">Add</Link>
          </button>
        </div>
        <div className="pickup"></div>
      </motion.div>
      <div className="cancel" onClick={() => cancel()}></div>
    </Container>,
    document.querySelector("#portal")
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;

  .bold {
    font-weight: 700;
  }

  .cancel {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: -100;
  }

  .content {
    width: 100%;
    height: auto;
    z-index: 1000;
    display: flex;
    border-radius: 10px 10px 0 0;
    align-items: center;
    flex-direction: column;
    background: var(--white);
    justify-content: space-around;

    .delivery {
      width: 95%;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      .top {
        width: 100%;
        height: 50px;
        margin: 10px 0 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        p {
          font-size: 1.1em;
          font-weight: 700;
        }

        button {
          background: var(--opacity);
          border-radius: 4px;
          width: 80px;
          height: 30px;
          border: none;
        }
      }

      .form {
        width: 100%;
        height: auto;
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        .box {
          height: 60px;
          display: flex;
          flex-direction: column;

          input {
            width: 90%;
            height: 30px;
            border: none;
            outline: none;
            border-bottom: 1px solid var(--opacity);
          }

          label {
            font-size: 0.9em;
          }
        }
      }

      .add {
        width: 98%;
        height: 30px;
        margin: 10px 0;
        border: none;
        border-radius: 5px;
        background: var(--gray);

        a {
          text-decoration: none;
          color: var(--black);
        }
      }
    }
  }
`;

export default Pickup;
