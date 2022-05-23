import axios from "axios";

export default axios.create({
  baseURL: "https://meals-back.herokuapp.com",
});
