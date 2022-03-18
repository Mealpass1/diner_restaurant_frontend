import React from "react";
import styled from "styled-components";

import Nav from "./Nav";

const Layout = (props) => {
  return (
    <React.Fragment>
      <Container>{props.children}</Container>
      <Nav />
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100vw;
  margin: 0 0 5em 0;
  height: auto;
  overflow: hidden;
`;

export default Layout;
