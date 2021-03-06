import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const Box = ({ basket }) => {
  const navigate = useNavigate();

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

  const goToBasket = () => {
    navigate(`/diner/explore/${basket._id}`);
  };

  return (
    <Container>
      <motion.div className="container">
        <div className="top">
          <div className="image">
            <img src={basket?.image} alt="basket" />
          </div>
          <div className="para">
            <p className="bold">{basket?.name} Meal Package</p>
            <p>{basket?.price}RWF / month</p>
          </div>
        </div>
        <div className="contains">
          <p className="title">Contains:</p>
          <ul>
            <li>
              <p className="number">{basket?.mealServing}</p>
              <p className="description">Total Meal Serving</p>
            </li>
            <li>
              <p className="number">{basket?.restaurants?.length}</p>
              <p className="description">Restaurants to Eat From</p>
            </li>
            <li>
              <p className="number">{basket?.dishes}</p>
              <p className="description">Meal Menu</p>
            </li>
          </ul>
        </div>
        <button onClick={goToBasket}>View More</button>
      </motion.div>
    </Container>
  );
};

const Container = styled.div`
  width: 95%;
  margin: 10px 0;
  height: auto;

  .container {
    width: 100%;
    height: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 10px 0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
      inset 0px 4px 4px rgba(0, 0, 0, 0.25);

    p.bold {
      font-weight: 700;
    }

    .top {
      width: 95%;
      height: 30%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .image {
        width: 30%;
        height: 100%;
        overflow: hidden;
        border-radius: 50%;

        img {
          width: 100%;
        }
      }

      .para {
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }

    .contains {
      width: 95%;
      height: 60%;
      display: flex;
      flex-direction: column;
      align-items: center;

      p.title {
        text-decoration: underline;
      }

      ul {
        width: 95%;
        padding: 20px 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        li {
          width: 100%;
          margin: 7px 0;
          display: flex;

          p.number {
            padding: 2px 10px;
            margin: 0 10px 0 0;
            border-radius: 5px;
            background: var(--opacity);
          }
        }
      }
    }

    button {
      width: 110px;
      height: 30px;
      border-radius: 5px;
      border: none;
      background: var(--bright);
    }
  }
`;

export default Box;
