//packages
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

//components
import Layout from "../../components/diner/Layout";
import Top from "../../components/diner/top/Menu";
import Available from "../../components/diner/boxes/menu/Available";
import Used from "../../components/diner/boxes/menu/Used";
import Shared from "../../components/diner/boxes/menu/Shared";
import Finished from "../../components/diner/boxes/menu/Finished";

//features
import { add } from "../../state/Reducers/Diner/Menu";
import axios from "../../features/axios";

const Menu = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState("available");

  const handleRestaurant = () => {
    setActive("available");
  };

  const handleBars = () => {
    setActive("used");
  };

  const handleShared = () => {
    setActive("shared");
  };

  const handleFinished = () => {
    setActive("finished");
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios.get("/menu", { headers: { auth: `${token}` } }).then((resp) => {
      dispatch(add(resp.data.data));
    });
  }, [dispatch]);

  return (
    <Layout>
      <Top />
      <Header>
        <p
          className={active === `available` ? `active` : ""}
          onClick={handleRestaurant}
        >
          Available Meals
        </p>
        <p className={active === `used` ? `active` : ""} onClick={handleBars}>
          Used Meals
        </p>
        <p
          className={active === `shared` ? `active` : ""}
          onClick={handleShared}
        >
          Shared Meals
        </p>
        <p
          className={active === `finished` ? `active` : ""}
          onClick={handleFinished}
        >
          Finished Meals
        </p>
      </Header>
      <div>
        {active === "available" ? <Available /> : <></>}
        {active === "used" ? <Used /> : <></>}
        {active === "shared" ? <Shared /> : <></>}
        {active === "finished" ? <Finished /> : <></>}
      </div>
    </Layout>
  );
};

const Header = styled.div`
  width: 600px;
  height: 30px;
  padding: 0 5px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow: auto;
  font-size: 12px;

  ::-webkit-scrollbar {
    display: none;
  }

  p {
    float: left;
    font-weight: 600;
    font-size: 1.2em;
    width: max-content;
    margin: 0 12px;
  }

  p.active {
    color: var(--bright);
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
`;

export default Menu;
