import { Button } from '@chakra-ui/button'
import { Checkbox } from '@chakra-ui/checkbox'
import { Divider, HStack } from '@chakra-ui/layout'
import { where } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { BsPencilFill, BsTrash } from 'react-icons/bs'
import Table from '../../../components/Table/Table'
import { useAuth } from '../../../context/AuthContext/AuthProvider'
import { Bike } from '../../../interfaces/BikeInterface'
import { getAll, removeDoc, updateDoc } from '../../../services/helpers'
import Rating from '../../../components/Rating/Rating'
import { Input, Box, Text } from '@chakra-ui/react'

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
  const [initialData, setInitialData] = useState<Bike[]>([])
  const { isAdmin } = useAuth()
  const [rateFilter, setRateFilter] = useState(0)

  const changeBikeAvaliability = async (bike: Bike) => {
    await updateDoc({ model: 'bikes', data: bike })
  }
  const handlerSearch = async (txt: { target: { value: string } }) => {
    const search = txt.target.value.toLocaleLowerCase()
    const filters = initialData.filter(
      (txt) =>
        txt.color.toLocaleLowerCase().includes(search) ||
        txt.location.toLocaleLowerCase().includes(search) ||
        txt.model.toLocaleLowerCase().includes(search),
    )
    setBikes(filters)
  }
  const columns = [
    { label: 'Model', render: ({ model }: any) => model },
    { label: 'Color', render: ({ color }: any) => color },
    { label: 'Location', render: ({ location }: any) => location },
    {
      label: 'Rating',
      render: (bike: Bike) => <Rating stars={bike.rating} disabled />,
    },
    ...(isAdmin
      ? [
          {
            label: 'Not available',
            render: (bike: Bike) => (
              <Checkbox
                isChecked={bike.reserved}
                onChangeCapture={({ target }: any) =>
                  changeBikeAvaliability({ ...bike, reserved: target.checked })
                }
              />
            ),
          },
        ]
      : []),
    isAdmin
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
        setInitialData(data)
        setBikes(data)
        setLoadingData(false)
      },
      query: !isAdmin ? where('reserved', '==', false) : null,
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const filterByRate = (rate: number) => {
    setRateFilter(rate)
    setBikes(() => initialData.filter(({ rating }) => rating == rate))
  }
  return (
    <>
      <Box pl={4} pt={4}>
        <Input placeholder='Search' size='sm' w='40%' onChange={handlerSearch} minWidth='250px' />
      </Box>
      <HStack pl={4} mt={4} gap={3}>
        <Text fontWeight='bold'>Filter by rate: </Text>
        <Rating stars={rateFilter} setStars={filterByRate} forceEnable />
        <Button
          size='sm'
          onClick={() => {
            setBikes(initialData)
            setRateFilter(0)
          }}
        >
          Clear
        </Button>
      </HStack>
      <Table columns={columns} rows={bikes} loading={loadingData} />
    </>
  )
}

export default BikesTable
