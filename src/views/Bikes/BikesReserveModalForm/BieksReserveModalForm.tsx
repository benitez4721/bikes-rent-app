import React, { useState } from 'react'
import { Button } from '@chakra-ui/button'
import { ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import Modal from '../../../components/Modal/Modal'
import { Form, Formik } from 'formik'
import 'react-datepicker/dist/react-datepicker.css'
import { createDoc, updateDoc } from '../../../services/helpers'
import { Bike } from '../../../interfaces/BikeInterface'
import DatePicker from '../../../components/DatePicker/DatePicker'
import { Reserve } from '../../../interfaces/ReserveInterface'
import { useAuth } from '../../../context/AuthContext/AuthProvider'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  selectedBikeToReserve: Bike | null
}
const BikesReserveModalForm: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  selectedBikeToReserve,
}) => {
  const [loading, setLoadign] = useState(false)
  const {
    user: { id, firstName, lastName, email },
  } = useAuth()

  const createReservation = async (values: any) => {
    try {
      setLoadign(true)
      const { id: bikeId, ...bikeAttr } = selectedBikeToReserve as Bike
      await createDoc<Reserve>({
        model: 'reservations',
        data: {
          ...values,
          ...bikeAttr,
          bike: bikeId,
          userId: id,
          userFirstName: firstName,
          userLastName: lastName,
          userEmail: email,
          reserveRating: 0,
        },
      })
      onClose()
    } catch (error) {
      console.log(error)
    } finally {
      setLoadign(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose()
      }}
    >
      <Formik
        onSubmit={createReservation}
        initialValues={{
          from: '',
          to: '',
        }}
      >
        <Form>
          <ModalHeader>Reserve Bike</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <DatePicker name='from' label='From' />
            <DatePicker name='to' label='To' />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} type={'submit'} isLoading={loading}>
              Reserve
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Formik>
    </Modal>
  )
}

export default BikesReserveModalForm
