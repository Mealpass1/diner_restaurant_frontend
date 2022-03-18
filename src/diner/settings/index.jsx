import React from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useNavigate } from "react-router";

import axios from "../../features/axios";

import { IoArrowBackOutline, IoNotificationsOutline } from "react-icons/io5";
import { BsShield } from "react-icons/bs";
import { HiOutlineChevronRight } from "react-icons/hi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BiUser, BiEdit } from "react-icons/bi";
import { FiLogOut, FiPhoneForwarded, FiSearch } from "react-icons/fi";

import Layout from "../../components/diner/Layout";

const Settings = () => {
  const router = useNavigate();

  const search = (key) => {
    console.log(key);
  };

  const goBack = () => {
    router(-1);
  };

  const logout = () => {
    const token = sessionStorage.getItem("token");
    axios
      .put("/diner/logout", {}, { headers: { auth: token } })
      .then((response) => {
        if (response.status !== "error") {
          sessionStorage.removeItem("token");
          toast.info("See you soon!", {
            toastId: "custom-id-yes",
            position: toast.POSITION.TOP_CENTER,
            onClose: 2000,
          });
          setTimeout(() => {
            router("/");
          }, 2000);
        } else {
          toast.error("Something went wrong!", {
            toastId: "custom-id-yes",
            position: toast.POSITION.TOP_CENTER,
            onClose: 2000,
          });
        }
      });
  };

  return (
    <Layout>
      <Top>
        <div className="back" onClick={goBack}>
          <IoArrowBackOutline />
        </div>
        <p>Settings</p>
        <div className="empty"></div>
      </Top>
      <Content>
        <div className="search">
          <FiSearch />
          <input
            type="text"
            placeholder="Search settings"
            onChange={(e) => search(e.target.value)}
          />
        </div>
        <div className="account">
          <p>Account</p>
          <div className="line">
            <BsShield />
            <p>Change Username os r Password</p>
          </div>
          <div className="line">
            <BiUser />
            <p>Switch account type</p>
          </div>
          <div className="line">
            <BiEdit />
            <p>Edit your Meal Menu</p>
          </div>
          <div className="line" onClick={logout}>
            <FiLogOut />
            <p>Sign Out</p>
          </div>
        </div>
        <div className="account">
          <p>App Settings</p>
          <div className="line">
            <IoNotificationsOutline />
            <p>Notifications</p>
          </div>
          <div className="line">
            <AiOutlineInfoCircle />
            <p>About the app</p>
          </div>
          <div className="line">
            <FiPhoneForwarded />
            <p>Chat with Admins</p>
          </div>
        </div>
        <div className="others">
          <div className="terms">
            <p>Terms and Conditions</p>
            <HiOutlineChevronRight />
          </div>
          <div className="terms">
            <p>Privacy Policy</p>
            <HiOutlineChevronRight />
          </div>
        </div>
        <div className="para">
          <p>
            Control settings for connected experiences across the Groovin
            application including the voting system and online shop.
          </p>
        </div>
      </Content>
    </Layout>
  );
};

const Top = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-around;
  background: var(--grayish);

  > div {
    width: 30%;
    height: 25px;
    font-size: 1.5em;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }

  p {
    width: 20%;
    height: 25px;
    font-size: 1.2em;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }
`;
const Content = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .search {
    width: 95%;
    height: 40px;
    border-radius: 5px;
    margin: 10px 0;
    font-size: 1.2em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background: var(--grayish);

    input {
      width: 85%;
      height: 100%;
      border: none;
      outline: none;
      background: transparent;
      font-size: 1em;
    }
  }

  .account {
    width: 95%;
    height: auto;
    margin: 10px 0;

    > p {
      font-weight: bold;
      line-height: 30px;
    }

    .line {
      width: 100%;
      height: 40px;
      border-bottom: 1px solid var(--grayish);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;

      p {
        margin: 0 10px;
      }
    }
  }
  .others {
    width: 95%;
    height: 70px;
    margin: 5px 0;

    .terms {
      width: 100%;
      height: 50%;
      padding: 0 5px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  .para {
    width: 95%;
    margin: 10px 0;
    text-align: center;
  }
`;

export default Settings;
