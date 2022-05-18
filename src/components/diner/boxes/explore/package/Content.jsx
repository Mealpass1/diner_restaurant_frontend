import styled from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IoArrowBackOutline } from "react-icons/io5";

import Container from "./Container";
import axios from "../../../../../features/axios";
import { add } from "../../../../../state/Reducers/Diner/Package";

const Content = ({ pack }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);

    axios.get(`/packageItems/items/${pack?._id}`).then((response) => {
      dispatch(add(response.data.data));
    });
  }, []);

  const state = useSelector((state) => state.diner.package);

  const addCart = () => {
    setLoading(true);
    const dishesIds = state.dishes.map((dish) => dish._id);
    const restaurantsIds = pack.restaurants.map((restaurant) => restaurant._id);
    axios
      .post(
        "/cart/package",
        {
          dishes: dishesIds,
          package: pack._id,
          subTotal: state.subTotal,
          restaurants: restaurantsIds,
          mealServing: state.mealServing,
        },
        { headers: { auth: token } }
      )
      .then((response) => {
        setLoading(false);
        if (response.data.status === "success") {
          toast.success("Package added to cart", {
            toastId: "customId",
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        } else {
          toast.error("Something went wrong", {
            toastId: "customId",
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        }
      });
  };

  return (
    <Div>
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
        {loading ? <img src="/loader.svg" alt="loader" /> : <p>Add to cart</p>}
      </div>
      <div className="container">
        {pack?.restaurants?.map((restaurant, index) => (
          <Container restaurant={restaurant} key={index} />
        ))}
      </div>
    </Div>
  );
};

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

    img {
      width: 30px;
    }
  }
`;

export default Content;
