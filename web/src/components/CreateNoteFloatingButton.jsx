import { IconButton } from "@chakra-ui/react";
import React from "react";
import { IoAdd } from "react-icons/io5";

const CreateNoteFloatingButton = () => {
  return (
    <IconButton
      as={IoAdd}
      position="fixed"
      bottom="6%"
      right="4%"
      cursor="pointer"
      fontSize="1rem"
      p="0.4rem"
      borderRadius="3rem"
      transform="scale(1.2)"
      bg="brand.primary"
      color="white"
      strokeWidth="2"
      height="3rem"
      width="3rem"
      transition="all 0.2s"
      _hover={{ background: "brand.primary", transform: "scale(1.3)" }}
    />
  );
};

export default CreateNoteFloatingButton;
