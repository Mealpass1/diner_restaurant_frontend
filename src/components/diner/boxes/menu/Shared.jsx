import React from "react";

import _ from "lodash";
import { useSelector } from "react-redux";

import Container from "./Container";

const Shared = () => {
  const menu = useSelector((state) => state.diner.menu.menu);
  const shared = menu?.filter((order) => order.shared == true);
  const grouped = _.groupBy(shared, (order) => order.restaurant._id);

  return (
    <React.Fragment>
      {Object.values(grouped)?.map((restaurant, index) => (
        <Container
          restaurant={restaurant}
          key={index}
          text="Shared Serving"
          type="shared"
        />
      ))}
    </React.Fragment>
  );
};

export default Shared;
