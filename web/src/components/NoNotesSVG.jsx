import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import noNotes from "../assets/no-notes.svg";

export const NoNotesSVG = () => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      height={{ base: "80vh", md: "auto" }}
    >
      <Image
        boxSize={{ base: "14rem", md: "20rem" }}
        src={noNotes}
        alt="no notes"
      />
      <Text mt="3rem" color="teal.300" fontSize="1.4rem" fontWeight="500">
        Wow such empty..
      </Text>
    </Flex>
  );
};
