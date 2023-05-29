import axios from "axios";

const api = axios.create({
  baseURL: "https://api-my-finance-production.up.railway.app",
});

export default api;
