import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_API_URL,
  timeout: 15000,
  headers: { "api-key": process.env.REACT_APP_PUBLIC_API_KEY },
});

export const invokeAxios = async (route, data = {}, method = "GET") => {
  try {
    return await axiosInstance({
      url: route,
      data,
      method,
    });
  } catch (error) {
    throw error;
  }
};
