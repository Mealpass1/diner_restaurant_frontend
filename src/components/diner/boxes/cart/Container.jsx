import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Box from "./Box";

const Container = (props) => {
  const cart = useSelector((state) => state.diner.cart.cart);

  return (
    <Content>
      {cart?.map((item, index) => (
        <Box item={item} key={index} delete={props.delete} />
      ))}
    </Content>
  );
};

const Content = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export default Container;
