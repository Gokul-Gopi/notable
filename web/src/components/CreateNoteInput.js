import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsPen } from "react-icons/bs";

const CreateNoteInput = () => {
  const [expandContainer, setExpandContainer] = useState(false);

  return (
    <InputGroup
      width="50rem"
      m="auto"
      my="3rem"
      boxShadow="4px 2px 5px 0px rgba(0, 0, 0, 0.08)"
      onClick={() => setExpandContainer(true)}
    >
      <Input placeholder="Take a note.." size="lg" borderRadius="10" />
      <InputRightElement
        children={<BsPen fontSize="1.1rem" />}
        color="#979797"
        mr="0.5rem"
        mt="0.1rem"
      />
    </InputGroup>
  );
};

export default CreateNoteInput;
