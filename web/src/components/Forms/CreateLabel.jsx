import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { TextInput } from "../FormInputs/TextInput";
import { SelectInput } from "../FormInputs/SelectInput";
import { BiLabel } from "react-icons/bi";
import { errorMessage, labelBackgroundOptions } from "../../utils/helpers";
import { useMutation } from "react-query";
import { createlabel } from "../../services/label";
import { queryClient } from "../../utils/queryClient";
import { GET_USER_LABELS } from "../../utils/react-query-keys";

export const CreateLabel = ({ onClose }) => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading } = useMutation(createlabel);
  const createLabelHandler = (data) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_USER_LABELS);
        onClose();
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
    <form onSubmit={handleSubmit(createLabelHandler)}>
      <TextInput
        name="name"
        label="Label name"
        placeholder="Enter label name"
        register={register}
        errors={errors}
        icon={BiLabel}
        rules={{
          required: {
            value: true,
            message: "Label name is required",
          },
        }}
      />

      <SelectInput
        name="background"
        label="Background color"
        placeholder="Select background"
        register={register}
        errors={errors}
        options={labelBackgroundOptions}
        rules={{
          required: {
            value: true,
            message: "Background is required",
          },
        }}
      />

      <Button
        type="submit"
        isLoading={isLoading}
        width="100%"
        bg="brand.primary"
        color="white"
        my="0.6rem"
        fontWeight="500"
        fontSize="1.1rem"
        height="3rem"
      >
        Create
      </Button>
    </form>
  );
};
