import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Box from "./Box";

const Container = ({ restaurant }) => {
  const data = useSelector((state) =>
    state.diner.package.dishes?.filter((d) => d.restaurant === restaurant.id)
  );

  return (
    <Content>
      <div className="title">
        <p>{restaurant?.name}</p>
      </div>
      <div className="container">
        <div className="scroll">
          {data?.map((product, index) => (
            <Box dish={product} key={index} />
          ))}
        </div>
      </div>
    </Content>
  );
};

const Content = styled.section`
  height: auto;
  width: auto;

  .container {
    width: auto;
    height: 200px;
    margin: 10px 0 0 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    .no_dishes {
      text-align: center;
      text-transform: capitalize;
      font-size: small;
    }

    .scroll {
      width: auto;
      height: 200px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      overflow: scroll;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .scroll::-webkit-scrollbar {
      display: none;
    }
  }

  .container::-webkit-scrollbar {
    display: none;
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
