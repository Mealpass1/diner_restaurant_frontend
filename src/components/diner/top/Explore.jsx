import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { IoSettingsOutline } from "react-icons/io5";

import CartIcon from "../icons/Cart";

const Explore = () => {
  const router = useNavigate();

  const goToSettings = () => {
    router("/diner/settings");
  };

  return (
    <Container>
      <div className="settings">
        <div onClick={goToSettings}>
          <IoSettingsOutline />
        </div>
      </div>
      <div className="company">
        <div className="logo">
          <img src="/logo.svg" alt="Logo" />
        </div>
        <p>welcome to mealpass</p>
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
  height: 160px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  .cart {
    width: 15%;
    height: 80%;
  }

  .settings {
    width: 15%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    font-size: 1.5em;
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
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bright);
      border-radius: 50%;

      img {
        width: 70%;
        height: 70%;
      }
    }

    p {
      text-transform: uppercase;
      font-weight: bold;
      line-height: 30px;
    }
  }
`;

export default Explore;
