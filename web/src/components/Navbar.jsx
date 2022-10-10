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
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { BsPen, BsSun } from "react-icons/bs";
import { BiExit, BiMoon, BiSearchAlt, BiUserCircle } from "react-icons/bi";
import { MdPassword } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import CustomModal from "./CustomModal";
import ChangePasswordForm from "./Forms/ChangePasswordForm";
import "../index.css";
import { debounce } from "../utils/helpers";
import { queryClient } from "../utils/queryClient";
import { GET_USER_NOTES } from "../utils/react-query-keys";

const Navbar = ({ searchInput, setSearchInput }) => {
  const { logoutUser, isUserLoggedIn } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const searchNoteHandler = debounce((e) => {
    setSearchInput(e.target.value);
    queryClient.invalidateQueries(GET_USER_NOTES);
  }, 1000);

  return (
    <Flex
      py="1rem"
      px={{ base: "1.2rem", md: "2rem" }}
      bg="brand.primary"
      pos="relative"
      justify="space-between"
      align="center"
      zIndex="2"
      boxShadow="lg"
    >
      <Flex
        fontSize={{ base: "1.5rem", md: "2rem" }}
        align="center"
        color="white"
        flex="1"
      >
        <Icon as={BsPen} mr="0.5rem" />
        <Text fontWeight="500">Notable</Text>
      </Flex>

      {isUserLoggedIn && (
        <>
          <Flex
            mr="1rem"
            width="25rem"
            display={{ base: "none", md: "inline-block" }}
          >
            <InputGroup>
              <Input
                onChange={(e) => searchNoteHandler(e)}
                className="input-placeholder"
                placeholder="Search by title.."
                bg="white"
                _focus={{ outline: "none" }}
                fontSize="0.9rem"
                color="black"
              />
              <InputRightElement
                pointerEvents="none"
                children={<BiSearchAlt color="gray" fontSize="1.3rem" />}
              />
            </InputGroup>
          </Flex>

          <Flex gap="0.8rem">
            <IconButton
              onClick={toggleColorMode}
              icon={colorMode === "light" ? <BiMoon /> : <BsSun />}
              fontSize="1.6rem"
              size="sm"
              bg="transparent"
              color="white"
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
            />
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<BiUserCircle size="lg" />}
                size="sm"
                background="transparent"
                color="white"
                _active={{ background: "brand.primary" }}
                _hover={{ color: "white" }}
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
