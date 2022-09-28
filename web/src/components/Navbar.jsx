import {
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { BsPen } from "react-icons/bs";
import { BiExit, BiSearchAlt, BiUserCircle } from "react-icons/bi";
import { MdPassword } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import CustomModal from "./CustomModal";
import ChangePasswordForm from "./Forms/ChangePasswordForm";

const Navbar = () => {
  const { logoutUser, isUserLoggedIn } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      py="1rem"
      px="2rem"
      bg="brand.primary"
      pos="relative"
      justify="space-between"
      align="center"
      zIndex="2"
      boxShadow="lg"
    >
      <Flex fontSize="2rem" align="center" color="white" flex="1">
        <Icon as={BsPen} mr="0.5rem" />
        <Text fontWeight="500">Notable</Text>
      </Flex>

      {isUserLoggedIn && (
        <>
          <Flex mr="1rem" width="25rem">
            <InputGroup>
              <Input
                placeholder="Search by title.."
                bg="white"
                _focus={{ outline: "none" }}
                fontSize="0.9rem"
              />
              <InputRightElement
                pointerEvents="none"
                children={<BiSearchAlt color="gray" fontSize="1.3rem" />}
              />
            </InputGroup>
          </Flex>

          <Flex>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<BiUserCircle size="lg" />}
                size="sm"
                background="transparent"
                color="white"
                _hover={{ cursor: "pointer", color: "#f9a8d4" }}
                _active={{ background: "brand.primary" }}
              />

              <MenuList zIndex="5">
                <MenuItem
                  onClick={onOpen}
                  _hover={{ paddingLeft: "1rem" }}
                  color="brand.primary"
                  transition="all 0.3s"
                  borderBottom="1px"
                  borderColor="#e1e1fb"
                  icon={<MdPassword fontSize="1.1rem" />}
                >
                  Change password
                </MenuItem>
                <MenuItem
                  onClick={logoutUser}
                  _hover={{ paddingLeft: "1rem" }}
                  color="brand.primary"
                  transition="all 0.3s"
                  icon={<BiExit fontSize="1.1rem" />}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
            <CustomModal
              title="Change Password"
              isOpen={isOpen}
              onClose={onClose}
            >
              <ChangePasswordForm onClose={onClose} />
            </CustomModal>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default Navbar;
