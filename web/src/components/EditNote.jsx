import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import "../index.css";
import BGColorSelect from "./BGColorSelect";
import LabelSelect from "./LabelSelect";

const EditNote = () => {
  const textRef = useRef();

  useEffect(() => {
    textRef.current.focus();
  }, []);

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
    >
      <Input
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

      {/* Used Text (<p>) with contenteditable being true instead of Textarea as Textarea would not grow with content, instead it make the element scrollable*/}
      <Text
        _focus={{
          border: "none",
          outline: "none",
        }}
        contentEditable
        p="1rem"
        ref={textRef}
        mb="1rem"
      ></Text>

      <Flex mx="0.6rem" justify="space-between" align="center">
        <Box>
          <BGColorSelect />
          <LabelSelect />
        </Box>
        <Button
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
