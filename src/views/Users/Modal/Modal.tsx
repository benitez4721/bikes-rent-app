import React, { useState } from 'react'
import { Button } from '@chakra-ui/button'
import {
  Modal as ModalComponent,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'
import PasswordField from '../../../components/PasswordField/PasswordField'
import { Field, Form, Formik } from 'formik'
import { createUser } from '../../../services/users/createUser'
import { createUserWithEmailAndPassword } from '@firebase/auth'
import { auth } from '../../../libs/firebase/config'
import Input from '../../../components/Input/Input'
import Select from '../../../components/Select/Select'

interface ModalProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [creatingUser, setCreatingUser] = useState(false)

  const execCreateUser = async (values: any) => {
    try {
      setCreatingUser(true)
      const response = await createUserWithEmailAndPassword(auth, values.email, values.password)
      await createUser({ id: response.user.uid, data: values })
      onClose()
    } catch (error) {
      console.log(error)
    } finally {
      setCreatingUser(false)
    }
  }

  return (
    <>
      <ModalComponent
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <Formik
            onSubmit={execCreateUser}
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              rol: 'user',
            }}
          >
            <Form>
              <ModalHeader>Create your account</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Input name='firstName' label='First name' />
                <Input name='lastName' label='Last name' />
                <Field name='password'>
                  {({ field }: any) => <PasswordField {...field} mt={4} />}
                </Field>
                <Input name='email' label='Email' />
                <Select
                  name='rol'
                  label='Rol'
                  options={[
                    { value: 'user', label: 'User' },
                    { value: 'admin', label: 'Admin' },
                  ]}
                />
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} type={'submit'} isLoading={creatingUser}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </Form>
          </Formik>
        </ModalContent>
      </ModalComponent>
    </>
  )
}

export default Modal
