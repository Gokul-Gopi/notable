/* eslint-disable no-useless-escape */
export const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const availableColorOptions = [
  "#eaf6f6",
  "#feffdf",
  "#e0ffcd",
  "#ffd8da",
];

export const labelBackgroundOptions = [
  { color: "red", value: "red" },
  { color: "blue", value: "blue" },
  { color: "green", value: "green" },
];

export const errorMessage = (error) => {
  let message =
    error?.response?.data?.message ||
    error?.response?.message ||
    error?.response?.statusText ||
    error?.message ||
    "Something went wrong!";

  return message;
};

export const randomBGColorSelect = () => {
  const numberOfAvailableColors = availableColorOptions.length;
  const randomIndex = Math.floor(Math.random() * numberOfAvailableColors) || 0;
  return availableColorOptions[randomIndex];
};
