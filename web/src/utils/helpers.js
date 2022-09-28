/* eslint-disable no-useless-escape */
export const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const errorMessage = (error) => {
  let message =
    error?.response?.data?.message ||
    error?.response?.message ||
    error?.response?.statusText ||
    error?.message ||
    "Something went wrong!";

  return message;
};
