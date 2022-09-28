import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  InputRightElement,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

export const PasswordInput = ({
  label,
  name,
  placeholder,
  rules,
  register,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl isInvalid={errors[name] ? true : false} mb="1rem">
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<RiLockPasswordLine />}
        />

        <Input
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          {...register(name, rules)}
        />
        <InputRightElement>
          <IconButton
            onClick={() => setShowPassword(!showPassword)}
            icon={showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            bg="transparent"
            _hover={{ bg: "transparent" }}
            _active={{ bg: "transparent" }}
            fontSize="1.1rem"
          />
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
};
