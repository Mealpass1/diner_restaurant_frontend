import React, { useState } from "react";
import ReactDom from "react-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

const Invite = ({ notification, cancel }) => {
  const [loading, setLoading] = useState(false);

  const variants = {
    initial: {
      scale: 0.1,
    },
    visible: {
      scale: 1,
    },
  };

  const accept = () => {
    console.log("done");
  };
  const decline = () => {};

  return ReactDom.createPortal(
    <Container>
      <motion.div
        className="content"
        variants={variants}
        initial="initial"
        animate="visible"
      >
        <p>
          {notification?.body}: {notification?.dish?.name}
        </p>
        {notification?.title == "Meal share" ? (
          <>
            <button className="accept" onClick={accept}>
              Accept
            </button>
            <button className="decline" onClick={decline}>
              Decline
            </button>
          </>
        ) : (
          <></>
        )}
      </motion.div>
      <div className="cancel" onClick={() => cancel()}></div>
    </Container>,
    document.querySelector("#portal")
  );
};

const Container = styled.div`
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);

  .cancel {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .content {
    width: 80vw;
    height: 50vh;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 10px;

    p {
      text-align: center;
    }

    p.bold {
      font-weight: bold;
      line-height: 30px;
      text-align: center;
    }

    button {
      width: 150px;
      height: 35px;
      border: none;
      border-radius: 5px;
    }

    .accept {
      margin: 5px 0;
      background: #27ae60;
    }

    .decline {
      margin: 5px 0;
      background: #f27e7e;
    }
  }
`;

export default Invite;
