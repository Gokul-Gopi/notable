/* eslint-disable no-useless-escape */
export const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const availableColorOptions = [
  "#eaf6f6",
  "#feffdf",
  "#e0ffcd",
  "#ffe9e3",
  "#f2f2f2",
];

export const labelBackgroundOptions = [
  { color: "#854836", value: "Color #1" },
  { color: "#42b883", value: "Color #2" },
  { color: "#c51350", value: "Color #3" },
  { color: "#5a37c3", value: "Color #4" },
  { color: "#232931", value: "Color #4" },
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

export const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, delay);
  };
};

export const defaultFieldValues = {
  title: undefined,
  note: "",
  labelId: undefined,
  background: "#feffdf",
};
