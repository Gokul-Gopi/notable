import { Box, Button, Image } from "@chakra-ui/react";
import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import login from "../assets/login.svg";

export const NotLoggedInSVG = ({ openLoginFrom }) => {
  return (
    <>
      <Box>
        <Image
          boxSize={{ base: "15rem", md: "25rem" }}
          src={login}
          alt="login"
        />
      </Box>
      <Button
        onClick={openLoginFrom}
        bg="brand.primary"
        color="white"
        fontWeight="500"
        _hover={{ transform: "scale(1.1)" }}
        leftIcon={<AiOutlineLogin />}
      >
        Login
      </Button>
    </>
  );
};
