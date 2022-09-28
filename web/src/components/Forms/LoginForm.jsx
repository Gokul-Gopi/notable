import { Button, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useAuth } from "../../context/AuthContext";
import { loginApi } from "../../services/user";
import { errorMessage, passwordRegex } from "../../utils/helpers";
import EmailInput from "../FormInputs/EmailInput";
import { PasswordInput } from "../FormInputs/PasswordInput";

const LoginForm = ({ openSignupForm, onClose }) => {
  const toast = useToast();
  const { setUserLogggedIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading } = useMutation(loginApi);

  const loginHandler = (data) => {
    mutate(data, {
      onSuccess: (response) => {
        const token = response?.data?.token;
        localStorage.setItem("userToken", token);
        onClose();
        setUserLogggedIn(true);
        toast({
          description: "Welcome back",
          status: "success",
          isClosable: true,
          duration: 3500,
        });
      },
      onError: (error) => {
        toast({
          description: errorMessage(error),
          status: "error",
          isClosable: true,
          duration: 5000,
        });
      },
    });
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
        rules={{
          required: {
            value: true,
            message: "New password requried",
          },
          pattern: {
            value: passwordRegex,
            message:
              "Min. 8 characters long, must include a number a special character",
          },
        }}
      />
      <Button
        type="submit"
        isLoading={isLoading}
        loadingText="Logging in.."
        width="100%"
        bg="brand.primary"
        color="white"
        my="0.6rem"
        fontWeight="500"
        fontSize="1.1rem"
        height="3rem"
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