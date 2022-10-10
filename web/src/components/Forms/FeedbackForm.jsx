import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { submitFeedback } from "../../services/user";
import { errorMessage } from "../../utils/helpers";

export const FeedbackForm = ({ onClose }) => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading } = useMutation(submitFeedback);
  const feedbackHandler = (data) => {
    mutate(data, {
      onSuccess: () => {
        toast({
          description: "Thank you for the feedback :)",
          status: "success",
          isClosable: true,
          duration: 3000,
        });
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
    <form onSubmit={handleSubmit(feedbackHandler)}>
      <FormControl isInvalid={errors["feedback"] ? true : false} mb="1rem">
        <FormLabel>Feedback</FormLabel>
        <Textarea
          resize="none"
          placeholder="Your feedback is valuable to me"
          {...register("feedback", {
            required: {
              value: true,
              message: "Please provide a feedback",
            },
          })}
        ></Textarea>
        <FormErrorMessage>{errors["feedback"]?.message}</FormErrorMessage>
      </FormControl>
      <Button
        isLoading={isLoading}
        type="submit"
        loadingText="Logging in.."
        width="100%"
        bg="brand.primary"
        color="white"
        my="0.6rem"
        fontWeight="500"
        fontSize="1.1rem"
        height="3rem"
      >
        Submit
      </Button>
    </form>
  );
};
