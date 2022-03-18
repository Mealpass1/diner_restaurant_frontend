import React from "react";
import styled from "styled-components";

import Box from "./Box";

const Container = ({ cart }) => {
  return (
    <Content>
      {cart.map((item, index) => (
        <Box item={item} key={index} />
      ))}
    </Content>
  );
};

const Content = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export default Container;
