import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { FiSearch } from "react-icons/fi";

import axios from "../../features/axios";
import Container from "../../components/diner/boxes/restaurant/Container";
import Top from "../../components/diner/top/Restaurant";
import Layout from "../../components/diner/Layout";

import { add } from "../../state/Reducers/Diner/Restaurant";

const Restaurant = () => {
  const query = useParams();
  const [data, setData] = useState({});
  const [active, setActive] = useState("all");
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .get(`/restaurant/${query.restaurant}`, {
        headers: { auth: `${token}` },
      })
      .then((response) => {
        setData(response.data.data);
        dispatch(add(response.data.data));
      });
  }, [dispatch, query.restaurant]);

  const handleSearch = (key) => {
    console.log(key);
  };

  return (
    <Layout>
      <Top
        name={data?.businessName}
        image={data?.picture}
        description={data?.description}
      />
      <Content>
        <div className="search">
          <FiSearch />
          <input
            type="text"
            placeholder="search here"
            onChange={handleSearch}
          />
        </div>
        <button>search</button>
      </Content>
      <Nav>
        <div className="paras">
          {data?.dishTypes?.map((category, index) => (
            <p
              key={index}
              className={active === category ? `active` : ""}
              onClick={() => setActive(category)}
            >
              {category}
            </p>
          ))}
        </div>
      </Nav>
      <Container active={active} restaurant={query.restaurant} />
    </Layout>
  );
};

const Content = styled.div`
  width: 100vw;
  height: 30px;
  margin: auto;
  padding: 0 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .search {
    width: 70%;
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

  button {
    width: 25%;
    height: 100%;
    border-radius: 10px;
    border: none;
    background: var(--gray);
  }
`;
const Nav = styled.div`
  width: auto;
  height: 30px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  .paras {
    width: auto;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    overflow: scroll;

    p {
      text-transform: capitalize;
    }
  }

  p {
    width: 80px;
    height: 30px;
    font-size: 1.1em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: var(--opacity);
  }

  p.active {
    color: var(--bright);
    border-bottom: 2px solid var(--bright);
  }
`;

export default Restaurant;
