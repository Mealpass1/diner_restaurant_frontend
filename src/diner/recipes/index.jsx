import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { FiSearch } from "react-icons/fi";

import axios from "../../features/axios";
import Layout from "../../components/diner/Layout";
import Top from "../../components/diner/top/Explore";
import Container from "../../components/diner/boxes/recipes/Container";

import { all } from "../../state/Reducers/Diner/Restaurant";

const Restaurants = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .get("/restaurant", { headers: { auth: `${token}` } })
      .then((response) => {
        setData(response.data.data);
        dispatch(all(response.data.data));
      });
  }, [dispatch]);

  const handleSearch = (key) => {
    console.log(key);
  };

  return (
    <Layout>
      <Top />
      <Header>
        <div className="nav">
          <p className={data.length > 0 ? `active` : ""}>
            Restaurants{data.length > 0 ? `(${data.length})` : ""}
          </p>
        </div>
        <div className="search">
          <FiSearch />
          <input
            type="text"
            placeholder="search here"
            onChange={handleSearch}
          />
        </div>
      </Header>
      {data?.length === 0 ? (
        <Nothing>
          <p className="error">No restaurants yet...</p>
        </Nothing>
      ) : (
        <>
          {data?.map((restaurant, index) => (
            <Container restaurant={restaurant} key={index} />
          ))}
        </>
      )}
    </Layout>
  );
};

const Header = styled.div`
  width: 100vw;
  height: 30px;
  padding: 0 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .nav {
    width: 45%;
    height: 70%;
    font-weight: 600;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    p.active {
      color: var(--bright);
      display: flex;
      position: relative;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
  }

  .search {
    width: 60%;
    height: 90%;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: var(--grayish);

    input {
      width: 85%;
      height: 100%;
      text-align: center;
      border: none;
      outline: none;
      background: transparent;
    }
  }
`;
const Nothing = styled.div`
  width: 100vw;
  height: 20px;
  background: wheat;

  .error {
    text-align: center;
    line-height: 20vh;
  }
`;

export default Restaurants;
