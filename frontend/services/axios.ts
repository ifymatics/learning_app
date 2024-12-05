import axios from "axios";

export const requestConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,

});
