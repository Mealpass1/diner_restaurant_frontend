//packages
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

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
  const customId = "custom-id-yes";

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
      .post("/diner/login", {
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        setLoading(false);
        if (response.data.status === "error") {
          toast.error("Invalid email or password", {
            toastId: customId,
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        } else {
          setTimeout(() => {
            sessionStorage.setItem("token", response.data.data);
            subscribeUser("diner");
            router("/diner/explore");
          }, 2000);
          toast.success("Welcome back", {
            toastId: customId,
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("please try again...", {
          toastId: customId,
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      });
  };

  return (
    <Container>
      <button className="index" onClick={goBack}>
        <MdKeyboardBackspace />
      </button>
      <Logo />
      <div className="image">
        <img src={two} alt="two" />
      </div>
      <div className="form">
        <div className="text">
          <p className="title">Welcome back</p>
          <p className="para">Log in to access MealPass</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputs">
            <div className="row">
              <label htmlFor="username">
                <BiUserCheck />
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                autoComplete="OFF"
                {...register("username", {
                  required: true,
                })}
              />
            </div>
            {errors.username?.type === "required" && (
              <p className="error">Please enter your username</p>
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
          <Link className="forgot" to="/diner/forgotpassword">
            Forgot password?
          </Link>
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
          <Link to="/diner/signup">Sign Up</Link>
        </div>
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
    margin: 15px 0;

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

      .title {
        font-weight: 700;
      }

      .para {
        font-size: 1em;
      }
    }

    form {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

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

      .inputs {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        .error {
          color: var(--red);
        }

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
        display: flex;
        text-decoration: none;
        color: #000;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        font-weight: 700;
        background: var(--grayish);
      }
    }
  }
`;

export default Login;
