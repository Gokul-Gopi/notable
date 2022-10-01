import React from "react";
import { Box, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export const CreateLabel = () => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return <Box>CreateLabel</Box>;
};
