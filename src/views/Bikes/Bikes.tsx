import { Button } from '@chakra-ui/button'
import { Heading } from '@chakra-ui/layout'
import React from 'react'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import TableHeader from '../../layout/SideBar/TableHeader'
import BikesTable from './BikesTable.tsx/BikesTable'

const Bikes: React.FC = () => {
  return (
    <>
      <TableHeader>
        <Heading>Bikes</Heading>
        <Button
          background='green'
          color='white'
          _hover={{ backgroundColor: 'green.700' }}
          leftIcon={<BsFillPlusCircleFill />}
        >
          {' '}
          Create Bike
        </Button>
      </TableHeader>
      <BikesTable />
    </>
  )
}

export default Bikes
