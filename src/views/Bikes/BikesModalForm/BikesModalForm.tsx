import React, { useState } from 'react'
import { Button } from '@chakra-ui/button'
import { ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import Modal from '../../../components/Modal/Modal'
import { Form, Formik } from 'formik'
import Input from '../../../components/Input/Input'
import { createDoc, updateDoc } from '../../../services/helpers'
import { Bike } from '../../../interfaces/BikeInterface'
import { required } from '../../../utils/validators'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  selectedBikeToEdit: Bike | null
  setSelectedBikeToEdit: (user: null) => void
}
const BikesModalForm: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  selectedBikeToEdit,
  setSelectedBikeToEdit,
}) => {
  const [loading, setLoadign] = useState(false)

  const exexCreateOrUpdateBike = async (values: Bike) => {
    try {
      setLoadign(true)
      if (selectedBikeToEdit) {
        await updateDoc({ model: 'bikes', data: values })
      } else {
        await createDoc({ model: 'bikes', data: values })
      }
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
        setSelectedBikeToEdit(null)
        onClose()
      }}
    >
      <Formik
        onSubmit={exexCreateOrUpdateBike}
        initialValues={
          selectedBikeToEdit ||
          ({
            model: '',
            location: '',
            color: '',
            rating: 0,
            reserved: false,
            totalAmountOfRates: 0,
            totalRateSum: 0,
          } as Bike)
        }
      >
        <Form>
          <ModalHeader>New bike</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input name='model' label='Model' validator={required} />
            <Input name='color' label='Color' validator={required} />
            <Input name='location' label='Location' validator={required} />
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

export default BikesModalForm
