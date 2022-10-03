import { Box } from "@chakra-ui/react";
import React from "react";

const SelectedLabel = ({ label }) => {
  return (
    <Box
      width={{ base: "6rem", md: "10rem" }}
      textAlign="left"
      fontSize={{ base: "0.7rem", md: "0.9rem" }}
      py="0.2rem"
      px="0.6rem"
      borderRadius="5"
      height="min-content"
      background={label?.background}
      color="white"
    >
      {label?.name}
    </Box>
  );
};

export default SelectedLabel;
