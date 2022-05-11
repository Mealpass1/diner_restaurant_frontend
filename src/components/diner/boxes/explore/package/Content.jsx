import React, { useEffect } from 'react';
import styled from "styled-components"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { IoArrowBackOutline } from "react-icons/io5";

import Container from "./Container";
import axios from "../../../../../features/axios";
import { add, addToCart } from "../../../../../state/Reducers/Diner/Package"

const Content = ({ pack }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => {
    navigate(-1);
  };


  useEffect(() => {
    axios.get(`/packageItems/items/${pack?._id}`).then((response) => {
      dispatch(add(response.data.data));
    })
  })

  const addCart = () => {
    dispatch(addToCart())
  };

  return (<Div>
    <div className="top">
      <IoArrowBackOutline onClick={goBack} />
    </div>
    <div className="bottom">
      <div className="image">
        <img src={pack?.image} alt="package" />
      </div>
      <p>{pack?.name} Meal Package</p>
      <p className="price">{pack?.price}RWF / month</p>
    </div>
    <div className="add" onClick={addCart}>
      <p>Add to cart</p>
    </div>
    <div className="container">
      {pack?.restaurants?.map((restaurant, index) => (
        <Container
          restaurant={restaurant}
          key={index}
        />
      ))}
    </div>
  </Div>);
}

const Div = styled.div`
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

  .add {
    width: 100px;
    height: 30px;
    margin: auto;
    border-radius: 3px;
    background: var(--bright);
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default Content;