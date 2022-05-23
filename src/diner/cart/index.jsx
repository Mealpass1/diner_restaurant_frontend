//packages
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useNavigate } from "react-router";

//icons
import { IoBagCheckOutline } from "react-icons/io5";

//features
import axios from "../../features/axios";
import { add, getTotal, getFee } from "../../state/Reducers/Diner/Cart";

//components
import Top from "../../components/diner/top/Cart";
import Layout from "../../components/diner/Layout";
import Container from "../../components/diner/boxes/cart/Container";
import Delivery from "../../components/diner/portals/cart/Delivery";
import Pickup from "../../components/diner/portals/cart/Pickup";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [delivery, setDelivery] = useState(false);
  const [pickup, setPickup] = useState(false);
  const total = useSelector((state) => state.diner.cart.total) || 0;
  const fee = useSelector((state) => state.diner.cart.fee) || 0;
  const [data, setData] = useState([]);
  const [reflesh, setReflesh] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);

    axios.get("/cart", { headers: { auth: `${token}` } }).then((response) => {
      dispatch(add(response.data.data));
      dispatch(getTotal());
      dispatch(getFee());
      setData(response.data.data);
    });
  }, [dispatch, reflesh]);

  const all = useSelector((state) => state.diner.cart.cart);

  const refleshCart = () => {
    setReflesh(!reflesh);
  };

  const showDelivery = () => {
    // navigate("/diner/cart/payment");
    if (delivery) {
      setPickup(!pickup);
    }
    setDelivery(!delivery);
  };

  const showPickup = () => {
    // navigate("/diner/cart/payment");
    setPickup(!pickup);
  };

  const handleDelete = async (id) => {
    axios
      .delete(`/cart/delete/${id}`, { headers: { auth: `${token}` } })
      .then((response) => {
        refleshCart();
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

  return (
    <Layout>
      <Top items={data?.length} />
      {delivery ? <Delivery cancel={showDelivery} /> : <></>}
      {pickup ? <Pickup cancel={showPickup} /> : <></>}
      <Content>
        <Container delete={handleDelete} reflesh={refleshCart} />
        <div className="summary">
          <div className="top">
            <table>
              <tbody>
                <tr>
                  <td>Total Meal Cost</td>
                  <td className="money">{total} RWF</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="checkout" onClick={showDelivery}>
            <IoBagCheckOutline />
            <p>proceed to Payment</p>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

const Content = styled.div`
  .summary {
    width: 100%;
    height: 120px;
    margin: auto;
    position: sticky;
    bottom: 0;
    font-size: 13px;

    .top {
      width: 95%;
      height: 55%;
      margin: auto;
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

        td.money {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3px 10px;
          border-radius: 20px;
          background: var(--opacity);
        }
      }
    }

    .checkout {
      width: 95%;
      height: 35%;
      margin: auto;
      margin: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 1.1em;
      font-weight: bold;
      border-radius: 5px;
      background: var(--gray);

      img {
        width: 20%;
      }
    }
  }
`;

export default Cart;
