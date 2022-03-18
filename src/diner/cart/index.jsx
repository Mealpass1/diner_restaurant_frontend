//packages
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";

//icons
import { IoBagCheckOutline } from "react-icons/io5";

//features
import axios from "../../features/axios";
import { add, getTotal, getFee, remove } from "../../state/Reducers/Diner/Cart";

//components
import Top from "../../components/diner/top/Cart";
import Layout from "../../components/diner/Layout";
import Container from "../../components/diner/boxes/cart/Container";
import Success from "../../components/diner/portals/Cart";

const Cart = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [show, setShow] = useState(false);
  const total = useSelector((state) => state.diner.cart.total) || 0;
  const fee = useSelector((state) => state.diner.cart.fee) || 0;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);

    axios.get("/cart", { headers: { auth: `${token}` } }).then((response) => {
      dispatch(add(response.data.data));
      dispatch(getTotal());
      dispatch(getFee());
      setData(response.data.data);
    });
  }, [dispatch]);

  const all = useSelector((state) => state.diner.cart.cart);

  const checkout = () => {
    setLoading(true);
    const array = [];
    for (let item of all) {
      array.push({
        cart: item._id,
        dish: item.dish._id,
        restaurant: item.restaurant._id,
      });
    }
    axios
      .post(
        "/order/add",
        { array: array },
        {
          headers: {
            auth: `${token}`,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response.data.status === "error") {
          toast.error(response.data.message, {
            toastId: "customId",
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        } else {
          setShow(true);
          dispatch(remove());
        }
      });
  };

  const handleDelete = async (id) => {
    axios
      .delete(`/cart/delete/${id}`, { headers: { auth: `${token}` } })
      .then((response) => {
        if (response.data.status === "error") {
          toast.error("Unable to delete item", {
            toastId: "customId",
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        } else {
          toast.success("Item deleted", {
            toastId: "customId",
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        }
      });
  };

  const showAdd = () => {
    setShow(!show);
  };

  return (
    <Layout>
      <Top items={data?.length} />
      {show === true ? <Success cancel={showAdd} /> : <></>}
      <Content>
        <Container delete={handleDelete} />
        <div className="summary">
          <div className="top">
            <table>
              <tbody>
                <tr>
                  <td>Meal Cost</td>
                  <td>{total} RWf</td>
                </tr>
                <tr>
                  <td>Service Fee</td>
                  <td>{fee} RWF</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <th>{total + fee} RWF</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="checkout" onClick={checkout}>
            {loading ? (
              <img src="/loader.svg" alt="loader" />
            ) : (
              <>
                <IoBagCheckOutline />
                <p>proceed to checkout</p>
              </>
            )}
          </div>
        </div>
      </Content>
    </Layout>
  );
};

const Content = styled.div`
  .summary {
    width: 100%;
    height: 180px;
    margin: auto;
    position: sticky;
    bottom: 0;
    font-size: 13px;

    .top {
      width: 95%;
      margin: auto;
      height: 60%;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #cfcfcf;

      table {
        width: 60%;

        tbody tr td,
        th {
          text-align: start;
        }
      }
    }

    .checkout {
      width: 95%;
      margin: auto;
      height: 25%;
      margin: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 1.1em;
      font-weight: bold;
      background: var(--gray);

      img {
        width: 20%;
      }
    }
  }
`;

export default Cart;
