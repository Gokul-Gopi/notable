import {
  Input,
  InputGroup,
  InputRightElement,
  useColorMode,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsPen } from "react-icons/bs";
import EditNote from "./EditNote";

const CreateNoteInput = () => {
  const { colorMode } = useColorMode();
  const [expandContainer, setExpandContainer] = useState(false);

  if (expandContainer) {
    return <EditNote openBlankNote={setExpandContainer} />;
  }

  return (
    <InputGroup
      display={{ base: "none", md: "block" }}
      maxWidth="40rem"
      m="auto"
      my="3rem"
      boxShadow="4px 2px 5px 0px rgba(0, 0, 0, 0.08)"
      onClick={() => setExpandContainer(true)}
      _hover={
        colorMode === "dark" && {
          boxShadow: "4px 2px 5px 0px rgba(0, 96, 96, 1)",
        }
      }
      borderRadius="1rem"
    >
      <Input placeholder="Take a note.." size="lg" borderRadius="10" />
      <InputRightElement
        children={<BsPen fontSize="1.1rem" />}
        color="#979797"
        mr="0.5rem"
        mt="0.1rem"
        zIndex="1"
      />
    </InputGroup>
  );
};

export default CreateNoteInput;
