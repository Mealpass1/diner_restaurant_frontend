import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { FaShoppingCart } from "react-icons/fa";

import Layout from "../../../components/diner/Layout";
import Top from "../../../components/diner/top/Product";
import Share from "../../../components/diner/portals/menu/Share";
import Requested from "../../../components/diner/portals/menu/Requested";
import Shared from "../../../components/diner/portals/menu/Shared";

import axios from "../../../features/axios";

const MenuItem = () => {
  const query = useParams();
  const [shareSuccess, setShareSuccess] = useState(false);
  const [token, setToken] = useState("");
  const [order, setOrder] = useState(false);
  const [share, setShare] = useState(false);
  const [data, setData] = useState({});
  const [requestLoading, setRequestLoading] = useState(false);

  const daysOfWeek = useSelector((state) => state.admin.state.daysOfWeek);
  const deliveryMode = useSelector((state) => state.admin.state.deliveryMode);
  const repeatsInMonth = useSelector(
    (state) => state.admin.state.repeatsInMonth
  );
  const timeOfMeal = useSelector((state) => state.admin.state.timeOfMeal);

  const sendRequest = () => {
    setRequestLoading(true);
    const { id } = jwt_decode(token);

    if (data.order.mealServing.unused === 0) {
      toast.error("Your meal servings are over...", {
        toastId: "customId",
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else {
      axios
        .post(
          "/request/add",
          {
            diner: id,
            menu: data._id,
            dish: data.dish._id,
            order: data.order._id,
            restaurant: data.restaurant._id,
          },
          { headers: { auth: `${token}` } }
        )
        .then((response) => {
          setRequestLoading(false);

          if (response.data.status === "error") {
            toast.error("please try again...", {
              toastId: "customId",
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });
          } else {
            setOrder(!order);
          }
        })
        .catch((error) => {
          setRequestLoading(false);
          console.log(error);
        });
    }
  };

  const openRequest = () => {
    setOrder(!order);
  };

  const openShare = () => {
    setShare(!share);
  };

  const openShareSuccess = () => {
    setShareSuccess(!shareSuccess);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);

    axios
      .get(`/menu/${query.product}`, { headers: { auth: `${token}` } })
      .then((response) => {
        if (response.data.status === "error") {
          console.log(response.data.message);
        } else {
          setData(response.data.data);
        }
      });
  }, [query.product]);

  return (
    <Layout>
      {share === true ? (
        <Share
          cancel={openShare}
          success={openShareSuccess}
          order={data.order._id}
          dish={data.dish._id}
          restaurant={data.restaurant._id}
        />
      ) : (
        <></>
      )}
      {order === true ? <Requested cancel={openRequest} /> : <></>}
      {shareSuccess === true ? <Shared cancel={openShareSuccess} /> : <></>}
      <Top />
      <Image src={data?.dish?.image} alt={data?.dish?.name} />
      <Content>
        <div className="title">
          {data?.invite ? (
            <>
              <p>
                {data?.dish?.name} from <span>{data?.invite?.from}</span>
              </p>
            </>
          ) : (
            <>
              <p>{data?.dish?.name}</p>
            </>
          )}
          <p>{data?.dish?.price} RWF</p>
        </div>
        <div className="description">
          <p className="bolder">Decription</p>
          <p>{data?.dish?.description}</p>
          <div className="amount">
            {data?.invite ? (
              <>
                <p>
                  Shared meal serving =<span>{data?.invite?.quantity}</span>
                </p>
              </>
            ) : (
              <>
                <p>
                  Remaining meal serving =
                  <span>{data?.order?.mealServing?.unused}</span>
                </p>
              </>
            )}
          </div>
        </div>
        {data?.invite ? (
          <></>
        ) : (
          <>
            <div className="line"></div>
            <div className="items">
              <div className="share">
                <button onClick={openShare}>Meal Share</button>
                <p>
                  Invite a friend or family to use your MealPass for this meal
                </p>
              </div>
            </div>
          </>
        )}
        <div className="line"></div>
        <div className="info">
          <p className="bolder">More information</p>
          <div className="real">
            <div className="one">
              <p className="bold">1. What time of meal?</p>
              <select name="time">
                {timeOfMeal.map((time, index) => (
                  <option value={time} key={index}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="two">
              <p className="bold">2. which days in a week?</p>
              <div className="days">
                {data?.order?.daysInWeek?.map((one, index) => (
                  <div className="row" key={index}>
                    <div className="day">
                      <input
                        type="checkbox"
                        name={one}
                        id={one}
                        value={one}
                        checked={true}
                      />
                      <label htmlFor={one}>{one}</label>
                    </div>
                    <div className="chnage">
                      <select name="days" id="days">
                        <option value="noen">change</option>
                        {daysOfWeek.map((day, index) => (
                          <option value={day} key={index}>
                            {day}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="three">
              <p className="bold">3. which delivery mode?</p>
              {deliveryMode.map((mode, index) =>
                data?.order?.deliveryMode === mode.mode ? (
                  <div className="mode" key={index}>
                    <input
                      type="radio"
                      name="mode"
                      id={mode.mode}
                      checked={true}
                    />
                    <label htmlFor={mode.mode}>
                      {mode.mode} {mode.price > 0 ? `= ${mode.price}` : ""}
                    </label>
                  </div>
                ) : (
                  <div className="mode" key={index}>
                    <input type="radio" name={mode.mode} id={mode.mode} />
                    <label htmlFor={mode.mode}>
                      {mode.mode} {mode.price > 0 ? `= ${mode.price}` : ""}
                    </label>
                  </div>
                )
              )}
            </div>
            <div className="four">
              <p className="bold">4. How many repeat in a month?</p>
              <select name="time">
                {repeatsInMonth.map((one, index) => (
                  <option
                    value={one.value}
                    key={index}
                    selected={data?.order?.repeatsInMonth === one.value}
                  >
                    {one.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="add" onClick={sendRequest}>
          {requestLoading ? (
            <img src="/loader.svg" alt="loader" />
          ) : (
            <React.Fragment>
              <FaShoppingCart />
              <p>Request for Meal</p>
            </React.Fragment>
          )}
        </div>
      </Content>
    </Layout>
  );
};

const Image = styled.img`
  width: 100%;
  height: 250px;
`;
const Content = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .bold {
    font-weight: bold;
    text-transform: capitalize;
    grid-area: bold;
  }

  span {
    padding: 3px 5px;
    background: var(--gray);
  }

  .bolder {
    font-weight: bold;
    text-transform: capitalize;
    text-decoration: underline;
  }

  .title {
    width: 100%;
    height: 35px;
    margin: 10px 0;
    padding: 0 10px;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .description {
    width: 100%;
    height: 45px;
    position: relative;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    .amount {
      width: 200px;
      height: 25px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 1px;
    }
  }

  .line {
    width: 95%;
    height: 1px;
    margin: 10px 0;
    background: var(--bright);
  }

  .items {
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      "para share"
      "real share";
    padding: 0 10px;

    > p {
      grid-area: para;
    }

    .real {
      width: 100%;
      height: auto;
      padding: 10px;
      display: flex;
      flex-direction: column;
      grid-area: real;

      .item {
        width: 35vw;
        height: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
      }
    }

    .share {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      grid-area: share;

      p {
        text-align: center;
      }

      button {
        width: 90%;
        height: 25px;
        background: #3431c2;
        border: none;
        color: white;
        border-radius: 5px;
      }
    }
  }

  .info {
    width: 100%;
    height: auto;
    padding: 0 10px;

    .real {
      width: 100%;
      height: auto;
      padding: 10px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 20px;

      select {
        width: 70px;
        height: 20px;
        background: var(--grayish);
        border: none;
        border-radius: 5px;
      }

      .two {
        .days {
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: column;

          .row {
            width: 100%;
            height: 20px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }
      }
    }
  }

  .add {
    width: 80vw;
    height: 35px;
    font-size: 1.1em;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background: var(--gray);

    img {
      width: 20%;
    }
  }
`;

export default MenuItem;
