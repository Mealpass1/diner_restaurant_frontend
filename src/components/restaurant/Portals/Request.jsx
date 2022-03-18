import React from "react";
import styled from "styled-components";

import ReactDom from "react-dom";

const Request = ({ product, close, date, months }) => {
  return ReactDom.createPortal(
    <Container>
      <div className="content">
        <div className="top">
          <div className="para">
            <p className="title">
              {product?._id.substr(0, 7)} - {product?.dish?.name}
            </p>
            <p className="status">{product?.status}</p>
          </div>
          <div className="exit" onClick={() => close()}>
            <p>X</p>
          </div>
        </div>
        <img src={product?.dish?.image} alt={product?.dish?.name} />
        <div className="details">
          <div className="detail">
            <p>Product Details</p>
            <div className="item">
              <p>Title:</p>
              <p className="bold">{product?.dish?.name}</p>
            </div>
            <div className="item">
              <p>Price:</p>
              <p className="big">{product?.dish?.price} RWF</p>
            </div>
            <div className="item">
              <p>Quantiry:</p>
              <p className="bold">{product?.quantity}</p>
            </div>
          </div>
          <div className="detail">
            <p>Shipping Details</p>
            <div className="item">
              <p>Delivery Mode:</p>
              <p className="bold">{product?.order?.deliveryMode}</p>
            </div>
          </div>
          <div className="detail">
            <p>Order Details</p>
            <div className="item">
              <p>Date:</p>
              <p className="bold">
                {`${date.getDate()}/${
                  months[date.getMonth()]
                }/${date.getFullYear()}`}
              </p>
            </div>
          </div>
          <div className="detail">
            <p>Diner details:</p>
            <div className="item">
              <p>Diner name:</p>
              <p className="bold">{product?.diner?.fullname}</p>
            </div>
            <div className="item">
              <p>Username:</p>
              <p className="bold">{product?.diner?.username}</p>
            </div>
          </div>
        </div>
        <div className="last">
          <select name="type" id="type">
            <option value="progress">In-Progress</option>
          </select>
          <button>Update Order</button>
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
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);

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

    img {
      width: 90%;
      height: 200px;
    }

    .top {
      width: 90%;
      height: 80px;
      border-bottom: 2px solid var(--black);
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .para {
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .title {
          width: 60%;
        }

        .status {
          padding: 1px 8px;
          border-radius: 5px;
          background: var(--bright);
          color: var(--white);
        }
      }

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

        > p {
          text-decoration: underline;
          font-weight: bold;
          color: var(--bright);
        }

        .item {
          width: 100%;
          height: 50px;
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

    .last {
      width: 90%;
      height: 30%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;

      button {
        width: 40%;
        height: 31px;
        margin-bottom: 5px;
        border: none;
        border-radius: 5px;
        background: var(--bright);
        color: white;
      }

      select {
        width: 40%;
        height: 30px;
        text-align: center;
        background: transparent;
        border: 1px solid var(--edit);
        border-radius: 5px;
      }
    }
  }
`;

export default Request;
