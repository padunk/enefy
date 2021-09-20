import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal"
import React, { ReactElement } from "react"

interface Props {
  isOpen: boolean
  onClose: () => void
}

function Redirecting({ isOpen, onClose }: Props): ReactElement {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Redirecting</ModalHeader>
        <ModalBody>Please wait...</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Redirecting
