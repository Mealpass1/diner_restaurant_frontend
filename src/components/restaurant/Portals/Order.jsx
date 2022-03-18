import React from "react";
import styled from "styled-components";

import ReactDom from "react-dom";

const Order = ({ close, product, date, months }) => {
  return ReactDom.createPortal(
    <Container>
      <div className="content">
        <div className="top">
          <div className="para">
            <p className="title">
              {product?._id.substr(0, 7)} - {product?.dish?.name}
            </p>
            <p className="status">Not transfered</p>
          </div>
          <div className="exit" onClick={() => close()}>
            <p>X</p>
          </div>
        </div>
        <img src={product?.dish?.image} alt={product?.dish?.name} />
        <div className="details">
          <div className="item">
            <p>Diner:</p>
            <p className="bold">{product?.diner?.fullname}</p>
          </div>
          <div className="item">
            <p>Restaurant:</p>
            <p className="big">{product?.restaurant?.businessName}</p>
          </div>
          <div className="item">
            <p>TimeStamp:</p>
            <p className="bold">
              Paid on:
              {`${date.getDate()}/${
                months[date.getMonth()]
              }/${date.getFullYear()}`}
            </p>
          </div>
          <div className="item">
            <p>Price:</p>
            <p className="bold">{product?.dish?.price}</p>
          </div>
          <div className="item">
            <p>Total serving:</p>
            <p className="big">
              {product?.mealServing?.unused + product?.mealServing?.used}
            </p>
          </div>
          <div className="item">
            <p>Paid amount:</p>
            <p className="bold">
              {product?.dish?.price *
                (product?.mealServing?.unused + product?.mealServing?.used)}
              RWF
            </p>
          </div>
          <div className="item">
            <p>Delivery mode:</p>
            <p className="big">{product?.deliveryMode}</p>
          </div>
          <div className="item">
            <p>Status:</p>
            <p className="bold">Not transfered</p>
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
    padding: 20px 0 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-radius: 10px;
    background: var(--white);

    img {
      width: 90%;
      height: 200px;
    }

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

      .para {
        .title {
          font-weight: bold;
        }

        .status {
          padding: 3px 5px;
          background: var(--grayish);
          border-radius: 5px;
          color: var(--bright);
        }
      }
    }

    .details {
      width: 90%;
      height: auto;
      display: flex;
      flex-direction: column;

      .item {
        width: 100%;
        height: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        p:nth-child(1) {
          width: 40%;
          font-weight: bold;
        }
      }
    }
  }
`;

export default Order;
