import { Box } from "@chakra-ui/react";
import React from "react";

const SelectedLabel = ({ label }) => {
  return (
    <Box
      width="min-content"
      textAlign="center"
      fontSize="0.9rem"
      py="0.2rem"
      px="0.6rem"
      borderRadius="10"
      height="min-content"
      background={label?.background}
      color="white"
    >
      {label?.name}
    </Box>
  );
};

export default SelectedLabel;
