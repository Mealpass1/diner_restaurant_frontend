import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";

import { IoArrowBackOutline } from "react-icons/io5";

import axios from "../../features/axios";
import Layout from "../../components/diner/Layout";
import Container from "../../components/diner/boxes/explore/package/Container";

const Basket = () => {
  const location = useParams();
  const navigate = useNavigate();

  const { isLoading, data } = useQuery("package", async () => {
    return await axios
      .get(`/package/${location.package}`)
      .then((response) => response.data.data);
  });

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <Content>
        <div className="top">
          <IoArrowBackOutline onClick={goBack} />
        </div>
        <div className="bottom">
          <div className="image">
            <img src={data?.image} alt="package" />
          </div>
          <p>{data?.name} Meal Package</p>
          <p className="price">{data?.price}RWF / month</p>
        </div>
        <div className="container">
          {data?.restaurants?.map((restaurant, index) => (
            <Container
              restaurant={restaurant}
              dishes={data?.dishes}
              key={index}
            />
          ))}
        </div>
      </Content>
    </Layout>
  );
};

const Content = styled.div`
  .top {
    width: 100vw;
    height: 50px;
    padding: 0 10px;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 1.3em;
  }

  .bottom {
    width: 100vw;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0;

    .image {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      overflow: hidden;
      background: var(--gray);

      img {
        width: 100%;
      }
    }

    p {
      line-height: 20px;
    }

    p.price {
      font-weight: 700;
    }
  }
`;

export default Basket;
