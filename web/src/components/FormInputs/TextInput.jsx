import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { AiOutlineMail } from "react-icons/ai";

export const TextInput = ({
  label,
  name,
  type,
  placeholder,
  register,
  errors,
  rules,
}) => {
  return (
    <FormControl isInvalid={errors[name] ? true : false} mb="1rem">
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<AiOutlineMail />} />
        <Input
          type={type || "text"}
          name={name}
          placeholder={placeholder}
          {...register(name, rules)}
        />
      </InputGroup>
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
};
