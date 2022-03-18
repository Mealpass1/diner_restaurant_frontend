//packages
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

//features
import axios from "../features/axios";
import { add } from "../state/Reducers/Restaurant/Products";

//components
import Box from "../components/restaurant/Boxes/Product";
import Nav from "../components/restaurant/Nav";
import Add from "../components/restaurant/Portals/Add";

const Products = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  const showAdd = () => {
    setShow(!show);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios.get("/dish", { headers: { auth: `${token}` } }).then((res) => {
      setData(res.data.data);
      dispatch(add(res.data.data));
    });
  }, [dispatch]);

  return (
    <Container>
      {show === true ? <Add close={showAdd} /> : <></>}
      <Nav name="Products" />
      <div className="top">
        <p>All</p>
        <button onClick={showAdd}>Add+</button>
      </div>
      <div className="content">
        {data?.length === 0 ? (
          <p>Click Add+ to add a new product</p>
        ) : (
          data?.map((product, index) => <Box key={index} product={product} />)
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  .top {
    width: 90%;
    height: 40px;
    border-bottom: 1px solid var(--grayish);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: auto;

    button {
      width: 100px;
      height: 25px;
      border-radius: 30px;
      border: none;
      color: var(--white);
      background: var(--bright);
    }

    p {
      padding: 12px 10px;
      color: var(--bright);
      border-bottom: 3px solid var(--bright);
    }
  }

  .content {
    width: 100%;
    height: auto;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
`;

export default Products;
