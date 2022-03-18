//packages
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";

//icons
import { BiUserCheck } from "react-icons/bi";
import { FiLock } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import { MdKeyboardBackspace } from "react-icons/md";

//features
import axios from "../features/axios";
import { subscribeUser } from "../subscription";

//components
import Logo from "../components/Logo";
import two from "../images/two.png";

const Login = () => {
  const router = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const goBack = () => {
    router("/");
  };

  const onSubmit = async (data) => {
    setLoading(true);

    await axios
      .post("/restaurant/login", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        setLoading(false);
        if (response.data.status === "error") {
          toast.error("Invalid email or password", {
            toastId: "customId",
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        } else {
          setTimeout(() => {
            sessionStorage.setItem("token", response.data.data);
            subscribeUser("restaurant");
            router("/restaurant/requests");
          }, 2000);
          toast.success("Welcome back", {
            toastId: "customId",
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Please try again...", {
          toastId: "customId",
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      });
  };

  return (
    <Container>
      <button onClick={goBack} className="index">
        <MdKeyboardBackspace />
      </button>
      <Logo />
      <div className="image">
        <img src={two} alt="two" />
      </div>
      <div className="form">
        <div className="text">
          <p className="title">Log in as a restaurant</p>
          <p>Log in to access your MealPass Dashboard</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputs">
            <div className="row">
              <label htmlFor="email">
                <BiUserCheck />
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                autoComplete="OFF"
                {...register("email", {
                  required: true,
                })}
              />
            </div>
            {errors.email?.type === "required" && (
              <p className="error">Please enter your email</p>
            )}
            <div className="row">
              <label htmlFor="password">
                <FiLock />
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                autoComplete="OFF"
                {...register("password", {
                  required: true,
                })}
              />
              <label htmlFor="password" onClick={handleShowPassword}>
                <AiOutlineEye />
              </label>
            </div>
            {errors.password?.type === "required" && (
              <p className="error">Please enter your password</p>
            )}
          </div>
          <Link to="/restaurant/forgotpassword">Forgot password?</Link>
          <button type="submit" disabled={loading ? `disabled` : ``}>
            {loading ? (
              <img src="/loader.svg" alt="loader" />
            ) : (
              <>
                <p>Log In</p>
              </>
            )}
          </button>
        </form>
        <div className="login">
          <p>Dont have an account?</p>
          <Link to="/restaurant/signup">Sign Up</Link>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  @media only screen and (max-width: 416px) {
    width: 100vw;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background: var(--white);

    .index {
      margin: 10px 0 10px -70%;
      width: 60px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4em;
      border: none;
      border-radius: 5px;
    }

    .image {
      width: 50%;
      height: 10em;
      margin: 15px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .form {
      width: 90%;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;

      .text {
        width: 100%;
        height: 60px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

        .title {
          font-weight: bold;
        }
      }

      form {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        .inputs {
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;

          .row {
            width: 100%;
            height: 50px;
            display: flex;
            flex-direction: row;
            align-items: center;
            background: var(--grayish);
            padding: 0 15px;
            border-radius: 8px;
            margin: 5px 0;

            label {
              font-size: 1.4em;
              color: #828282;
            }

            input {
              margin: 0 15px;
              width: 80%;
              height: 80%;
              border: none;
              background: transparent;
              outline: none;
            }
          }
          .error {
            color: red;
            margin: 2px 0 2px 0;
          }
        }

        button {
          width: 100%;
          height: 45px;
          font-size: 1em;
          font-weight: 700;
          border: none;
          border-radius: 5px;
          background: var(--gray);
          margin: 10px 0 5px 0;

          img {
            width: 10%;
            height: 100%;
          }
        }

        a {
          height: 15px;
          width: 100%;
          text-decoration: none;
          color: #000;
          padding: 0 5px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
      }
      .login {
        width: 100%;
        height: 70px;
        font-weight: 400;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        p {
          line-height: 10px;
        }

        a {
          width: 100%;
          height: 45px;
          color: #000;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          font-weight: 700;
          background: var(--grayish);
        }
      }
    }
  }
`;

export default Login;
