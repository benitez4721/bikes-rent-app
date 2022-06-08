import { Heading } from '@chakra-ui/layout'
import React from 'react'
import TableHeader from '../../layout/SideBar/TableHeader'
import ReserversTable from './ReservesTable/ReserversTable'

const Reserves: React.FC = () => {
  return (
    <>
      <TableHeader>
        <Heading>Rerserves</Heading>
      </TableHeader>
      <ReserversTable />
    </>
  )
}

export default Reserves
