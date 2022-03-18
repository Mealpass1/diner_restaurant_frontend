//packages
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

//components
import Nav from "../components/restaurant/Nav";
import Box from "../components/restaurant/Boxes/Order";

//features
import axios from "../features/axios";
import { add } from "../state/Reducers/Restaurant/Orders";

const Products = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios.get("/order", { headers: { auth: `${token}` } }).then((res) => {
      setData(res.data.data);
      dispatch(add(res.data.data));
    });
  }, [dispatch]);

  return (
    <Container>
      <Nav name="Orders" />
      <div className="top">
        <p>All</p>
      </div>
      <div className="content">
        {data?.length === 0 ? (
          <p>No orders yet...</p>
        ) : (
          data?.map((order, index) => <Box key={index} order={order} />)
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  .top {
    width: 90%;
    height: 40px;
    border-bottom: 1px solid var(--grayish);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: auto;

    button {
      width: 100px;
      height: 25px;
      border-radius: 30px;
      border: none;
      color: var(--white);
      background: var(--bright);
    }

    p {
      padding: 12px 10px;
      color: var(--bright);
      border-bottom: 3px solid var(--bright);
    }
  }

  .content {
    width: 100%;
    height: auto;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
`;

export default Products;
