import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import axios from "../../features/axios";
import { add } from "../../state/Reducers/Diner/Notifications";

import Layout from "../../components/diner/Layout";
import Top from "../../components/diner/top/Messages";
import Box from "../../components/diner/boxes/messages/Box";

const Messages = () => {
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .get("/notification/diner", { headers: { auth: `${token}` } })
      .then((response) => {
        if (response.data.status === "error") {
          toast.error("Please try again...", {
            toastId: "customId",
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        } else {
          setNotifications(response.data.data);
          dispatch(add(response.data.data));
        }
      });
  }, [dispatch]);

  return (
    <Layout>
      <Top />
      <Container>
        {notifications.length === 0 ? (
          <>
            <p>No messages yet...</p>
          </>
        ) : (
          <>
            {notifications.map((notification, index) => (
              <Box key={index} notification={notification} />
            ))}
          </>
        )}
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  margin: auto;
  padding: 5px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Messages;
