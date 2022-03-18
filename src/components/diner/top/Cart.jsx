import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { IoArrowBackOutline, IoSettingsOutline } from "react-icons/io5";

const Top = ({ items }) => {
  const router = useNavigate();

  const goBack = () => {
    router(-1);
  };

  const goToSettings = () => {
    router("/diner/settings");
  };

  return (
    <Container>
      <div className="top">
        <div className="back" onClick={goBack}>
          <IoArrowBackOutline />
        </div>
        <div className="settings" onClick={goToSettings}>
          <IoSettingsOutline />
        </div>
      </div>
      <div className="bottom">
        <div className="one">
          <p>My Cart</p>
        </div>
        <div className="logo">
          <img src="/logo.svg" alt="logo" />
        </div>
        <div className="two">
          <p>{items} items in cart</p>
        </div>
        <div className="three">
          <p>
            <span>Note: </span>
            Meal Serving = Your Order Quantity x Your Days per week x Repeat
            Weeks per month
          </p>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: auto;
  height: auto;

  .top {
    width: 100vw;
    height: 50px;
    padding: 0 10px;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .back {
      font-size: 1.3em;
    }

    .settings {
      font-size: 1.6em;
    }
  }
  .bottom {
    width: 100%;
    height: 150px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      "one logo two"
      "three three three";

    div {
      width: 95%;
      margin: auto;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    .one {
      grid-area: one;
      font-weight: bold;
    }

    .logo {
      grid-area: logo;

      img {
        width: 60%;
        height: 100%;
      }
    }

    .two {
      grid-area: two;
    }

    .three {
      grid-area: three;
      text-align: center;
      padding: 0 10px;
      border-bottom: 1px solid black;

      p {
        span {
          color: var(--bright);
          font-weight: bold;
        }
      }
    }
  }
`;

export default Top;
