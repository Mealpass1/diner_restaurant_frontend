import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

import { IoSettingsOutline } from "react-icons/io5";

const Top = () => {
  const router = useNavigate();

  const goToSettings = () => {
    router("/diner/settings");
  };

  return (
    <Container>
      <div className="title">
        <p>Messages</p>
      </div>
      <div className="settings" onClick={goToSettings}>
        <IoSettingsOutline />
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  background: var(--grayish);

  .title {
    width: 60%;
    height: 40px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .settings {
    width: 20%;
    height: 40px;
    font-size: 1.8em;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default Top;
