import { Button, Text } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import EmailInput from "./FormInputs/EmailInput";
import PasswordInput from "./FormInputs/PasswordInput";

const LoginForm = ({ openSignupForm, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginHandler = (data) => {
    console.log("login", data);
  };

  return (
    <form onSubmit={handleSubmit(loginHandler)} style={{ width: "100%" }}>
      <EmailInput
        label="Email"
        name="email"
        placeholder="Enter email"
        register={register}
        errors={errors}
      />
      <PasswordInput
        label="Password"
        name="password"
        placeholder="Enter password"
        register={register}
        errors={errors}
      />
      <Button
        type="submit"
        loadingText="Logging in.."
        width="100%"
        bg="brand.primary"
        color="white"
        my="0.6rem"
        fontWeight="500"
        fontSize="1.1rem"
      >
        Login
      </Button>

      <Text textAlign="center" my="0.6rem">
        Don't have an account?
        <Text
          onClick={() => {
            openSignupForm();
            onClose();
          }}
          as="span"
          cursor="pointer"
          ml="0.4rem"
          color="brand.primary"
          fontWeight="bold"
        >
          Sign up
        </Text>
      </Text>
    </form>
  );
};

export default LoginForm;
