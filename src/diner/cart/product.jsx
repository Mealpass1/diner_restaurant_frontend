//packages
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { toast } from "react-toastify";

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
  const [token, setToken] = useState("");
  const [time, setTime] = useState("");
  const [days, setDays] = useState([]);
  const [mode, setMode] = useState("");
  const [amount, setAmount] = useState(0);
  const [toppings, setToppings] = useState(data?.toppings);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleDay = (one) => {
    if (days.includes(one)) {
      const newDays = days.filter((day) => day !== one);
      setDays(newDays);
    } else {
      setDays([...days, one]);
    }
  };

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
    setLoading(true);
    axios
      .put(
        `/cart/update/${data?._id}`,
        {
          amount: amount,
          timeOfMeal: time,
          daysInWeek: days,
          deliveryMode: mode,
          toppings: toppings,
        },
        { headers: { auth: `${token}` } }
      )
      .then((response) => {
        setLoading(false);
        if (response.data.status === "error") {
          toast.error("Unable to update item", {
            toastId: "customId",
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        } else {
          setUpdated(true);
          toast.success("Item updated", {
            toastId: "customId",
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        }
      });
  };

  const handleTime = (e) => {
    setTime(e.target.value);
  };

  const handleMode = (one) => {
    setMode(one);
  };

  const handleTopping = (topping) => {
    if (toppings.map((to) => to.name).includes(topping.name)) {
      const newToppings = toppings.filter((top) => top.name !== topping.name);
      setToppings(newToppings);
    } else {
      setToppings([...toppings, topping]);
    }
  };

  const increaseAmount = () => {
    setAmount(amount + 1);
  };

  const decreaseAmount = () => {
    setAmount(amount - 1);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);

    axios
      .get(`/cart/${query.product}`, { headers: { auth: `${token}` } })
      .then((response) => {
        setData(response.data.data);
        setTime(response.data.data.timeOfMeal);
        setDays([...response.data.data.daysInWeek]);
        setMode(response.data.data.deliveryMode);
        setToppings([...response.data.data.toppings]);
        setAmount(response.data.data.quantity);
      });
  }, [query.product]);

  return (
    <Layout>
      <Top />
      <Image>
        <img src={data?.dish?.image} alt={data?.dish?.name} />
      </Image>
      <Container>
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
                <p>{amount}</p>
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
                          onChange={() => handleTopping(topping)}
                          checked={toppings
                            ?.map((top) => top.name)
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
                    selected={time === "breakfast" ? true : false}
                  >
                    breakfast
                  </option>
                  <option
                    value="lunch"
                    selected={time === "lunch" ? true : false}
                  >
                    Lunch
                  </option>
                  <option
                    value="dinner"
                    selected={time === "dinner" ? true : false}
                  >
                    Dinner
                  </option>
                </select>
              </div>
              <div className="two">
                <p className="bold">2. which days in a week?</p>
                <div className="days">
                  {daysOfWeek?.map((one, index) => (
                    <div className="row" key={index}>
                      <div className="day">
                        <input
                          type="checkbox"
                          name={one}
                          id={one}
                          value={one}
                          checked={days.includes(one)}
                          onChange={() => handleDay(one)}
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
                      onChange={() => handleMode(one.mode)}
                      checked={mode === one.mode ? true : false}
                    />
                    <label htmlFor={one.mode}>{one.mode}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="add" onClick={updateCart}>
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
