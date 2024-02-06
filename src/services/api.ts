import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.125:4000",
});

export default api;
