//packages
import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

import axios from "../../features/axios";

import Layout from "../../components/diner/Layout";
import Top from "../../components/diner/top/Explore";
import Box from "../../components/diner/boxes/explore/Box";

const Explore = () => {
  const { isLoading, data } = useQuery("packages", async () => {
    return await axios.get("/package").then((response) => response.data.data);
  });

  return (
    <Layout>
      <Top />
      <Container>
        {data?.length === 0 ? (
          <p>No packages</p>
        ) : (
          <>
            {data?.map((basket, index) => (
              <Box key={index} basket={basket} />
            ))}
          </>
        )}
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Explore;
