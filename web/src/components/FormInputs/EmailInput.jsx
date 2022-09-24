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
import { emailRegex } from "../../utils/helpers";

const EmailInput = ({ label, name, placeholder, register, errors }) => {
  return (
    <FormControl isInvalid={errors[name] ? true : false} mb="1rem">
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<AiOutlineMail />} />
        <Input
          type="email"
          name={name}
          placeholder={placeholder}
          {...register(name, {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: emailRegex,
              message: "Invalid email",
            },
          })}
        />
      </InputGroup>
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default EmailInput;
