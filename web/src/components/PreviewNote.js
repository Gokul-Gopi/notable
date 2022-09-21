import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { AiOutlinePushpin, AiOutlineDelete } from "react-icons/ai";
import { BiExpandAlt } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";

const PreviewNote = ({ noteDetails }) => {
  return (
    <Flex
      boxShadow="8px 6px 15px 2px rgba(0, 0, 0, 0.08)"
      direction="column"
      bg={noteDetails?.bgColor}
      borderRadius="10"
      height="15rem"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ boxShadow: "8px 6px 15px 2px rgba(0, 0, 0, 0.15)" }}
      width="100%"
    >
      <Flex
        justify="space-between"
        alignItems="center"
        borderBottom="4px"
        borderColor="white"
        pr="0.3rem"
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
          {noteDetails?.title}ssssssssssss
        </Text>
        <Menu placement="left-start">
          <MenuButton
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

      <Text px="2rem" py="1rem" height="55%" overflow="hidden">
        {noteDetails?.note}
      </Text>
    </Flex>
  );
};

export default PreviewNote;
