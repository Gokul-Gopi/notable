import React from "react";
import { PasswordInput } from "../FormInputs/PasswordInput";
import { Button, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { errorMessage, passwordRegex } from "../../utils/helpers";
import { changePasswordApi } from "../../services/user";

const ChangePasswordForm = ({ onClose }) => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading } = useMutation(changePasswordApi);
  const changePassword = (data) => {
    mutate(data, {
      onSuccess: () => {
        onClose();
        toast({
          description: "Password changed successfully",
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
    <form onSubmit={handleSubmit(changePassword)} style={{ width: "100%" }}>
      <PasswordInput
        label="Old password"
        name="oldPassword"
        placeholder="Enter your old password"
        register={register}
        errors={errors}
        rules={{
          required: {
            value: true,
            message: "Old password requried",
          },
        }}
      />

      <PasswordInput
        label="New password"
        name="newPassword"
        placeholder="Enter new password"
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
        label="Confirm password"
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
              value !== watch("newPassword") ? "Password doesn't match" : null,
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
        Change password
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
