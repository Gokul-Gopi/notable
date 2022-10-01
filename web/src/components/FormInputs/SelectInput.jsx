import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  Select,
} from "@chakra-ui/react";

export const SelectInput = ({
  label,
  name,
  placeholder,
  register,
  errors,
  rules,
  options,
}) => {
  return (
    <FormControl isInvalid={errors[name] ? true : false} mb="1rem">
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Select placeholder={placeholder} {...register(name, rules)}>
          {options.map((e, i) => {
            return (
              <option key={`option${i}`} value={e.value}>
                {e.color}
              </option>
            );
          })}
        </Select>
      </InputGroup>
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
};
