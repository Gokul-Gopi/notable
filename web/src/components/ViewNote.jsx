import {
  Button,
  Flex,
  Input,
  Text,
  Textarea,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import BGColorSelect from "./BGColorSelect";
import LabelSelect from "./LabelSelect";
import SelectedLabel from "./SelectedLabel";
import { useQuery, useMutation } from "react-query";
import { GET_USER_LABELS, GET_USER_NOTES } from "../utils/react-query-keys";
import { getUsetNotes, updateNote } from "../services/note";
import { useEffect } from "react";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import "../index.css";
import { getLabels } from "../services/label";
import { queryClient } from "../utils/queryClient";
import { defaultFieldValues, errorMessage } from "../utils/helpers";
import dayjs from "dayjs";

export const ViewNote = ({ noteId, isOpen, onClose }) => {
  const toast = useToast();
  const { colorMode } = useColorMode();
  const [noteDetails, setNoteDetails] = useState(defaultFieldValues);
  const bg = useColorModeValue(noteDetails?.background, "#131821");

  const { data: notes } = useQuery(GET_USER_NOTES, getUsetNotes, {
    select: (response) => response?.data?.data,
  });

  const { data } = useQuery(GET_USER_LABELS, getLabels, {
    select: (response) => response?.data?.data,
  });

  useEffect(() => {
    if (notes?.length > 0 && noteId) {
      const note = notes.find((e) => e._id === noteId);
      const detail = {
        title: note?.title,
        note: note?.note,
        background: note?.background,
        labelId: note?.label?._id,
        date: note?.createdAt,
      };

      setNoteDetails(detail);
    }
  }, [noteId, notes]);

  const { mutate, isLoading } = useMutation(updateNote);
  const updateNoteHandler = () => {
    delete noteDetails?.date;
    mutate(
      { ...noteDetails, id: noteId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(GET_USER_NOTES);
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
      }
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ base: "xl", md: "2xl" }}
    >
      <ModalOverlay />
      <ModalContent
        p="0"
        bg={bg}
        height="40vh"
        width={{ base: "90%", md: "100%" }}
        border={colorMode === "dark" ? "1px" : "none"}
      >
        <ModalBody
          display="flex"
          flexDir="column"
          px={{ base: "0.2rem", md: "1rem" }}
          borderRadius="10"
          py={{ base: "0", md: "2" }}
        >
          <Input
            onChange={(e) =>
              setNoteDetails((preState) => ({
                ...preState,
                title: e.target.value,
              }))
            }
            value={noteDetails?.title}
            placeholder="Title"
            border="none"
            outline="none"
            focusBorderColor="transparent"
            size="lg"
            borderBottom="1px"
            borderBottomColor="#979797"
            fontWeight="500"
            fontSize="1.2rem"
          />

          <Textarea
            className="custom-scroll-bar"
            onInput={(e) =>
              setNoteDetails((preState) => ({
                ...preState,
                note: e.target.value,
              }))
            }
            value={noteDetails?.note}
            flex="1"
            py="1rem"
            focusBorderColor="transparent"
            border="none"
            outline="none"
            resize="none"
          ></Textarea>
          <Text
            ml={{ base: "1rem", md: "0.6rem" }}
            mt="0.6rem"
            color="#979797"
            fontWeight="500"
            fontSize={{ base: "0.95rem", md: "1rem" }}
          >
            {dayjs(noteDetails?.date).format("lll")}
          </Text>
        </ModalBody>

        <ModalFooter
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px={{ base: "0.7rem", md: "1rem" }}
          pb={{ base: "2", md: "4" }}
          pt={{ base: "2", md: "1" }}
        >
          <Flex align="center">
            <BGColorSelect
              noteDetails={noteDetails}
              setNoteDetails={setNoteDetails}
            />
            <LabelSelect labels={data} setNoteDetails={setNoteDetails} />
            <SelectedLabel
              label={data?.find((e) => e._id === noteDetails?.labelId)}
            />
          </Flex>

          <Button
            onClick={updateNoteHandler}
            isLoading={isLoading}
            isDisabled={noteDetails?.note < 1}
            bg={{ base: "transparent", md: "brand.primary" }}
            color={{ base: "brand.primary", md: "white" }}
            fontWeight="500"
            _hover={{ background: "brand.primary" }}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
