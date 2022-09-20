import { Box, Flex, Icon, Input, Text, Textarea } from "@chakra-ui/react";
import { AiOutlinePushpin, AiFillPushpin } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

const Note = ({ noteDetails }) => {
  return (
    <Flex
      boxShadow="16px 14px 20px 2px rgba(0, 0, 0, 0.15)"
      direction="column"
      bg={noteDetails?.bgColor}
      borderRadius="10"
      height="15rem"
      pos="relative"
      cursor="pointer"
      transition="all 0.3s"
      _hover={{ transform: "scale(1.03)" }}
    >
      <Flex
        justify="space-between"
        alignItems="center"
        borderBottom="4px"
        borderColor="white"
        pr="0.8rem"
        maxW="20.5rem"
      >
        <Text
          fontSize="1.4rem"
          fontWeight="bold"
          px="2rem"
          py="0.7rem"
          color="#b9b9b9"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {noteDetails?.title}
        </Text>
        <Icon as={BsThreeDots} fontSize="1.5rem" color="#9ba6a5" />
      </Flex>

      <Text px="2rem" py="1rem" height="65%" overflow="hidden">
        {noteDetails?.note}
      </Text>
    </Flex>
  );
};

export default Note;
