import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

import Layout from "../../../components/diner/Layout";
import Top from "../../../components/diner/top/Product";

import axios from "../../../features/axios";

const MenuItem = () => {
  const query = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .get(`/menu/${query.product}`, { headers: { auth: `${token}` } })
      .then((response) => {
        if (response.data.status === "error") {
          console.log(response.data.message);
        } else {
          setData(response.data.data);
        }
      });
  }, [query.product]);

  return (
    <Layout>
      <Top />
      <Image src={data?.dish?.image} alt={data?.dish?.name} />
      <Container>
        <div className="title">
          <div>
            <p>{data?.dish?.name}</p>
            <p className="smaller">
              Restaurant: {data?.restaurant?.businessName}
            </p>
          </div>
          <div className="card">Used</div>
        </div>
        <div className="description">
          <p className="bolder">Decription</p>
          <p>{data?.dish?.description}</p>
          <div className="amount">
            <p>
              Remaining meal serving ={" "}
              <span>{data?.order?.mealServing?.unused}</span>
            </p>
          </div>
        </div>
        <div className="line"></div>
        <div className="history">
          <p className="bolder">Usage History</p>
          <table>
            <tbody>
              {data?.usage?.map((usage, index) => (
                <tr key={index}>
                  <td>{usage?.date}</td>
                  <td>
                    Quantity Used = <span>{usage?.quantity}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Layout>
  );
};

const Image = styled.img`
  width: 100%;
  height: 250px;
`;
const Container = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .line {
    width: 90%;
    height: 1px;
    margin: 10px 0;
    background: var(--bright);
  }

  .bolder {
    font-weight: bold;
    text-transform: capitalize;
    text-decoration: underline;
  }

  .title {
    width: 100%;
    height: 35px;
    margin: 10px 0;
    padding: 0 10px;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .card {
      width: 90px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--white);
      background: #dd0f0f;
      border-radius: 5px;
    }
  }

  .description {
    width: 100%;
    height: 45px;
    position: relative;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    .amount {
      width: 200px;
      height: 25px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 1px;
    }
  }

  .history {
    width: 95%;
    height: auto;

    table {
      width: 100%;
      height: auto;
      margin: 10px 0 0 0;

      tbody tr {
        width: 100%;
        height: 25px;

        td {
          font-weight: bold;
        }
      }
    }
  }
`;

export default MenuItem;
