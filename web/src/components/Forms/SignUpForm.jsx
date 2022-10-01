import React from "react";
import { Button, Text, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../FormInputs/PasswordInput";
import { useMutation } from "react-query";
import { signupApi } from "../../services/user";
import { emailRegex, errorMessage, passwordRegex } from "../../utils/helpers";
import { useAuth } from "../../context/AuthContext";
import { TextInput } from "../FormInputs/TextInput";
import { AiOutlineMail } from "react-icons/ai";

const SignUpForm = ({ openLoginForm, onClose }) => {
  const toast = useToast();
  const { setUserLogggedIn } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading } = useMutation(signupApi);

  const signupHandler = (data) => {
    mutate(data, {
      onSuccess: (response) => {
        const token = response?.data?.token;
        localStorage.setItem("userToken", token);
        onClose();
        setUserLogggedIn(true);
        toast({
          description: "Account created",
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
    <form onSubmit={handleSubmit(signupHandler)} style={{ width: "100%" }}>
      <TextInput
        label="Email"
        name="email"
        type="email"
        placeholder="Enter email"
        register={register}
        errors={errors}
        icon={AiOutlineMail}
        rules={{
          required: {
            value: true,
            message: "Email is required",
          },
          pattern: {
            value: emailRegex,
            message: "Invalid email",
          },
        }}
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
      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        placeholder="Confirm password"
        register={register}
        errors={errors}
        rules={{
          required: {
            value: true,
            message: "Confirm password",
          },
          validate: {
            value: (value) =>
              value !== watch("password") ? "Password doesn't match" : null,
          },
        }}
      />
      <Button
        type="submit"
        loadingText="Creating an account.."
        isLoading={isLoading}
        width="100%"
        bg="brand.primary"
        color="white"
        my="0.6rem"
        fontWeight="500"
        fontSize="1.1rem"
        height="3rem"
        _hover={{ bg: "brand.priamry" }}
      >
        Sign up
      </Button>

      <Text textAlign="center" my="0.6rem">
        Already have an account?
        <Text
          onClick={() => {
            openLoginForm();
            onClose();
          }}
          as="span"
          cursor="pointer"
          ml="0.4rem"
          color="brand.primary"
          fontWeight="bold"
        >
          Log in
        </Text>
      </Text>
    </form>
  );
};

export default SignUpForm;
