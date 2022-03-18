import React from "react";

import _ from "lodash";
import { useSelector } from "react-redux";

import Container from "./Container";

const Meals = () => {
  const menu = useSelector((state) => state.diner.menu.menu);
  const used = menu?.filter((order) => order.usage.length > 0);
  const grouped = _.groupBy(used, (order) => order.restaurant._id);

  return (
    <React.Fragment>
      {Object.values(grouped)?.map((restaurant, index) => (
        <Container
          restaurant={restaurant}
          key={index}
          text="Used Serving"
          type="used"
        />
      ))}
    </React.Fragment>
  );
};

export default Meals;
