import axios from "axios";

export const requestConfig = axios.create({
  baseURL: "http://apptest-env.eba-nnj6adis.us-east-1.elasticbeanstalk.com",//process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,

});
