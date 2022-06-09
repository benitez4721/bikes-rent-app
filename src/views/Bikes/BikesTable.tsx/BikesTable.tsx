import { Button } from '@chakra-ui/button'
import { Checkbox } from '@chakra-ui/checkbox'
import { Divider, HStack } from '@chakra-ui/layout'
import React, { useEffect, useState } from 'react'
import { BsPencilFill, BsTrash } from 'react-icons/bs'
import Table from '../../../components/Table/Table'
import { useAuth } from '../../../context/AuthContext/AuthProvider'
import { Bike } from '../../../interfaces/BikeInterface'
import { getAll, removeDoc, updateDoc } from '../../../services/helpers'
import Rating from '../../../components/Rating/Rating'

interface BikesTableProps {
  onOpen: () => void
  setSelectedBikeToEdit: (bike: Bike) => void
  onOpenReservation: () => void
  setSelectedBikeToReserve: (bike: Bike) => void
}
const BikesTable: React.FC<BikesTableProps> = ({
  onOpen,
  setSelectedBikeToEdit,
  onOpenReservation,
  setSelectedBikeToReserve,
}) => {
  const [bikes, setBikes] = useState<Bike[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const { user } = useAuth()

  const changeBikeAvaliability = async (bike: Bike) => {
    await updateDoc({ model: 'bikes', data: bike })
  }
  const changeBikeRating = async (rating: Bike) => {
    await updateDoc({ model: 'bikes', data: rating })
  }
  const columns = [
    { label: 'Model', render: ({ model }: any) => model },
    { label: 'Color', render: ({ color }: any) => color },
    { label: 'Location', render: ({ location }: any) => location },
    {
      label: 'Rating',
      render: (bike: Bike) => (
        <Rating
          stars={bike.rating}
          setStars={(stars: any) => changeBikeRating({ ...bike, rating: stars })}
        />
      ),
    },
    {
      label: 'Avaliable',
      render: (bike: Bike) => (
        <Checkbox
          isChecked={bike.reserved}
          onChangeCapture={({ target }: any) =>
            changeBikeAvaliability({ ...bike, reserved: target.checked })
          }
        />
      ),
    },
    user.rol === 'admin'
      ? {
          label: 'Actions',
          render: (bike: Bike) => (
            <HStack>
              <Divider orientation='vertical' />{' '}
              <Button
                onClick={() => {
                  setSelectedBikeToEdit(bike)
                  onOpen()
                }}
                leftIcon={<BsPencilFill />}
              >
                Edit
              </Button>{' '}
              <Divider orientation='vertical' />{' '}
              <Button
                leftIcon={<BsTrash />}
                onClick={() => removeDoc({ model: 'bikes', id: bike.id })}
              >
                Delete
              </Button>
            </HStack>
          ),
        }
      : {
          label: 'Actions',
          render: (bike: Bike) => (
            <Button
              onClick={() => {
                onOpenReservation()
                setSelectedBikeToReserve(bike)
              }}
              leftIcon={<BsPencilFill />}
            >
              Reserve
            </Button>
          ),
        },
  ]

  useEffect(() => {
    const unsubscribe = getAll<Bike>({
      model: 'bikes',
      setData: (data) => {
        setBikes(data)
        setLoadingData(false)
      },
    })

    return () => {
      unsubscribe()
    }
  }, [])
  return <Table columns={columns} rows={bikes} loading={loadingData} />
}

export default BikesTable
