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
        <ModalContent width="90%">
          <ModalHeader
            textAlign="center"
            color="brand.primary"
            fontWeight="500"
            fontSize={{ base: "1.3rem", md: "1.7rem" }}
            pb={{ base: "0", md: "0.5rem" }}
            pt="1.5rem"
          >
            {title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            px={{ base: "1.5rem", md: "3rem" }}
            py={{ base: "1.5rem", md: "2.5rem" }}
          >
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
