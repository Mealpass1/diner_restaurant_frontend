import React from "react";
import styled from "styled-components";

import Box from "./Box";

const Container = ({ restaurant, text, type }) => {
  return (
    <Content>
      <div className="title">
        <p>{restaurant[0]?.restaurant?.businessName}</p>
      </div>
      <div className="container">
        <div className="scroll">
          {restaurant?.map((product, index) => (
            <Box
              cartItem={product}
              key={index}
              restaurant={restaurant}
              text={text}
              type={type}
            />
          ))}
        </div>
      </div>
    </Content>
  );
};

const Content = styled.div`
  width: auto;
  height: auto;

  .container {
    width: auto;
    height: 180px;
    margin: 10px 0 0 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    font-size: 12px;

    ::-webkit-scrollbar {
      display: none;
    }

    .scroll {
      width: auto;
      height: 180px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      overflow: scroll;
      -ms-overflow-style: none;
      scrollbar-width: none;

      ::-webkit-scrollbar {
        display: none;
      }
    }
  }

  .title {
    width: 100%;
    height: 20px;
    margin: 15px 0 0 5px;
    padding: 0 10px 0 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    p {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }

    p:first-child {
      text-transform: capitalize;
      font-weight: 700;
    }
  }
`;

export default Container;
