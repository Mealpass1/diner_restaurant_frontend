import React, { useState } from "react";
import styled from "styled-components";

import Details from "../Portals/Request";

const Request = ({ request }) => {
  const [show, setShow] = useState(false);

  const showDetails = () => {
    setShow(!show);
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const createdAt = request?.createdAt;
  const date = new Date(createdAt);

  return (
    <Container>
      {show == true ? (
        <Details
          product={request}
          close={showDetails}
          date={date}
          months={months}
        />
      ) : (
        <></>
      )}
      <div className="top">
        <div className="select"></div>
        <div className="image">
          <img src={request?.dish?.image} alt={request?.dish?.name} />
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Request</p>
        </div>
        <div className="content">
          <p>{request._id.substr(0, 7)}</p>
          <p className="bold">{request?.dish?.name}</p>
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Diner</p>
        </div>
        <div className="content">
          <p>{request?.diner?.fullname}</p>
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Delivery mode</p>
        </div>
        <div className="content">
          <p>{request?.order?.deliveryMode}</p>
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Status</p>
        </div>
        <div className="content">
          <p className="status">{request?.status}</p>
          <p>
            Paid on: <span> </span>
            {`${date.getDate()}/${
              months[date.getMonth()]
            }/${date.getFullYear()}`}
          </p>
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Amount</p>
        </div>
        <div className="content">
          <p className="bold">{request?.quantity * request?.dish?.price}</p>
          <p>Meal serving: {request?.order?.mealServing?.unused}</p>
        </div>
      </div>
      <div className="item">
        <div className="title">
          <p>Action</p>
        </div>
        <div className="content">
          <button onClick={showDetails}>View more</button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  height: 380px;
  margin: 10px 0;
  padding: 10px 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
    inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 13px;

  .bold {
    font-weight: bold;
  }

  .status {
    padding: 2px 10px;
    background: var(--gray);
    border-radius: 20px;
    font-weight: bold;
    color: var(--bright);
  }

  .top {
    width: 95%;
    height: 50px;
    padding: 0 10px;
    margin: 0 0 10px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: none;

    .select {
      width: 8%;
      height: 80%;
      border: 2px solid var(--bright);
    }

    .image {
      width: 11%;
      height: 80%;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .item {
    width: 90%;
    height: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-top: 2px solid var(--grayish);

    .title {
      width: 40%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      font-weight: bolder;
    }

    .content {
      width: 55%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;

      button {
        width: 65%;
        height: 50%;
        border-radius: 5px;
        border: none;
        background: var(--bright);
        color: var(--white);
      }
    }
  }
`;

export default Request;
