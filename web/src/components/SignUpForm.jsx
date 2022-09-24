import React from "react";
import { Button, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import EmailInput from "./FormInputs/EmailInput";
import PasswordInput from "./FormInputs/PasswordInput";
import ConfirmPassword from "./FormInputs/ConfirmPassword";

const SignUpForm = ({ openLoginForm, onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const signupHandler = (data) => {
    console.log("signup", data);
  };

  return (
    <form onSubmit={handleSubmit(signupHandler)} style={{ width: "100%" }}>
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
      <ConfirmPassword
        label="Confirm Password"
        name="confirmpassword"
        placeholder="Confirm password"
        register={register}
        errors={errors}
        createdPassword={watch("password")}
      />
      <Button
        type="submit"
        loadingText="Creating an account.."
        width="100%"
        bg="brand.primary"
        color="white"
        my="0.6rem"
        fontWeight="500"
        fontSize="1.1rem"
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
