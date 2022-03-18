import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { FaUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

import axios from "../../../features/axios";

import CartIcon from "../icons/Cart";

const Top = () => {
  const router = useNavigate();
  const [data, setData] = useState({});

  const goToSettings = () => {
    router("/diner/settings");
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios.get(`/diner/`, { headers: { auth: `${token}` } }).then((response) => {
      setData(response.data.data);
    });
  }, []);

  return (
    <Container>
      <div className="settings">
        <div onClick={goToSettings}>
          <IoSettingsOutline />
        </div>
      </div>
      <div className="company">
        <div className="logo">
          <FaUserCircle />
        </div>
        <p>@{data?.username}</p>
        <p>YOUR UNIQUE MEALPASS MENU</p>
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
  font-size: 12px;

  .settings {
    width: 15%;
    height: 80%;
    display: flex;
    flex-direction: column;
    font-size: 1.6em;
    align-items: center;
    justify-content: flex-start;
  }

  .company {
    width: 60%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .logo {
      width: 60px;
      height: 60px;
      font-size: 3.5em;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--grayish);
      border-radius: 50%;
    }

    p {
      text-transform: uppercase;
      font-weight: bold;
      line-height: 30px;
    }
  }

  .cart {
    width: 15%;
    height: 80%;
  }
`;

export default Top;
