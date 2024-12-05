import axios from "axios";

export const requestConfig = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true,

});
