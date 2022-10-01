import { invokeAxios } from "../utils/axios";

export const getLabels = async () => {
  try {
    const response = await invokeAxios("/user/label");
    return response;
  } catch (error) {
    throw error;
  }
};
