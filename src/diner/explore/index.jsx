//packages
import React from "react";
import { useLocation } from "react-router";
import { toast } from "react-toastify";

import Layout from "../../components/diner/Layout";
import Top from "../../components/diner/top/Explore";

const Explore = () => {
  const location = useLocation();
  if (location.search.length > 0) {
    setTimeout(() => {
      toast.success("Hi admin, welcome here!", {
        toastId: "customId",
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }, 3000);
  }

  return (
    <Layout>
      <Top />
    </Layout>
  );
};

export default Explore;
