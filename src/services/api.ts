import axios from "axios";

const api = axios.create({
  baseURL: "https://api-my-finance.onrender.com",
});

export default api;
