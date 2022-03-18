//packages
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

//features
import axios from "../../features/axios";

//components
import Layout from "../../components/diner/Layout";
import Top from "../../components/diner/top/Product";

//icons
import { MdOutlineDownloadDone } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

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

  const deliveryMode = ["Eat from Restaurant", "Pickup from Restaurant"];

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

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .get(`/cart/${query.product}`, { headers: { auth: `${token}` } })
      .then((response) => {
        setData(response.data.data);
      });
  }, [query.product]);

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
              Total Meal Serving = <span>{data?.mealServing}</span>
            </div>
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
                    selected={time === "breakfast" ? `${true}` : `${false}`}
                  >
                    breakfast
                  </option>
                  <option
                    value="lunch"
                    selected={time === "lunch" ? `${true}` : `${false}`}
                  >
                    Lunch
                  </option>
                  <option
                    value="dinner"
                    selected={time === "dinner" ? `${true}` : `${false}`}
                  >
                    Dinner
                  </option>
                </select>
              </div>
              <div className="two">
                <p className="bold">2. which days in a week?</p>
                <div className="days">
                  {days?.map((one, index) => (
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
                      id={one}
                      value={one}
                      onChange={handleMode}
                      checked={mode === one ? `${true}` : `${false}`}
                    />
                    <label htmlFor={one}>{one}</label>
                  </div>
                ))}
              </div>
              <div className="four">
                <p className="bold">4. How many repeat in a month?</p>
                <select name="time" onChange={handleRepeates}>
                  <option
                    value="1"
                    selected={repeates === 1 ? `${true}` : `${false}`}
                  >
                    Just this week
                  </option>
                  <option
                    value="2"
                    selected={repeates === 2 ? `${true}` : `${false}`}
                  >
                    Over the next 2 weeks
                  </option>
                  <option
                    value="3"
                    selected={repeates === 3 ? `${true}` : `${false}`}
                  >
                    Over the next 3 weeks
                  </option>
                  <option
                    value="4"
                    selected={repeates === 4 ? `${true}` : `${false}`}
                  >
                    Over the next 4 weeks
                  </option>
                </select>
              </div>
            </div>
          </div>
          <button type="submit" className="add" onClick={updateCart}>
            {loading ? (
              <img src="/loader.svg" alt="loader" />
            ) : (
              <div className={updated === true ? `added` : `adding`}>
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
            )}
          </button>
        </div>
      </Container>
    </Layout>
  );
};

const Image = styled.div`
  width: 100%;
  height: 260px;
  margin-bottom: 10px;

  img {
    width: 100%;
    height: 100%;
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

      .amount {
        width: 150px;
        height: 25px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        position: absolute;
        right: 10px;

        span {
          padding: 5px;
          background: var(--gray);
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
      width: 90%;
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

        .item {
          width: 35vw;
          height: 5px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
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
    }
  }
`;

export default CartItem;
