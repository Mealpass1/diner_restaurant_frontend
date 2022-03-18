import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

import axios from "../../../features/axios";

import { IoSettingsOutline } from "react-icons/io5";

const Top = () => {
  const [data, setData] = useState({});
  const router = useNavigate();

  const goToSettings = () => {
    router("/diner/settings");
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios.get(`/diner`, { headers: { auth: `${token}` } }).then((response) => {
      setData(response.data.data);
    });
  }, []);

  const names = data?.fullname?.split(" ");

  return (
    <Container>
      <div className="top">
        <div className="settings" onClick={goToSettings}>
          <IoSettingsOutline />
        </div>
      </div>
      <div className="about">
        <div className="sticker">
          {names?.map((letter, index) => (
            <p key={index}>{letter[0]}</p>
          ))}
        </div>
        <div className="para">
          <p className="at">@{data?.email?.split("@")[0]}</p>
          <p className="name">{data?.fullname}</p>
          <p>E-mail: {data?.email}</p>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 220px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .top {
    width: 100%;
    height: 50%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    background: url("/images/cover.png");

    .settings {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--black);
      border-radius: 50%;
      color: var(--white);
      font-size: 1.8em;
    }
  }

  .about {
    width: 100%;
    height: 50%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .sticker {
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      position: absolute;
      top: -40px;
      background: var(--opacity);

      p {
        font-weight: bold;
        text-transform: uppercase;
      }
    }

    .para {
      margin-top: 45px;
      text-align: center;

      .name {
        font-weight: bold;
        text-transform: capitalize;
      }
    }
  }
`;

export default Top;
