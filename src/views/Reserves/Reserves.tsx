import { Heading } from '@chakra-ui/layout'
import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useLocation, useNavigate } from 'react-router'
import { User } from '../../interfaces/UserInterface'
import TableHeader from '../../layout/SideBar/TableHeader'
import ReserversTable from './ReservesTable/ReserversTable'

const Reserves: React.FC = () => {
  const { state } = useLocation() as any
  const user = state?.user as User
  const navigate = useNavigate()
  return (
    <>
      <TableHeader justifyContent='flex-start' gap='1rem'>
        {user && <BsArrowLeft size='2rem' cursor='pointer' onClick={() => navigate(-1)} />}
        <Heading>
          {user ? `${user.firstName} ${user.lastName}'s reservations` : 'Reservations'}
        </Heading>
      </TableHeader>
      <ReserversTable />
    </>
  )
}

export default Reserves
