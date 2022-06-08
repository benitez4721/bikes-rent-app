import React, { ReactNode } from 'react'
import { Modal as ModalComponent, ModalOverlay, ModalContent } from '@chakra-ui/react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children?: ReactNode
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>
      <ModalComponent
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>{children}</ModalContent>
      </ModalComponent>
    </>
  )
}

export default Modal
