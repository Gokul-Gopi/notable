import { invokeAxios } from "../utils/axios";

export const getLabels = async () => {
  try {
    const response = await invokeAxios("/user/label");
    return response;
  } catch (error) {
    throw error;
  }
};

export const createlabel = async (data) => {
  try {
    const response = await invokeAxios("/user/label", data, "POST");
    return response;
  } catch (error) {
    throw error;
  }
};
