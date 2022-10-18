import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { BiLabel } from "react-icons/bi";
import CustomModal from "./CustomModal";
import { CreateLabel } from "./Forms/CreateLabel";
import "../index.css";
import { IoClose } from "react-icons/io5";
import { useMutation } from "react-query";
import { deleteLabelApi } from "../services/user";
import { queryClient } from "../utils/queryClient";
import { GET_USER_LABELS, GET_USER_NOTES } from "../utils/react-query-keys";
import { errorMessage } from "../utils/helpers";

const LabelSelect = ({ labels, setNoteDetails }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const { mutate } = useMutation(deleteLabelApi);
  // const deleteLabelHandler = (event, labelId) => {
  //   event.stopPropagation();
  //   mutate(labelId, {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(GET_USER_LABELS);
  //       queryClient.invalidateQueries(GET_USER_NOTES);
  //     },
  //     onError: (error) => {
  //       toast({
  //         description: errorMessage(error),
  //         status: "error",
  //         isClosable: true,
  //         duration: 5000,
  //       });
  //     },
  //   });
  // };

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
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  fontSize="0.8rem"
                  bg={label?.background}
                  color="white"
                  px="0.5rem"
                  py="0.2rem"
                  borderRadius="5"
                  width="90%"
                >
                  <Text as="span"> {label?.name} </Text>
                  {/* <Icon
                    as={IoClose}
                    onClick={(e) => deleteLabelHandler(e, label?._id)}
                  /> */}
                </Text>
              </MenuItemOption>
            );
          })}
        </MenuOptionGroup>

        <Text
          onClick={onOpen}
          cursor="pointer"
          mt="0.5rem"
          fontSize="0.9rem"
          pl="2rem"
          color="brand.primary"
        >
          + Create label
        </Text>
      </MenuList>
      <CustomModal title="Create  label" isOpen={isOpen} onClose={onClose}>
        <CreateLabel onClose={onClose} />
      </CustomModal>
    </Menu>
  );
};

export default LabelSelect;
