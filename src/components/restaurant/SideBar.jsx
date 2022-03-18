//packages
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import ReactDom from "react-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import styled from "styled-components";

//icons
import { FaImage } from "react-icons/fa";
import { FiCodesandbox } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

//features
import axios from "../../features/axios";

const SideBar = ({ openBar }) => {
  const router = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  const handleRequest = () => {
    router("/restaurant/requests");
    setActive("/restaurant/requests");
  };

  const handleProduct = () => {
    router("/restaurant/products");
    setActive("/restaurant/products");
  };

  const handleProfile = () => {
    router("/restaurant/profile");
    setActive("/restaurant/profile");
  };

  const handleOrder = () => {
    router("/restaurant/orders");
    setActive("/restaurant/orders");
  };

  const logout = () => {
    const token = sessionStorage.getItem("token");
    axios
      .put(
        "/restaurant/logout",
        {},
        {
          headers: {
            auth: `${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "error") {
          toast.info("Something went wrong!", {
            toastId: "custom-id-yes",
            position: toast.POSITION.TOP_CENTER,
            onClose: 2000,
          });
        } else {
          sessionStorage.removeItem("token");
          toast.info("See you soon!", {
            toastId: "custom-id-yes",
            position: toast.POSITION.TOP_CENTER,
            onClose: 2000,
          });
          setTimeout(() => {
            sessionStorage.removeItem("token");
            router("/");
          }, 2000);
        }
      });
  };

  const variants = {
    initial: {
      x: -200,
    },
    visible: {
      x: 0,
      transition: {
        type: "tween",
      },
    },
  };

  return ReactDom.createPortal(
    <Container>
      <motion.div
        className="content"
        variants={variants}
        initial="initial"
        animate="visible"
      >
        <div className="logo">
          <img src="/logo.svg" alt="logo" />
        </div>
        <p className="title">General</p>
        <div className="nav">
          <div
            className={active === "/restaurant/requests" ? `active` : `item`}
            onClick={handleRequest}
          >
            <FaImage />
            <p>Meal Request</p>
          </div>
          <div
            className={active === "/restaurant/products" ? `active` : `item`}
            onClick={handleProduct}
          >
            <FiCodesandbox />
            <p>Product</p>
          </div>
          <div
            className={active === "/restaurant/orders" ? `active` : `item`}
            onClick={handleOrder}
          >
            <FiCodesandbox />
            <p>Orders</p>
          </div>
          <div
            className={active === "/restaurant/profile" ? `active` : `item`}
            onClick={handleProfile}
          >
            <CgProfile />
            <p>Profile</p>
          </div>
        </div>
        <div className="logout" onClick={logout}>
          <p>Log Out</p>
        </div>
      </motion.div>
      <div className="empty" onClick={() => openBar()}></div>
    </Container>,
    document.querySelector("#portal")
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .empty {
    width: 47%;
    height: 100%;
  }

  .content {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
    background: var(--white);

    .logo {
      width: 100%;
      height: 15%;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .title {
      line-height: 50px;
      width: 90%;
      font-weight: bold;
      text-align: start;
    }

    .nav {
      width: 90%;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      p {
        margin: 0 6px;
        font-weight: 500;
        line-height: 50px;
      }

      .item {
        width: 100%;
        height: 30%;
        font-size: 1.1em;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
      }

      .active {
        width: 100%;
        height: 33%;
        font-size: 1.1em;
        color: var(--bright);
        font-weight: bold;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        border-right: 2px solid var(--bright);
      }
    }

    .logout {
      width: 90%;
      height: 30px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin: 20px 0;
      border-radius: 10px;
      background: var(--bright);
      color: var(--white);

      p {
      }
    }
  }
`;

export default SideBar;
