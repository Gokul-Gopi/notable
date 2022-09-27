import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_API_URL,
  timeout: 15000,
  headers: { "api-key": process.env.REACT_APP_PUBLIC_API_KEY },
});
