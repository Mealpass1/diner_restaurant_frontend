import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Dish from "./Dish";
import Package from "./Package";

const Container = (props) => {
  const cart = useSelector((state) => state.diner.cart.cart);

  return (
    <Content>
      {cart?.map((item, index) => (
        <React.Fragment key={index}>
          {item.type === "dish" ? (
            <>
              <Dish item={item} delete={props.delete} reflesh={props.reflesh} />
            </>
          ) : (
            <>
              <Package
                item={item}
                delete={props.delete}
                reflesh={props.reflesh}
              />
            </>
          )}
        </React.Fragment>
      ))}
    </Content>
  );
};

const Content = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 0px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export default Container;
