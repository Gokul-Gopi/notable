import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    primary: "teal",
    light: "#bab8b7",
    bg: "#bab8b7",
  },
};

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({ colors, config });
