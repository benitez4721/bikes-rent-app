import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { Heading } from '@chakra-ui/layout'
import React, { useState } from 'react'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { useAuth } from '../../context/AuthContext/AuthProvider'
import { Bike } from '../../interfaces/BikeInterface'
import TableHeader from '../../layout/SideBar/TableHeader'
import BikesModalForm from './BikesModalForm/BikesModalForm'
import BikesReserveModalForm from './BikesReserveModalForm/BikesReserveModalForm'
import BikesTable from './BikesTable.tsx/BikesTable'

const Bikes: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenReservation,
    onOpen: onOpenReservation,
    onClose: onCloseReservation,
  } = useDisclosure()
  const [selectedBikeToEdit, setSelectedBikeToEdit] = useState<Bike | null>(null)
  const [selectedBikeToReserve, setSelectedBikeToReserve] = useState<Bike | null>(null)
  const { isAdmin } = useAuth()
  return (
    <>
      <TableHeader>
        <Heading>Bikes</Heading>
        {isAdmin && (
          <Button
            background='green'
            color='white'
            _hover={{ backgroundColor: 'green.700' }}
            leftIcon={<BsFillPlusCircleFill />}
            onClick={onOpen}
          >
            Create Bike
          </Button>
        )}
      </TableHeader>
      <BikesTable
        setSelectedBikeToEdit={setSelectedBikeToEdit}
        onOpen={onOpen}
        onOpenReservation={onOpenReservation}
        setSelectedBikeToReserve={setSelectedBikeToReserve}
      />
      <BikesModalForm
        isOpen={isOpen}
        onClose={onClose}
        selectedBikeToEdit={selectedBikeToEdit}
        setSelectedBikeToEdit={setSelectedBikeToEdit}
      />
      <BikesReserveModalForm
        isOpen={isOpenReservation}
        onClose={onCloseReservation}
        selectedBikeToReserve={selectedBikeToReserve}
      />
    </>
  )
}

export default Bikes
