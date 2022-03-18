import React from "react";

import _ from "lodash";
import { useSelector } from "react-redux";

import Container from "./Container";

const Restaurant = () => {
  const menu = useSelector((state) => state.diner.menu.menu);
  const finished = menu?.filter((order) => order.order.mealServing.unused == 0);
  const grouped = _.groupBy(finished, (order) => order.restaurant._id);

  return (
    <React.Fragment>
      {Object.keys(grouped)?.map((restaurant, index) => (
        <Container
          restaurant={restaurant}
          key={index}
          text="Meal Serving"
          type="finished"
        />
      ))}
    </React.Fragment>
  );
};

export default Restaurant;
