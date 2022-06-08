import { Button } from '@chakra-ui/button'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Divider, HStack } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import React, { useEffect, useState } from 'react'
import { BsFillEyeFill, BsPencilFill, BsTrash } from 'react-icons/bs'
import Table from '../../../components/Table/Table'
import { User } from '../../../interfaces/UserInterface'
import { getAll, removeDoc } from '../../../services/helpers'

const roles = {
  user: 'User',
  admin: 'Admin',
}
const UsersTable: React.FC = () => {
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
      render: ({ rol }: User) => (
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w={'8rem'}>
            {roles[rol]}
          </MenuButton>
          <MenuList>
            <MenuItem>Manager</MenuItem>
            <MenuItem>User</MenuItem>
          </MenuList>
        </Menu>
      ),
    },
    {
      label: 'Actions',
      render: ({ id }: User) => (
        <HStack>
          <Button leftIcon={<BsFillEyeFill />}>See all reservations</Button>{' '}
          <Divider orientation='vertical' /> <Button leftIcon={<BsPencilFill />}>Edit</Button>{' '}
          <Divider orientation='vertical' />{' '}
          <Button leftIcon={<BsTrash />} onClick={() => removeDoc({ model: 'users', id })}>
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
