import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { BsCircleFill } from "react-icons/bs";
import { IoColorPaletteOutline } from "react-icons/io5";

const BGColorSelect = ({ noteDetails, setNoteDetails }) => {
  const availableColorOptions = ["#eaf6f6", "#feffdf", "#e0ffcd", "#ffd8da"];

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={IconButton}
        icon={<IoColorPaletteOutline fontSize="1.4rem" />}
        bg="transparent"
        color="#979797"
        _hover={{ color: "brand.primary" }}
        _active={{ color: "brand.primary" }}
      >
        MenuItem
      </MenuButton>
      <MenuList display="flex">
        {availableColorOptions.map((color, i) => {
          return (
            <MenuItem
              onClick={() =>
                setNoteDetails((preState) => ({
                  ...preState,
                  background: color,
                }))
              }
              key={`color${i}`}
              value={color}
              width="auto"
              flex="1"
              transition="0.2s"
              _focus={{
                bg: "transparent",
              }}
              _active={{ bg: "transparent" }}
            >
              <Box
                border="1px"
                borderRadius="50%"
                p="0.2rem"
                borderColor={
                  noteDetails?.background === color ? "brand.primary" : "white"
                }
              >
                <BsCircleFill color={color} fontSize="1.9rem" />
              </Box>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default BGColorSelect;
