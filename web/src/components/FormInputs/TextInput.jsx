import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";

export const TextInput = ({
  label,
  name,
  type,
  placeholder,
  register,
  errors,
  rules,
  icon,
}) => {
  return (
    <FormControl isInvalid={errors[name] ? true : false} mb="1rem">
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={icon} />
        </InputLeftElement>
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
