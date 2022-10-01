import {
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BiLabel } from "react-icons/bi";

const LabelSelect = ({ labels, setNoteDetails }) => {
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
      <MenuList>
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
                  fontSize="0.6rem"
                  fontWeight="bold"
                  bg={label?.background}
                  color="white"
                  px="0.3rem"
                  py="0.2rem"
                  borderRadius="5"
                  letterSpacing="0.8px"
                  width="max-content"
                >
                  {label?.name}
                </Text>
              </MenuItemOption>
            );
          })}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default LabelSelect;
