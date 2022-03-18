//packages
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import styled from "styled-components";

//icons
import { FaBars } from "react-icons/fa";

//features
import axios from "../../features/axios";

//components
import SideBar from "./SideBar";
import { add } from "../../state/Reducers/Restaurant/Restaurant";

const Nav = ({ name }) => {
  const [data, setData] = useState({});
  const [bar, setBar] = useState(false);

  const dispatch = useDispatch();

  const openSideBar = () => {
    setBar(!bar);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const { id } = jwt_decode(token);

    axios
      .get(`/restaurant/${id}`, { headers: { auth: `${token}` } })
      .then((response) => {
        setData(response.data.data);
        dispatch(add(response.data.data));
      });
  }, []);

  return (
    <React.Fragment>
      {bar === true ? <SideBar openBar={openSideBar} /> : <></>}
      <Container>
        <div className="bars" onClick={openSideBar}>
          <FaBars />
        </div>
        <div className="about">
          <div className="name">
            <p>{name}</p>
          </div>
          <div className="restaurant">
            <div className="para">
              <p>{data?.businessName}</p>
            </div>
            <div className="image">
              <img src={data?.picture} alt={data?.businessName} />
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid var(--grayish);

  .bars {
    width: 10%;
    height: 100%;
    font-size: 1.5em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .about {
    width: 80%;
    height: 70%;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
    background: var(--white);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    .name {
      width: 38%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      margin: 0 0 0 6px;

      p {
        font-weight: bold;
      }
    }

    .restaurant {
      width: 58%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;

      .para {
        margin: 0 4px 0 10px;
        text-align: end;

        p {
          font-weight: bold;
        }
      }

      .image {
        width: 30%;
        height: 90%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;

        img {
          width: 80%;
          height: 80%;
        }
      }
    }
  }
`;

export default Nav;
