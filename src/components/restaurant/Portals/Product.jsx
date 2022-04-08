//packages
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ReactDom from "react-dom";
import styled from "styled-components";

import axios from "../../../features/axios";

const Details = ({ product, close }) => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const deleteDish = () => {
    setLoading(true);
    axios
      .delete(`/dish/${product._id}`, { headers: { auth: `${token}` } })
      .then((response) => {
        setLoading(false);
        if (response.data.status === "error") {
          toast.error(response.data.message, {
            toastId: "customId",
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        } else {
          toast.success("Dish deleted", {
            toastId: "customId",
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        }
      });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);
  }, []);

  return ReactDom.createPortal(
    <Container>
      <div className="content">
        <div className="top">
          <div className="para">
            <p className="title">
              ProductId {product?._id?.substr(0, 9)} - {product?.name}
            </p>
          </div>
          <div className="exit" onClick={() => close()}>
            <p>X</p>
          </div>
        </div>
        <div className="image">
          <img src={product?.image} alt={product?.name} />
          <div className="button">
            <button className="delete" onClick={deleteDish}>
              {loading ? <img src="/loader.svg" alt="loader" /> : <p>Delete</p>}
            </button>
            <button className="edit">Edit</button>
          </div>
        </div>
        <div className="details">
          <div className="detail">
            <p>Product Details</p>
            <div className="item">
              <p>Title:</p>
              <p className="bold">{product?.name}</p>
            </div>
            <div className="item">
              <p>Price:</p>
              <p className="big">{product?.price} RWF</p>
            </div>
            <div className="item">
              <p>Description:</p>
              <p className="bold">{product?.description?.substr(0, 30)}...</p>
            </div>
          </div>
          <div className="detail">
            <p>Upfront Booking</p>
            <div className="item">
              <p>Paid Upfront:</p>
              <p className="bold">{product?.sales?.diners || 0} Paid Diners</p>
            </div>
          </div>
          <div className="detail">
            <p>Booking Stats</p>
            <div className="item">
              <p>Used:</p>
              <p className="bold">{product?.stats?.used || 0} Meals</p>
            </div>
            <div className="item">
              <p>Un-Used:</p>
              <p className="bold">{product?.stats?.unused || 0} Meals</p>
            </div>
            <div className="item">
              <p>Total Meal Serving:</p>
              <p className="bold">{product?.stats?.total || 0} Meals</p>
            </div>
          </div>
          <div className="detail">
            <p>Category</p>
            <div className="item">
              <p>{product?.category}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="cancel" onClick={() => close()}></div>
    </Container>,
    document.querySelector("#portal")
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
  position: fixed;
  top: 0;

  .cancel {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: -100;
  }

  .content {
    width: 90vw;
    height: 95vh;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background: var(--white);

    .top {
      width: 90%;
      height: 50px;
      border-bottom: 2px solid var(--black);
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .exit {
        width: 25px;
        height: 25px;
        font-weight: bold;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid black;
      }

      .title {
        font-weight: bold;
        font-size: 1.2em;
      }
    }

    .image {
      width: 90%;
      height: 230px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      img {
        width: 100%;
      }

      .button {
        width: 80%;
        height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        button {
          width: 80px;
          height: 25px;
          border: none;
          color: var(--white);
          border-radius: 5px;
        }

        .delete {
          background: red;
        }

        .edit {
          background: var(--edit);
        }
      }
    }

    .details {
      width: 90%;
      height: auto;
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      .detail {
        width: 100%;
        height: auto;
        margin: 5px 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        > p:nth-child(1) {
          font-weight: bold;
          color: var(--bright);
          text-decoration: underline;
        }

        .item {
          width: 100%;
          height: 40px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;

          p:nth-child(1) {
            font-weight: bold;
          }

          .big {
            padding: 1px 8px;
            border-radius: 5px;
            background: var(--bright);
            color: var(--white);
          }
        }
      }
    }
  }
`;

export default Details;
