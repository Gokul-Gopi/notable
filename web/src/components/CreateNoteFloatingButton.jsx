import { IconButton } from "@chakra-ui/react";
import React from "react";
import { IoAdd } from "react-icons/io5";

const CreateNoteFloatingButton = () => {
  return (
    <IconButton
      display={{ base: "block", md: "none" }}
      as={IoAdd}
      position="fixed"
      bottom="3%"
      right="3%"
      cursor="pointer"
      fontSize="1rem"
      p="0.4rem"
      borderRadius="2.5rem"
      bg="brand.primary"
      color="white"
      strokeWidth="2"
      height="2.5rem"
      width="2.5rem"
      transition="all 0.2s"
      _hover={{ background: "brand.primary" }}
    />
  );
};

export default CreateNoteFloatingButton;
