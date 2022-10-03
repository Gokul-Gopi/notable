import { Box, Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import "../index.css";
import BGColorSelect from "./BGColorSelect";
import { useMutation, useQuery } from "react-query";
import LabelSelect from "./LabelSelect";
import { GET_USER_LABELS, GET_USER_NOTES } from "../utils/react-query-keys";
import { getLabels } from "../services/label";
import SelectedLabel from "./SelectedLabel";
import { createNote } from "../services/note";
import { queryClient } from "../utils/queryClient";
import { errorMessage, randomBGColorSelect } from "../utils/helpers";

const EditNote = ({ setExpandContainer }) => {
  const toast = useToast();
  const textRef = useRef();
  const defaultFieldValues = {
    title: undefined,
    note: "",
    labelId: undefined,
    background: randomBGColorSelect(),
  };
  const [noteDetails, setNoteDetails] = useState(defaultFieldValues);

  const { data } = useQuery(GET_USER_LABELS, getLabels, {
    select: (response) => response?.data?.data,
  });

  useEffect(() => {
    textRef.current.focus();
  }, []);

  const { mutate, isLoading } = useMutation(createNote);
  const saveNote = () => {
    mutate(noteDetails, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_USER_NOTES);
        setNoteDetails(defaultFieldValues);
        setExpandContainer(false);
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
    <Box
      width="40rem"
      m="auto"
      my="3rem"
      pb="1rem"
      border="1px"
      borderColor="#dbdbdb"
      borderRadius="10"
      boxShadow="4px 2px 5px 0px rgba(0, 0, 0, 0.08)"
      bg={noteDetails?.background}
      display={{ base: "none", md: "block" }}
    >
      <Input
        onChange={(e) =>
          setNoteDetails((preState) => ({ ...preState, title: e.target.value }))
        }
        className="remove-outline-in-input"
        placeholder="Title"
        border="none"
        outline="none"
        borderBottom="2px"
        borderBottomColor="#dbdbdb"
        size="lg"
        _focus={{
          border: "none",
          outline: "none",
        }}
      />

      {/* Used Text (<p>) with contenteditable being true instead of Textarea as Textarea would not grow with content, instead it make the element scrollable.*/}
      <Text
        onInput={(e) =>
          setNoteDetails((preState) => ({
            ...preState,
            note: e.target.innerText,
          }))
        }
        ref={textRef}
        contentEditable={true}
        p="1rem"
        _focus={{
          border: "none",
          outline: "none",
        }}
      ></Text>

      <Flex mt="1rem" px="0.6rem" justify="space-between" align="center">
        <Flex align="center">
          <BGColorSelect
            noteDetails={noteDetails}
            setNoteDetails={setNoteDetails}
          />
          <LabelSelect labels={data} setNoteDetails={setNoteDetails} />
          <SelectedLabel
            label={data?.find((e) => e._id === noteDetails.labelId)}
          />
        </Flex>
        <Button
          onClick={saveNote}
          isLoading={isLoading}
          isDisabled={noteDetails?.note < 1}
          bg="brand.primary"
          color="white"
          fontWeight="500"
          _hover={{ background: "brand.primary" }}
        >
          Add note
        </Button>
      </Flex>
    </Box>
  );
};

export default EditNote;
