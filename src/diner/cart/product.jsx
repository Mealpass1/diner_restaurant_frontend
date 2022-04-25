//packages
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import _ from "lodash";

//features
import axios from "../../features/axios";

//components
import Layout from "../../components/diner/Layout";
import Top from "../../components/diner/top/Product";

//icons
import { MdOutlineDownloadDone } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { BiMinus } from "react-icons/bi";

const CartItem = () => {
  const query = useParams();
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [data, setData] = useState({});

  const [time, setTime] = useState(data?.timeOfMeal);
  const [days, setDays] = useState(data?.daysInWeek);
  const [mode, setMode] = useState(data?.deliveryMode);
  const [repeates, setRepeates] = useState(data?.repeatsInMonth);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const deliveryMode = [
    {
      mode: "Home delivery = 2,520FRW (For the week)",
      price: 0,
    },
    {
      mode: "Pickup from Restaurant",
      price: 0,
    },
    {
      mode: "Eat from Restaurant",
      price: 0,
    },
  ];

  const updateCart = () => {
    console.log("update cart");
  };

  const handleTime = (e) => {
    setTime(e.target.value);
  };

  const onAddDay = () => {
    console.log("add day");
  };

  const handleMode = (e) => {
    setMode(e.target.value);
  };

  const handleRepeates = (e) => {
    setRepeates(e.target.value);
  };

  const handleTopping = () => {};

  const increaseAmount = () => {
    console.log("Increasing amount");
  };

  const decreaseAmount = () => {
    console.log("Decreasing amount");
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .get(`/cart/${query.product}`, { headers: { auth: `${token}` } })
      .then((response) => {
        setData(response.data.data);
      });
  }, [query.product]);

  console.log(data);

  return (
    <Layout>
      <Top />
      <Image>
        <img src={data?.dish?.image} alt={data?.dish?.name} />
      </Image>
      <Container onSubmit={updateCart}>
        <div className="content">
          <div className="title">
            <p>{data?.dish?.name}</p>
            <p>{data?.dish?.price} RWF</p>
          </div>
          <div className="announcement">
            <p>({data?.dish?.discount}%Off)</p>
          </div>
          <div className="description">
            <p className="bolder">Decription</p>
            <p className="description_text">{data?.dish?.description}</p>
            <div className="amount">
              <p>No. of Ppl/Qty</p>
              <div>
                <div className="plus" onClick={increaseAmount}>
                  <AiOutlinePlus />
                </div>
                <p>{data?.mealServing}</p>
                <div className="minus" onClick={decreaseAmount}>
                  <BiMinus />
                </div>
              </div>
            </div>
          </div>
          <div className="line"></div>
          <div className="toppings">
            <p className="bolder">Additional Top-up</p>
            {data?.toppings?.length > 0 ? (
              <>
                <div className="real">
                  {data?.dish?.toppings?.map((topping, index) => (
                    <div className="topping" key={index}>
                      <div>
                        <input
                          type="checkbox"
                          name={topping.name}
                          id={topping.name}
                          onChange={() => handleTopping(index)}
                          checked={data?.toppings
                            .map((top) => top.name)
                            .includes(topping.name)}
                        />
                        <p>
                          {topping.name.length > 7
                            ? `${topping.name.substr(0, 7)}...`
                            : topping.name}
                        </p>
                      </div>
                      <p>{topping.price} RWF</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p>No additional top-ups</p>
            )}
          </div>
          <div className="line"></div>
          <div className="info">
            <p className="bolder">More information</p>
            <div className="real">
              <div className="one">
                <p className="bold">1. What time of meal?</p>
                <select name="time" onChange={handleTime}>
                  <option
                    value="breakfast"
                    selected={data?.timeOfMeal === "breakfast" ? true : false}
                  >
                    breakfast
                  </option>
                  <option
                    value="lunch"
                    selected={data?.timeOfMeal === "lunch" ? true : false}
                  >
                    Lunch
                  </option>
                  <option
                    value="dinner"
                    selected={data?.timeOfMeal === "dinner" ? true : false}
                  >
                    Dinner
                  </option>
                </select>
              </div>
              <div className="two">
                <p className="bold">2. which days in a week?</p>
                <div className="days">
                  {data?.daysInWeek?.map((one, index) => (
                    <div className="row" key={index}>
                      <div className="day">
                        <input
                          type="checkbox"
                          name={one}
                          id={one}
                          value={one}
                          onChange={onAddDay}
                          checked={true}
                        />
                        <label htmlFor={one}>{one}</label>
                      </div>
                      <div className="change">
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
                {deliveryMode.map((one, index) => (
                  <div className="mode" key={index}>
                    <input
                      type="radio"
                      name="mode"
                      id={one.mode}
                      value={one.mode}
                      onChange={handleMode}
                      checked={data?.deliveryMode === one.mode ? true : false}
                    />
                    <label htmlFor={one.mode}>{one.mode}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className={updated === true ? `added` : `add`}
            onClick={updateCart}
          >
            {updated === true ? (
              <>
                <MdOutlineDownloadDone />
                <p>Updated</p>
              </>
            ) : (
              <>
                <FaShoppingCart />
                <p>Update</p>
              </>
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

const Image = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 10px;

  img {
    width: 100%;
  }
`;
const Container = styled.form`
  .content {
    width: 100vw;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;

    button {
      border: none;
    }

    .bold {
      font-weight: bold;
      text-transform: capitalize;
    }

    .bolder {
      font-weight: bold;
      text-transform: capitalize;
      text-decoration: underline;
    }

    .toppings {
      width: 100%;
      height: auto;
      padding: 0 10px 10px 10px;

      .real {
        width: 100%;
        height: auto;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 0 10px;
      }

      .topping {
        width: 90%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        div {
          display: flex;
          width: 60%;
          height: 100%;
          align-items: center;

          p {
            margin: 0 5px;
          }
        }
      }
    }

    .title {
      width: 100%;
      height: 25px;
      text-transform: capitalize;
      padding: 0 10px;
      font-weight: bold;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .announcement {
      width: 100%;
      height: 20px;
      color: var(--red);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .description {
      width: 100%;
      height: 60px;
      position: relative;
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;

      > p {
        width: 70%;
      }

      .amount {
        width: 100px;
        height: 50px;
        position: absolute;
        right: 10px;
        text-align: center;

        p {
          line-height: 20px;
        }

        > div {
          width: 80px;
          height: 25px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
          position: absolute;
          right: 10px;
        }

        .plus,
        .minus {
          width: 30%;
          height: 100%;
          border-radius: 50%;
          box-shadow: 0px 0.5px 3px rgba(0, 0, 0, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--grayish);
        }
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
      padding: 0 10px;
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
        grid-template-areas:
          "one two"
          "three three";

        .item {
          width: 35vw;
          height: 5px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
        }

        .one {
          grid-area: one;
        }

        .two {
          grid-area: two;
        }

        .three {
          grid-area: three;
        }

        select {
          width: 70px;
          height: 20px;
          background: var(--grayish);
          border: none;
          border-radius: 5px;
        }

        .two .days {
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

    .add {
      width: 80vw;
      height: 35px;
      display: flex;
      font-weight: bold;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      background: var(--gray);

      p {
        margin: 0 10px;
      }
    }
  }
`;

export default CartItem;
