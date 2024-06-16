'use client'
import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import NewNoteForm from './new-note-form';


const NewNote = ({creator}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <div
    className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 text-sm font-medium  hover:text-blue-600 md:flex-none md:justify-start'
    >
      <Button
      className='w-full'
      variant='light'
      onPress={onOpen}>New Note +</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">The Note Log</ModalHeader>
                <ModalBody>
                    <NewNoteForm creator={creator} />
                </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default NewNote