import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { AiOutlinePlus } from "react-icons/ai";
import { BiMinus } from "react-icons/bi";

const Box = ({ product }) => {
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

  return (
    <motion.div variants={variants} initial="initial" animate="visible">
      <Container>
        <div className="image">
          <img src={product.image} alt={product.title} />
          <p>
            <span>From: </span> Java House
          </p>
        </div>
        <div className="about">
          <div className="title">
            <p>{product.title}</p>
            <div className="p1">
              <p>{product.price} RWF</p>
              <p>(10%Off)</p>
            </div>
          </div>
          <div className="serving">
            <div className="para">
              <p>Meal Serving</p>
              <p>For a Month</p>
            </div>
            <div className="amount">
              <div className="plus">
                <AiOutlinePlus />
              </div>
              <p>{item.amount}</p>
              <div className="minus">
                <BiMinus />
              </div>
            </div>
          </div>
          <div className="delivery">
            <div className="para">
              <p>Meal Delivery</p>
              <p>For a Month</p>
            </div>
            <div className="p2">
              <Delivery mode={item.deliveryMode} />
            </div>
            <div className="right">
              <div className="settings"></div>
              <div className="total">
                <p>Sub-Total</p>
                <p>65,000RWF</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

const Container = styled.div`
  width: 99%;
  height: 170px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
    inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 10px 0;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .image {
    width: 80px;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-radius: 15px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }

    p {
      text-align: center;

      span {
        font-weight: bold;
      }
    }
  }

  .about {
    width: 69%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;

    .title {
      font-weight: bold;
      width: 80%;
      height: fit-content;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;

      .p1 {
        width: 80%;
        height: fit-content;
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
  }
`;

export default Box;
