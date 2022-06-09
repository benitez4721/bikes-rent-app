import React, { useState } from 'react'
import { Button } from '@chakra-ui/button'
import { ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import Modal from '../../../components/Modal/Modal'
import PasswordField from '../../../components/PasswordField/PasswordField'
import { Field, Form, Formik } from 'formik'
import { createUser } from '../../../services/users/createUser'
import { createUserWithEmailAndPassword } from '@firebase/auth'
import { auth } from '../../../libs/firebase/config'
import Input from '../../../components/Input/Input'
import Select from '../../../components/Select/Select'
import { User } from '../../../interfaces/UserInterface'
import { updateDoc } from '../../../services/helpers'
import { required, validateEmail } from '../../../utils/validators'
import TextError from '../../../components/TextError'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  selectedUserToEdit: User | null
  setSelectedUserToEdit: (user: null) => void
}
const UserModalForm: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  selectedUserToEdit,
  setSelectedUserToEdit,
}) => {
  const [emailError, setEmailError] = useState('')
  const [loading, setLoadign] = useState(false)
  const execCreateOrUpdateUser = async (values: any) => {
    try {
      setLoadign(true)
      if (selectedUserToEdit) {
        await updateDoc({ model: 'users', data: values })
      } else {
        const response = await createUserWithEmailAndPassword(auth, values.email, values.password)
        await createUser({ id: response.user.uid, data: values })
      }
      onClose()
    } catch (error) {
      console.log(error)
      setEmailError('* Email already in use')
    } finally {
      setLoadign(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setSelectedUserToEdit(null)
        onClose()
      }}
    >
      <Formik
        onSubmit={execCreateOrUpdateUser}
        initialValues={
          selectedUserToEdit || {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            rol: 'user',
          }
        }
      >
        <Form onChange={() => setEmailError('')}>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input name='firstName' label='First name' validator={required} />
            <Input name='lastName' label='Last name' validator={required} />
            {!selectedUserToEdit && (
              <Field name='password' validate={required}>
                {({ field }: any) => <PasswordField {...field} mt={4} />}
              </Field>
            )}
            {!selectedUserToEdit && <Input name='email' label='Email' validator={validateEmail} />}
            <Select
              name='rol'
              label='Rol'
              options={[
                { value: 'user', label: 'User' },
                { value: 'admin', label: 'Admin' },
              ]}
            />

            {emailError && <TextError mt={'1rem'}>{emailError}</TextError>}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} type={'submit'} isLoading={loading}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Formik>
    </Modal>
  )
}

export default UserModalForm
