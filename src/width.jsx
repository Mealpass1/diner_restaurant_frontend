import React from "react";
import styled from "styled-components";

const Width = () => {
  return (
    <Container>
      <p>
        😢Desktop device version still in development, please use your mobile
        device😢
      </p>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default Width;
