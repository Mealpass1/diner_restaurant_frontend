import React from "react";
import styled from "styled-components";

const Logo = () => {
  return (
    <Container>
      <img src="/logo.svg" alt="Mealpass logo" />
    </Container>
  );
};

const Container = styled.div`
  width: 7em;
  height: 7em;
  margin: auto;
  border-radius: 50%;
  padding: 1em;
  background: var(--bright);

  img {
    width: 100%;
    height: 100%;
  }
`;

export default Logo;
