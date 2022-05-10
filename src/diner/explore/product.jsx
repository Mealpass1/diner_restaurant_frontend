//packages
import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { useParams } from "react-router";

//features
import axios from "../../features/axios";

//components
import Layout from "../../components/diner/Layout";
import Top from "../../components/diner/top/Product";


const CartItem = () => {
  const query = useParams();

  const { data } = useQuery("package", async () => {
    return await axios.get(`/packageItems/${query.product}`).then((response) => response.data.data);
  });

  // const daysOfWeek = [
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  //   "Sunday",
  // ];

  const deliveryMode = [
    {
      mode: "Pickup from Restaurant",
      price: 0,
    },
    {
      mode: "Eat from Restaurant",
      price: 0,
    },
  ];

  return (
    <Layout>
      <Top />
      <Image>
        <img src={data?.dish?.image} alt={data?.dish?.name} />
      </Image>
      <Container>
        <div className="content">
          <div className="description">
            <p className="bolder">Decription</p>
            <p className="description_text">{data?.dish?.description}</p>
            <div className="amount">
              <p>
                Total meal serving = <span>{data?.mealServing}</span>
              </p>
            </div>
          </div>
          <div className="line"></div>
          <div className="toppings">
            <p className="bolder">Additional Top-up</p>
            {data?.toppings?.length > 0 ? (
              <>
                <div className="real">
                  {data?.toppings?.map((topping, index) => (
                    <div className="topping" key={index}>
                      <div>
                        <input
                          type="checkbox"
                          name={topping.name}
                          id={topping.name}
                          checked={true}
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
                <select name="time">
                  <option
                    value="breakfast"
                    selected={
                      data?.timeOfMeal === "breakfast" ? true : false
                    }
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
                          checked={true}
                        />
                        <label htmlFor={one}>
                          {one.length > 8 ? `${one.substr(0, 6)}...` : one}
                        </label>
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
                      checked={
                        data?.deliveryMode === one.mode ? true : false
                      }
                    />
                    <label htmlFor={one.mode}>{one.mode}</label>
                  </div>
                ))}
              </div>
            </div>
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
  border-radius: 20px;
  overflow: hidden;

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
        width: 200px;
        height: 50px;
        position: absolute;
        right: 10px;
        text-align: center;

        p {
          line-height: 20px;

          span {
            padding: 4px 10px;
            background: var(--gray);
          }
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

        .two {
          .days {
            width: 100%;
            height: auto;
            display: grid;
            grid-template-columns: repeat(2, 1fr);

            .day {
              width: 21vw;
              height: 20px;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-start;
            }
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
