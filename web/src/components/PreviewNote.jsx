import {
  Box,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {
  AiOutlinePushpin,
  AiOutlineDelete,
  AiFillPushpin,
} from "react-icons/ai";
import { BiExpandAlt } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useMutation } from "react-query";
import { delteNote, pinNote } from "../services/note";
import { errorMessage } from "../utils/helpers";
import { queryClient } from "../utils/queryClient";
import { GET_USER_NOTES } from "../utils/react-query-keys";

const PreviewNote = ({ noteDetails, openNote, setIdOfNoteOnView }) => {
  const toast = useToast();
  const bg = useColorModeValue(noteDetails?.background, "");
  const { colorMode } = useColorMode();

  const { mutate, isLoading: isDeleting } = useMutation(delteNote);
  const deleteNoteHandler = () => {
    mutate(noteDetails?._id, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_USER_NOTES);
        toast({
          description: "Noted deleted",
          status: "success",
          isClosable: true,
          duration: 2000,
        });
      },
      onError: (error) => {
        toast({
          description: errorMessage(error),
          status: "error",
          isClosable: true,
          duration: 4000,
        });
      },
    });
  };

  const { mutate: pinNoteMutate } = useMutation(pinNote);
  const pinUnpinHandler = () => {
    pinNoteMutate(noteDetails?._id, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_USER_NOTES);
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
      opacity={isDeleting ? 0.4 : 1}
      pos="relative"
      boxShadow={{
        base: "none",
        md:
          colorMode === "light"
            ? "8px 6px 15px 2px rgba(0, 0, 0, 0.08)"
            : "8px 6px 15px 2px rgba(0, 0, 0, 0.4)",
      }}
      direction="column"
      bg={bg}
      borderRadius="10"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{
        boxShadow: {
          base: "",
          md:
            colorMode === "light"
              ? "8px 6px 15px 2px rgba(0, 0, 0, 0.15)"
              : "4px 2px 15px 0px rgba(0, 96, 96, 1)",
        },
      }}
      height={{ base: "12rem", md: "15rem" }}
      width="100%"
      maxW="20.5rem"
      border={colorMode === "dark" && { base: "1px", md: "none" }}
    >
      <Flex
        justify="space-between"
        alignItems="center"
        borderBottom="4px"
        borderColor="white"
        pr="0.3rem"
      >
        <Text
          fontSize={{ base: "1rem", md: "1.4rem" }}
          fontWeight="bold"
          px={{ base: "1.1rem", md: "2rem" }}
          py={{ base: "0.5rem", md: "0.7rem" }}
          color="#8f8f8f"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
          minHeight={{ base: "2.7rem", md: "3.5rem" }}
          w={{ base: "5rem", md: "10rem" }}
        >
          {noteDetails?.title}
        </Text>

        <Flex align="center">
          {noteDetails?.pinned && (
            <Icon
              as={AiFillPushpin}
              w={{ base: "5", md: "6" }}
              h={{ base: "5", md: "6" }}
              color="#979797"
              cursor="initial"
            />
          )}

          <Menu>
            <MenuButton
              onClick={(e) => e.stopPropagation()}
              as={IconButton}
              aria-label="Options"
              icon={<BsThreeDotsVertical fontSize="1.2rem" color="#979797" />}
              background="transparent"
              _active={{ background: "transparent" }}
              _hover={{ background: "transparent" }}
              size="sm"
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
                onClick={(e) => {
                  e.stopPropagation();
                  pinUnpinHandler();
                }}
                icon={<AiOutlinePushpin color="#38598b" fontSize="1rem" />}
                borderBottom="1px"
                borderColor="#dbdbdb"
                transition="0.2s"
                _hover={{
                  transform: "translateX(5px)",
                  background: "transparent",
                }}
              >
                {noteDetails?.pinned ? "Unpin" : "Pin"}
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
      </Flex>

      <Text
        px={{ base: "1.1rem", md: "1.85rem", lg: "2rem" }}
        py={{ base: "0.6rem", md: "1rem" }}
        height={{ base: "65%", md: "55%" }}
        overflow="hidden"
        width="100%"
        mx="auto"
        textAlign={{ base: "justify", md: "left" }}
        wordBreak="break-all"
      >
        {noteDetails?.note}
      </Text>
      {noteDetails?.label?.background && (
        <Box
          display="inline-block"
          height={{ base: "0.4rem", md: "0.55rem" }}
          width={{ base: "3rem", md: "5rem" }}
          borderRadius="10"
          bg={noteDetails?.label?.background}
          bottom="4%"
          right="4%"
          pos="absolute"
        ></Box>
      )}
    </Flex>
  );
};

export default PreviewNote;
