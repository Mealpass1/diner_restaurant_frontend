import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import styled from "styled-components";
import _ from "lodash";

const Box = ({ cartItem, restaurant, text, type }) => {
  const router = useNavigate();

  const goToProduct = () => {
    router(`/diner/menu/${cartItem.restaurant._id}/${cartItem._id}/${type}`);
  };

  const variants = {
    initial: {
      x: 20,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.5,
        staggerChildren: 1,
      },
    },
  };

  const shared = cartItem?.sharing?.map((one) => {
    return one.quantity;
  });

  return (
    <Container>
      <motion.div
        className="box"
        onClick={goToProduct}
        variants={variants}
        initial="initial"
        animate="visible"
      >
        {cartItem?.invite ? (
          <>
            <div className="invite">shared</div>
            <img src={cartItem?.dish?.image} alt={cartItem?.dish?.name} />
            <p className="bold">{cartItem?.dish?.name}</p>
            <p>
              {text == "Meal Serving"
                ? `Meal Serving(${cartItem?.invite?.quantity})`
                : ""}
            </p>
          </>
        ) : (
          <>
            <img src={cartItem?.dish?.image} alt={cartItem?.dish?.name} />
            <p className="bold">{cartItem?.dish?.name}</p>
            <p>
              {text == "Meal Serving"
                ? `Meal Serving(${cartItem?.order?.mealServing?.unused})`
                : ""}
              {text == "Shared Serving"
                ? `Shared Serving(${_.sum(shared)})`
                : ""}
              {text == "Used Serving"
                ? `Used Serving(${cartItem?.usage?.length})`
                : ""}
            </p>
          </>
        )}
      </motion.div>
    </Container>
  );
};

const Container = styled.div`
  .box {
    width: 150px;
    height: 180px;
    position: relative;
    border-radius: 10px;
    margin: 0px 10px 0 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    img {
      width: 100%;
      height: 150px;
      margin: 0 0 2px 0;
    }

    .invite {
      position: absolute;
      top: 0;
      right: 0;
      padding: 5px 10px;
      background: var(--bright);
    }

    .bold {
      font-weight: bold;
    }

    p {
      margin: 2px 0;

      span {
        color: var(--bright);
      }
    }
  }
`;

export default Box;
