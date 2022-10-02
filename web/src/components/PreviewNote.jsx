import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AiOutlinePushpin, AiOutlineDelete } from "react-icons/ai";
import { BiExpandAlt } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { useMutation } from "react-query";
import { delteNote } from "../services/note";
import { errorMessage } from "../utils/helpers";
import { queryClient } from "../utils/queryClient";
import { GET_USER_NOTES } from "../utils/react-query-keys";

const PreviewNote = ({ noteDetails, openNote, setIdOfNoteOnView }) => {
  const toast = useToast();

  const { mutate } = useMutation(delteNote);
  const deleteNoteHandler = () => {
    mutate(noteDetails?._id, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_USER_NOTES);
        toast({
          description: "Noted deleted",
          status: "success",
          isClosable: true,
          duration: 3000,
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
    <Flex
      onClick={() => {
        openNote();
        setIdOfNoteOnView(noteDetails?._id);
      }}
      boxShadow={{ base: "none", md: "8px 6px 15px 2px rgba(0, 0, 0, 0.08)" }}
      direction="column"
      bg={noteDetails?.background}
      borderRadius="10"
      height={{ base: "12rem", md: "15rem" }}
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ boxShadow: "8px 6px 15px 2px rgba(0, 0, 0, 0.15)" }}
      width="100%"
      maxW="20.7rem"
    >
      <Flex
        justify="space-between"
        alignItems="center"
        borderBottom="4px"
        borderColor="white"
        pr="0.3rem"
      >
        <Text
          fontSize={{ base: "1.1rem", md: "1.4rem" }}
          fontWeight="bold"
          px={{ base: "1.2rem", md: "2rem" }}
          py={{ base: "0.5rem", md: "0.7rem" }}
          color="#b9b9b9"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
          minHeight={{ base: "2.7rem", md: "3.5rem" }}
        >
          {noteDetails?.title}
        </Text>
        <Menu placement="left-start">
          <MenuButton
            onClick={(e) => e.stopPropagation()}
            as={IconButton}
            aria-label="Options"
            icon={<BsThreeDots fontSize="1rem" color="#979797" />}
            background="transparent"
            _active={{ background: "transparent" }}
            _hover={{ background: "transparent" }}
          />
          <MenuList minWidth="10rem">
            <MenuItem
              icon={<BiExpandAlt color="#42b883" />}
              borderBottom="1px"
              borderColor="#dbdbdb"
              transition="0.2s"
              _hover={{
                transform: "translateX(5px)",
                background: "transparent",
              }}
            >
              View
            </MenuItem>
            <MenuItem
              onClick={(e) => e.stopPropagation()}
              icon={<AiOutlinePushpin color="#38598b" fontSize="1rem" />}
              borderBottom="1px"
              borderColor="#dbdbdb"
              transition="0.2s"
              _hover={{
                transform: "translateX(5px)",
                background: "transparent",
              }}
            >
              Pin
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                deleteNoteHandler();
              }}
              icon={<AiOutlineDelete color="#f95959" fontSize="1rem" />}
              transition="0.2s"
              _hover={{
                transform: "translateX(5px)",
                background: "transparent",
              }}
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Text
        px={{ base: "1.2rem", md: "2rem" }}
        py="1rem"
        height="55%"
        overflow="hidden"
      >
        {noteDetails?.note}
      </Text>
    </Flex>
  );
};

export default PreviewNote;
