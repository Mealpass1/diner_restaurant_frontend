import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import styled from "styled-components";

import Nav from "../components/restaurant/Nav";

import axios from "../features/axios";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    location: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState({});

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const update = () => {
    const token = sessionStorage.getItem("token");
    const { id } = jwt_decode(token);
    setLoading(true);
    axios
      .put(
        `/restaurant/update/${id}`,
        {
          businessName: user.businessName,
          email: user.email,
          username: user.username,
          password: user.password,
          address: user.address,
          phone: user.phone,
          description: user.description,
          picture: file.file ? file.file : null,
        },
        {
          headers: {
            auth: `${token}`,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        toast.success("profile updated", {
          toastId: "custom-id-yes",
          position: toast.POSITION.TOP_CENTER,
          onClose: 1300,
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response);
        toast.error(err.message, {
          toastId: "custom-id-yes",
          position: toast.POSITION.TOP_CENTER,
          onClose: 2000,
        });
      });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const { id } = jwt_decode(token);
    axios
      .get(`/restaurant/${id}`, { headers: { auth: `${token}` } })
      .then((response) => {
        setUser({
          name: response.data.data.businessName,
          location: response.data.data.address,
          description: response.data.data.description,
          image: response.data.data.picture,
          email: response.data.data.email,
          username: response.data.data.username,
          password: response.data.data.password,
          phone: response.data.data.phone,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFile = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setFile({
        file: file,
        url: reader.result,
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Container>
      <Nav name="Profile" />
      <div className="image">
        <div className="real">
          {file.hasOwnProperty("name") ? (
            <img src={file?.url} alt="uploaded" />
          ) : (
            <img src={user?.image} alt="user" />
          )}
        </div>
        <input type="file" onChange={handleFile} />
      </div>
      <div className="form">
        <div className="row">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            value={user.name}
            onChange={onInputChange}
            name="name"
          />
        </div>
        <div className="row">
          <label htmlFor="name">Location:</label>
          <input
            type="text"
            value={user.location}
            onChange={onInputChange}
            name="location"
          />
        </div>
        <div className="row">
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            value={user.username}
            onChange={onInputChange}
            name="username"
          />
        </div>
        <div className="row">
          <label htmlFor="name">Email:</label>
          <input
            type="text"
            value={user.email}
            onChange={onInputChange}
            name="email"
          />
        </div>
        <div className="row">
          <label htmlFor="name">Phone Number:</label>
          <input
            type="text"
            value={user.phone}
            onChange={onInputChange}
            name="phone"
          />
        </div>
        <div className="row">
          <label htmlFor="name">Description:</label>
          <input
            type="text"
            value={user.description}
            onChange={onInputChange}
            name="description"
          />
        </div>
      </div>
      <div className="buttons">
        <button className="delete">Delete</button>
        <button
          className="update"
          onClick={update}
          disabled={loading ? `disabled` : ``}
        >
          {loading ? <img src="/loader.svg" alt="loader" /> : <>Update</>}
        </button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .image {
    width: 100vw;
    height: 140px;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .real {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: #d5e6e7;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    input {
      width: 80px;
      height: 20px;
      border: none;
      background: var(--opacity);
      border-radius: 5px;
    }
  }

  .form {
    width: 90%;
    height: auto;
    display: flex;
    flex-direction: column;

    .row {
      width: 100%;
      height: 50px;
      margin: 5px 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    label {
      font-weight: bold;
    }

    input {
      width: 65%;
      height: 70%;
      border: 1px solid var(--edit);
      outline: none;
      border-radius: 5px;
      padding: 0 0 0 10px;
    }
  }

  .buttons {
    width: 90vw;
    height: 35px;
    margin-top: 20px 0 10px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    button {
      width: 40%;
      height: 90%;
      border: none;
      border-radius: 5px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .delete {
      background: var(--red);
    }

    .update {
      background: var(--edit);
    }
  }
`;

export default Profile;
