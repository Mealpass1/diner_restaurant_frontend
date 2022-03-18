import React from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";

import { AiOutlineRight } from "react-icons/ai";

import Box from "./Box";

const Container = ({ restaurant }) => {
  const push = useNavigate();
  const { pathname } = useLocation();

  const goToRestaurant = () => {
    push(`${pathname}/${restaurant._id}`);
  };

  return (
    <Content>
      <div className="title">
        <p>{restaurant.businessName}</p>
        <p onClick={goToRestaurant}>
          See All <AiOutlineRight />
        </p>
      </div>
      <div className="container">
        <div className="scroll">
          {restaurant.dishes.length > 0 ? (
            restaurant.dishes.map((product, index) => (
              <Box product={product} restaurant={restaurant._id} key={index} />
            ))
          ) : (
            <p className="no_dishes">No dishes yet</p>
          )}
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
    height: 180px;
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
      height: 180px;
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
