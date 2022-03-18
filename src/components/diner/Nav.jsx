import React from "react";
import styled from "styled-components";

import RecipesIcon from "./icons/Recipes";
import MenuIcon from "./icons/Menu";
import MessagesIcon from "./icons/Messages";
import AccountIcon from "./icons/Account";
import ExploreIcon from "./icons/Explore";

const Nav = () => {
  return (
    <Container>
      <ExploreIcon />
      <RecipesIcon />
      <MenuIcon />
      <MessagesIcon />
      <AccountIcon />
    </Container>
  );
};

const Container = styled.div`
  background: var(--white);
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.15);
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 4.5em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  z-index: 100;
`;

export default Nav;
