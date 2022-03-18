//packages
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

//features
import axios from "../features/axios";
import { add } from "../state/Reducers/Restaurant/Requests";

//components
import Box from "../components/restaurant/Boxes/Request";
import Nav from "../components/restaurant/Nav";

const Orders = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .get("/request", { headers: { auth: `${token}` } })
      .then((response) => {
        setData(response.data.data);
        dispatch(add(response.data.data));
      });
  }, [dispatch]);

  return (
    <Container>
      <Nav name="Meal Request" />
      <div className="top">
        <p>All</p>
      </div>
      <div className="content">
        {data?.length === 0 ? (
          <p>No requests yet...</p>
        ) : (
          data?.map((request, index) => <Box key={index} request={request} />)
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  .content {
    width: 100%;
    height: auto;
    display: flex;
    margin: 15px 0;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  .top {
    width: 90%;
    height: 40px;
    border-bottom: 1px solid var(--grayish);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: auto;

    p {
      padding: 9px 10px;
      color: var(--bright);
      border-bottom: 3px solid var(--bright);
    }
  }
`;

export default Orders;
