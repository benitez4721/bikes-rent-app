import { Button } from '@chakra-ui/button'
import { Heading } from '@chakra-ui/layout'
import React, { useState } from 'react'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import UsersTable from './UsersTable/UsersTable'
import { useDisclosure } from '@chakra-ui/hooks'
import TableHeader from '../../layout/SideBar/TableHeader'
import UserModalForm from './UserModalForm/UserModalForm'
import { User } from '../../interfaces/UserInterface'

const Users: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedUserToEdit, setSelectedUserToEdit] = useState<User | null>(null)
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
      <UsersTable onOpen={onOpen} setSelectedUserToEdit={setSelectedUserToEdit} />
      <UserModalForm
        isOpen={isOpen}
        onClose={onClose}
        selectedUserToEdit={selectedUserToEdit}
        setSelectedUserToEdit={setSelectedUserToEdit}
      />
    </>
  )
}

export default Users
