import { Button } from '@chakra-ui/button'
import { Divider, HStack } from '@chakra-ui/layout'
import React, { useEffect, useState } from 'react'
import { BsFillEyeFill, BsPencilFill, BsTrash } from 'react-icons/bs'
import Table from '../../../components/Table/Table'
import { User } from '../../../interfaces/UserInterface'
import { getAll, removeDoc } from '../../../services/helpers'

const roles = {
  user: 'User',
  admin: 'Admin',
}

interface UserTableProps {
  onOpen: () => void
  setSelectedUserToEdit: (user: User) => void
}

const UsersTable: React.FC<UserTableProps> = ({ onOpen, setSelectedUserToEdit }) => {
  const [users, setUsers] = useState<User[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const columns = [
    {
      label: 'Full Name',
      render: ({ firstName, lastName }: User) => `${firstName} ${lastName}`,
    },
    {
      label: 'Email',
      render: ({ email }: any) => email,
    },
    {
      label: 'Rol',
      render: ({ rol }: User) => roles[rol],
    },
    {
      label: 'Actions',
      render: (user: User) => (
        <HStack>
          <Button leftIcon={<BsFillEyeFill />}>See all reservations</Button>{' '}
          <Divider orientation='vertical' />{' '}
          <Button
            onClick={() => {
              setSelectedUserToEdit(user)
              onOpen()
            }}
            leftIcon={<BsPencilFill />}
          >
            Edit
          </Button>{' '}
          <Divider orientation='vertical' />{' '}
          <Button leftIcon={<BsTrash />} onClick={() => removeDoc({ model: 'users', id: user.id })}>
            Delete
          </Button>
        </HStack>
      ),
    },
  ]

  useEffect(() => {
    const unsubscribe = getAll<User>({
      model: 'users',
      setData: (data) => {
        setUsers(data)
        setLoadingData(false)
      },
    })

    return () => {
      unsubscribe()
    }
  }, [])
  return <Table columns={columns} rows={users} loading={loadingData} />
}

export default UsersTable
