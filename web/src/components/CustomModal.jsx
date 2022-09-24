import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const CustomModal = ({ children, title, isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            textAlign="center"
            color="brand.primary"
            fontWeight="500"
            fontSize="1.7rem"
            pb="0.5rem"
            pt="1.5rem"
          >
            {title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody px="3rem" py="1.5rem">
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
