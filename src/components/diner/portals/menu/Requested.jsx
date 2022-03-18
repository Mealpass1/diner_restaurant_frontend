import React from "react";
import ReactDom from "react-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

import { MdDone } from "react-icons/md";

const Order = ({ cancel }) => {
  const variants = {
    initial: {
      scale: 0.1,
    },
    visible: {
      scale: 1,
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
        <div className="success">
          <div className="done">
            <MdDone />
          </div>
          <p className="capital">Successful</p>
        </div>
        <p className="capital">
          Your
          <span> meal request </span>
          is successful
        </p>
        <p>thanks for requesting!!!</p>
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
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;

  .capital {
    text-transform: uppercase !important;
  }

  .cancel {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: -100;
  }

  .content {
    width: 90vw;
    height: 35vh;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 10px;
    background: var(--white);

    .success {
      width: 100%;
      height: 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      .done {
        width: 45px;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2em;
        color: var(--edit);
        border-radius: 50%;
        border: 2px solid var(--edit);
      }
    }

    p {
      text-transform: capitalize;
      text-align: center;
      font-weight: bold;

      span {
        font-weight: bolder;
      }
    }
  }
`;

export default Order;
