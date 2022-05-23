//packages
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

//components
import Logo from "./components/Logo";

//images
import one from "./images/one.png";

const Home = () => {
  return (
    <Container>
      <Logo />
      <div className="image">
        <img src={one} alt="One" />
      </div>
      <div className="para">
        <p className="title">reimaging your restaurant experience</p>
        <p>
          Customise your whole meal menu for a whole week, month or just a day
          and pay upfront to gain amazing offers
        </p>
      </div>
      <p className="title">Continue as:</p>
      <div className="links">
        <Link className="diner" to="/diner/login">
          Diner
        </Link>
        <Link className="restaurant" to="/restaurant/login">
          Restaurant
        </Link>
      </div>
    </Container>
  );
};

const Container = styled.div`
  @media only screen and (max-width: 600px) {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background: var(--white);

    .image {
      width: 75%;
      height: 15em;
      margin: auto;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .para {
      width: 85%;
      height: 8em;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      text-align: center;
    }
    .title {
      font-weight: bold;
      text-transform: uppercase;
    }

    .links {
      width: 85%;
      height: 8em;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;

      a {
        width: 40%;
        height: 30%;
        color: #000;
        font-weight: bold;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
      }

      .diner {
        background: var(--grayish);
        border: 1px solid var(--opacity);
      }

      .restaurant {
        background: var(--gray);
      }
    }
  }
`;

export default Home;
