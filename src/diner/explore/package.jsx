import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";

import axios from "../../features/axios";
import Layout from "../../components/diner/Layout";
import Content from "../../components/diner/boxes/explore/package/Content";

const Basket = () => {
  const query = useParams();

  const { data } = useQuery(`${query.package}`, async () => {
    return await axios
      .get(`/package/${query.package}`)
      .then((response) => response.data.data);
  });

  return (
    <Layout>
      <Content pack={data} />
    </Layout>
  );
};

export default Basket;
