import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { useQuery } from "react-query";

import { AiOutlineRight } from "react-icons/ai";

import axios from "../../../../features/axios";

import Box from "./Box";

const Container = ({ restaurant }) => {
  const push = useNavigate();
  const { pathname } = useLocation();
  const [token, setToken] = useState("");

  const goToRestaurant = () => {
    push(`${pathname}/${restaurant._id}`);
  };

  const { isLoading, data } = useQuery(
    `${restaurant.businessName}_dishes`,
    async () => {
      return await axios
        .get(`/dish/restaurant/${restaurant._id}`)
        .then((res) => res.data);
    }
  );

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);
  }, []);

  return (
    <Content>
      <div className="title">
        <p>{restaurant.businessName}</p>
        <p onClick={goToRestaurant}>
          See All <AiOutlineRight />
        </p>
      </div>
      <div className="container">
        {data?.data?.length > 0 ? (
          <div className="scroll">
            {data?.data?.map((product, index) => (
              <Box product={product} restaurant={restaurant._id} key={index} />
            ))}
          </div>
        ) : (
          <p className="no_dishes">No dishes yet</p>
        )}
      </div>
    </Content>
  );
};

const Content = styled.section`
  height: auto;
  width: auto;

  .container {
    width: auto;
    height: auto;
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
