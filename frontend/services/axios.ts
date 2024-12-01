import axios from "axios";

export const requestConfig = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,

});
