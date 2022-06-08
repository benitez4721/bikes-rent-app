import { Button } from '@chakra-ui/button'
import { Heading } from '@chakra-ui/layout'
import React from 'react'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import UsersTable from './UsersTable/UsersTable'
import Modal from './Modal/Modal'
import { useDisclosure } from '@chakra-ui/hooks'
import TableHeader from '../../layout/SideBar/TableHeader'

const Users: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <TableHeader>
        <Heading>Users</Heading>
        <Button
          background='green'
          color='white'
          _hover={{ backgroundColor: 'green.700' }}
          leftIcon={<BsFillPlusCircleFill />}
          onClick={onOpen}
        >
          {' '}
          Create User
        </Button>
      </TableHeader>
      <UsersTable />
      <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  )
}

export default Users
