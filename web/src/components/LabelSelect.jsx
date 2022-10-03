import {
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { BiLabel } from "react-icons/bi";
import CustomModal from "./CustomModal";
import { CreateLabel } from "./Forms/CreateLabel";
import "../index.css";

const LabelSelect = ({ labels, setNoteDetails }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={IconButton}
        icon={<BiLabel fontSize="1.4rem" />}
        bg="transparent"
        color="#979797"
        _hover={{ color: "brand.primary" }}
        _active={{ color: "brand.primary" }}
      />
      <MenuList maxH="10rem" overflowY="auto" className="custom-scroll-bar">
        <MenuOptionGroup
          type="radio"
          onChange={(e) =>
            setNoteDetails((preState) => ({ ...preState, labelId: e }))
          }
        >
          {labels?.map((label, i) => {
            return (
              <MenuItemOption
                key={`label${i}`}
                py="0.2rem"
                px="0.8rem"
                value={label?._id}
              >
                <Text
                  fontSize="0.8rem"
                  // fontWeight="bold"
                  bg={label?.background}
                  color="white"
                  px="0.5rem"
                  py="0.2rem"
                  borderRadius="5"
                  width="90%"
                >
                  {label?.name}
                </Text>
              </MenuItemOption>
            );
          })}
        </MenuOptionGroup>

        <Text
          onClick={onOpen}
          cursor="pointer"
          mt="0.5rem"
          color="#979797"
          fontSize="0.9rem"
          pl="2rem"
          _hover={{ color: "brand.primary" }}
        >
          + Create custom
        </Text>
      </MenuList>
      <CustomModal
        title="Create custom label"
        isOpen={isOpen}
        onClose={onClose}
      >
        <CreateLabel onClose={onClose} />
      </CustomModal>
    </Menu>
  );
};

export default LabelSelect;
