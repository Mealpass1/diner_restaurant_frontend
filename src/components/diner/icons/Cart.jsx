import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { FaShoppingCart } from "react-icons/fa";

const CartIcon = () => {
  const router = useNavigate();

  const goToCart = () => {
    router("/diner/cart");
  };

  return (
    <Container onClick={goToCart}>
      <FaShoppingCart />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  font-size: 1.5em;
`;

export default CartIcon;
