import { Button } from '@chakra-ui/button'
import { where } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { ImCancelCircle } from 'react-icons/im'
import { useParams } from 'react-router'
import Table from '../../../components/Table/Table'
import { useAuth } from '../../../context/AuthContext/AuthProvider'
import { Reserve } from '../../../interfaces/ReserveInterface'
import { getAll, removeDoc, updateDoc } from '../../../services/helpers'

const ReserversTable: React.FC = () => {
  const [reservations, setReservations] = useState<Reserve[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const { user: authenticatedUser, isAdmin } = useAuth()
  const { userId } = useParams()
  const cancelReservation = ({ id, bikeId }: { id: string; bikeId: string }) => {
    updateDoc({ model: 'bikes', data: { id: bikeId, reserved: false } })
    removeDoc({ model: 'reservations', id })
  }
  const columns = [
    {
      label: 'User',
      render: ({ userFirstName, userLastName }: Reserve) => `${userFirstName} ${userLastName}`,
    },
    {
      label: 'Model',
      render: ({ model }: Reserve) => model,
    },
    {
      label: 'Color',
      render: ({ color }: Reserve) => color,
    },
    {
      label: 'Location',
      render: ({ location }: Reserve) => location,
    },

    {
      label: 'From',
      render: ({ from }: any) => from.toDate().toDateString(),
    },
    {
      label: 'To',
      render: ({ to }: any) => to.toDate().toDateString(),
    },
    ...(!isAdmin
      ? [
          {
            label: 'Actions',
            render: ({ id, bike }: Reserve) => (
              <Button
                colorScheme='red'
                leftIcon={<ImCancelCircle />}
                onClick={() => cancelReservation({ id, bikeId: bike })}
              >
                Cancel
              </Button>
            ),
          },
        ]
      : []),
  ]

  useEffect(() => {
    const getQuery = () => {
      if (userId) {
        return where('userId', '==', userId)
      }
      if (!isAdmin) {
        console.log(authenticatedUser.id)
        return where('userId', '==', authenticatedUser.id)
      }

      return null
    }
    const unsubscribe = getAll<Reserve>({
      model: 'reservations',
      setData: (data) => {
        console.log(data)
        setReservations(data)
        setLoadingData(false)
      },
      query: getQuery(),
    })

    return () => unsubscribe()
  }, [])

  return (
    <>
      <Table columns={columns} rows={reservations} loading={loadingData} />
    </>
  )
}

export default ReserversTable
