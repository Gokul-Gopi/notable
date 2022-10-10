import { invokeAxios } from "../utils/axios";

export const signupApi = async (data) => {
  try {
    const response = await invokeAxios("/auth/signup", data, "POST");
    return response;
  } catch (error) {
    throw error;
  }
};

export const loginApi = async (data) => {
  try {
    const response = await invokeAxios("/auth/login", data, "POST");
    return response;
  } catch (error) {
    throw error;
  }
};

export const changePasswordApi = async (data) => {
  try {
    const response = await invokeAxios("/auth/changepassword", data, "PUT");
    return response;
  } catch (error) {
    throw error;
  }
};

export const submitFeedback = async (data) => {
  try {
    const response = await invokeAxios("/user/feedback", data, "POST");
    return response;
  } catch (error) {
    throw error;
  }
};
