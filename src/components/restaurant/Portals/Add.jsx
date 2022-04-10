import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ReactDom from "react-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import styled from "styled-components";

import axios from "../../../features/axios";

const Add = ({ close }) => {
  const [categories, setCategories] = useState([
    ...useSelector((state) => state.restaurant.restaurant.restaurant.dishTypes),
  ]);
  const [addedcategory, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("none");
  const [toppings, addTopping] = useState([{ name: "none", price: 0 }]);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState({});
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const { register, handleSubmit } = useForm();

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSelectedCategory(e.target.value);
  };

  const selectCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const addCategory = () => {
    setCategories([...categories, addedcategory]);
  };

  const handleTopping = () => {
    if (name.length > 0 && price.length > 0) {
      addTopping([...toppings, { name, price }]);
      setName("");
      setPrice("");
    }
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };

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

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("picture", file.file);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("discount", data.discount || 0);
    formData.append("category", selectedCategory);
    formData.append("toppings", JSON.stringify(toppings));

    await axios
      .post("/dish/add", formData, {
        headers: {
          auth: `${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response.data.status === "error") {
          toast.error("Try again...", {
            toastId: "customId",
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        } else {
          toast.success("Product created", {
            toastId: "customId",
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          close();
        }
      });
  };

  return ReactDom.createPortal(
    <Container>
      <form
        className="content"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className="top">
          <p>Add Product</p>
          <div className="close" onClick={() => close()}>
            <p>X</p>
          </div>
        </div>
        <div className="form">
          <div className="full">
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="OFF"
              placeholder="Product Name"
              {...register("name", {
                required: true,
              })}
            />
          </div>
          <div className="full">
            <textarea
              name="description"
              id="description"
              placeholder="Description"
              cols="50"
              rows="5"
              autoComplete="OFF"
              {...register("description", {
                required: true,
              })}
            ></textarea>
          </div>
          <div className="part">
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Price"
              autoComplete="OFF"
              {...register("price", {
                required: true,
              })}
            />
            <p>RWF</p>
          </div>
          <div className="part">
            <div className="part">
              <input
                type="number"
                name="discount"
                id="discount"
                autoComplete="OFF"
                placeholder="Discount"
                {...register("discount")}
              />
              <p>%</p>
            </div>
          </div>
        </div>
        <div className="category">
          <div className="list">
            <select
              name="category"
              id="category"
              {...register("category", { required: true })}
            >
              {/* <option value="none">none</option> */}
              {categories.map((category, index) => (
                <option
                  value={category}
                  key={index}
                  selected={category === selectedCategory}
                  onClick={selectCategory}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="add">
            <input
              type="text"
              name="add"
              id="add"
              autoComplete="OFF"
              placeholder="Category name"
              onChange={handleCategory}
            />
            <div onClick={addCategory}>Add</div>
          </div>
        </div>
        <div className="images">
          <div className="new">
            {file.hasOwnProperty("name") ? (
              <img src={file?.url} alt="product" />
            ) : (
              <p>Add an image</p>
            )}
          </div>
          <input type="file" onChange={handleFile} />
        </div>
        <div className="toppings">
          <div className="added">
            {toppings.map((topping, index) => (
              <div className="topping" key={index}>
                <p>
                  {topping?.name.length > 8
                    ? `${topping?.name.substr(0, 6)}...`
                    : topping?.name}
                </p>
                <span>{topping?.price} RWF</span>
              </div>
            ))}
          </div>
          <div className="add">
            <input
              type="text"
              placeholder="Top-up Name"
              value={name}
              onChange={handleName}
            />
            <div className="price">
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={handlePrice}
              />
              <p>RWF</p>
            </div>
            <button type="button" onClick={handleTopping}>
              Add
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="btn"
          disabled={loading ? `disabled` : ``}
        >
          {loading ? (
            <img src="/loader.svg" alt="loader" />
          ) : (
            <>
              <p>Publish</p>
            </>
          )}
        </button>
      </form>
      <div className="cancel" onClick={() => close()}></div>
    </Container>,
    document.querySelector("#portal")
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
  position: fixed;
  top: 0;

  .cancel {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: -100;
  }

  .content {
    width: 96vw;
    height: auto;
    padding: 10px 0;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    background: var(--white);

    .top {
      width: 92%;
      height: 40px;
      border-bottom: 2px solid var(--black);
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      font-weight: bold;

      .close {
        width: 25px;
        height: 25px;
        font-weight: bold;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid black;
      }
    }

    .form {
      width: 90%;
      height: 150px;
      margin: 20px 0 20px 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      input {
        height: 30px;
        background: var(--grayish);
        border: none;
        outline: none;
        border-radius: 3px;
        padding: 0 0 0 10px;
      }

      textarea {
        height: 70px;
        background: var(--grayish);
        border: none;
        outline: none;
        border-radius: 3px;
        padding: 10px 5px 0 5px;
      }

      .full {
        grid-column-start: 1;
        grid-column-end: 3;

        input,
        textarea {
          width: 100%;
        }
      }

      .part {
        width: 100%;
        height: 30px;
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;

        input {
          width: 82%;
        }
      }
    }

    .category {
      width: 90%;
      height: 30px;
      margin: 0 0 20px 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .list {
        width: 30%;
        height: 100%;

        select {
          width: 100%;
          height: 100%;
          border-radius: 5px;
          text-align: center;
          background: transparent;
          border: 1px solid dodgerblue;
        }
      }

      .add {
        width: 65%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        input {
          width: 70%;
          height: 100%;
          border-radius: 5px;
          text-align: center;
          background: transparent;
          border: 1px solid dodgerblue;
        }

        > div {
          width: 25%;
          height: 90%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: var(--bright);
          border-radius: 50px;
          color: var(--white);
        }
      }
    }

    .images {
      width: 90%;
      height: 150px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      .new {
        width: 100%;
        height: 75%;
        overflow: hidden;
        background: var(--grayish);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        img {
          width: 80%;
        }
      }

      input {
        width: 60%;
        height: 20%;
        border: none;
      }
    }

    .toppings {
      width: 90%;
      height: 150px;
      padding: 0 5px;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      background: var(--grayish);

      .added {
        width: 50%;
        padding: 10px 0 0 5px;
        height: 100%;
        overflow: scroll;

        .topping {
          width: 90%;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          border: 1px solid dodgerblue;
          border-radius: 4px;

          span {
            background: var(--bright);
            padding: 2px 5px;
            border-radius: 4px;
          }
        }
      }

      .add {
        width: 45%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        > input {
          width: 100%;
          height: 30px;
          margin: 10px 0 0 0;
          padding: 0 0 0 5px;
          border: 1px solid dodgerblue;
          border-radius: 4px;
        }

        .price {
          width: 100%;
          height: 30px;
          margin: 10px 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;

          > input {
            width: 80%;
            height: 100%;
            padding: 0 0 0 5px;
            border: 1px solid dodgerblue;
            border-radius: 4px;
          }
        }

        button {
          width: 70%;
          height: 25px;
          border-radius: 50px;
          border: none;
          background: var(--bright);
          color: var(--white);
        }
      }
    }

    .btn {
      width: 45%;
      height: 30px;
      margin: 10px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--edit);
      border: none;
      color: var(--white);
      border-radius: 50px;

      img {
        width: 40%;
      }
    }
  }
`;

export default Add;
