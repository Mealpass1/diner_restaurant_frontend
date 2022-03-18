import React from "react";
import styled from "styled-components";

import Layout from "../../components/diner/Layout";
import Top from "../../components/diner/top/Account";

const Account = () => {
  return (
    <Layout>
      <Top />
      <Content>
        <p>My Order History</p>
      </Content>
    </Layout>
  );
};

const Content = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;

  > p {
    margin: 0 10px;
    font-size: 1.1em;
    font-weight: bold;
  }
`;

export default Account;
