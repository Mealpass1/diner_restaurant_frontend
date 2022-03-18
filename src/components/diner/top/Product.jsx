import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

import { IoArrowBackOutline } from "react-icons/io5";

import CartIcon from "../icons/Cart";

const Top = () => {
  const router = useNavigate();

  const goBack = () => {
    router(-1);
  };

  return (
    <Container>
      <div className="icons">
        <div className="back" onClick={goBack}>
          <IoArrowBackOutline />
        </div>
        <div className="cart">
          <CartIcon />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  z-index: 1000;
  top: 0;
  width: 100%;
  height: 40px;

  .icons {
    width: 90%;
    height: 40px;
    margin: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    z-index: 1;

    .back {
      font-size: 1.8em;
      color: var(--black);
    }

    .cart {
      width: 20px;
    }
  }
`;

export default Top;
