import React from "react";
import styled from "styled-components";

import Layout from "../../components/diner/Layout";
import Top from "../../components/diner/top/Payment";

const Payment = () => {
  return (
    <Layout>
      <Container>
        <div className="top">
          <Top />
        </div>
        <div className="stats">
          <div className="header">
            <div className="title"></div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;

  .top {
    width: 100%;
    height: 120px;
  }
`;

export default Payment;
