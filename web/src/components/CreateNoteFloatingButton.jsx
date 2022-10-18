import { IconButton } from "@chakra-ui/react";
import React from "react";
import { IoAdd } from "react-icons/io5";

const CreateNoteFloatingButton = ({ setCreateNewNote }) => {
  return (
    <IconButton
      onClick={() => setCreateNewNote(true)}
      display={{ base: "block", md: "none" }}
      as={IoAdd}
      position="fixed"
      bottom="4%"
      right="4%"
      cursor="pointer"
      fontSize="1rem"
      p="0.4rem"
      bg="brand.primary"
      color="white"
      strokeWidth="2"
      borderRadius="2.8rem"
      height="2.8rem"
      width="2.8rem"
      transition="all 0.2s"
      _hover={{ background: "brand.primary" }}
    />
  );
};

export default CreateNoteFloatingButton;
