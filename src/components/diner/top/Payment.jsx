import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

import { IoArrowBackOutline } from "react-icons/io5";

const Top = () => {
  const router = useNavigate();

  const goBack = () => {
    router(-1);
  };

  return (
    <Container>
      <div className="top" onClick={goBack}>
        <IoArrowBackOutline />
      </div>
      <div className="down">
        <p>Checkout</p>
        <img src="/logo.svg" alt="logo" />
        <div className="space"></div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .top {
    width: 100%;
    height: 50px;
    padding: 0 10px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
  }

  .down {
    width: 100%;
    height: 70px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 60px;
    }

    .space {
      width: 15%;
    }

    p {
      font-size: 1.3em;
      font-weight: 700;
    }
  }
`;

export default Top;
