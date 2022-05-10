import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router";

import { motion } from "framer-motion";

const Box = ({ dish }) => {
  const router = useNavigate();
  const location = useLocation();

  const goToProduct = () => {
    router(`${location.pathname}/${dish._id}`);
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

  return (
    <Container>
      <motion.div
        className="box"
        onClick={goToProduct}
        variants={variants}
        initial="initial"
        animate="visible"
      >
        <div className="image">
          <img src={dish?.dish?.image} alt={dish?.dish?.name} />
        </div>
        <p className="title">{dish?.dish?.name}</p>
        <p>
          Meal Serving <span>({dish?.mealServing})</span>
        </p>
      </motion.div>
    </Container>
  );
};

const Container = styled.div`
  width: auto;
  height: auto;

  .box {
    width: 180px;
    height: 180px;
    overflow: hidden;
    border-radius: 10px;
    margin: 0px 10px 0 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    .image {
      width: 180px;
      height: 150px;
      border-radius: 10px;
      overflow: hidden;
    }

    .image img {
      width: 100%;
      border-radius: 10px;
    }

    p {
      margin: 0 0 0 2px;
      font-size: 12px;

      span {
        color: var(--red);
      }
    }

    .title {
      line-height: 25px;
      font-weight: bold;
      text-transform: capitalize;
    }
  }
`;

export default Box;
