import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { IoArrowBackOutline } from "react-icons/io5";

import CartIcon from "../icons/Cart";

const Top = ({ name, image, description }) => {
  const router = useNavigate();

  const goBack = () => {
    router("/diner/recipes");
  };

  return (
    <Container>
      <div className="back">
        <div onClick={goBack}>
          <IoArrowBackOutline />
        </div>
      </div>
      <div className="company">
        <div className="logo">
          <img src={image} alt="Logo" />
        </div>
        <p className="title">welcome to {name}</p>
        <p className="para">{description}.</p>
      </div>
      <div className="cart">
        <CartIcon />
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100vw;
  height: 175px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  .back {
    width: 15%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    font-size: 1.8em;
  }

  .company {
    width: 60%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .logo {
      width: 75px;
      height: 75px;
      margin: 0 0 5px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    p.para {
      text-align: center;
      line-height: 1em;
    }

    p.title {
      text-align: center;
      font-weight: bold;
      font-size: 1.1em;
      text-transform: uppercase;
      margin: 0 0 5px 0;
    }
  }

  .cart {
    width: 15%;
    height: 80%;
  }
`;

export default Top;
