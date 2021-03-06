import { Button } from '@chakra-ui/button'
import { where } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { ImCancelCircle } from 'react-icons/im'
import { useParams } from 'react-router'
import Rating from '../../../components/Rating/Rating'
import Table from '../../../components/Table/Table'
import { useAuth } from '../../../context/AuthContext/AuthProvider'
import { Bike } from '../../../interfaces/BikeInterface'
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

  const onRateBike = ({
    bikeId,
    totalAmountOfRates,
    totalRateSum,
    newRate,
    reserveRating,
    reservationId,
  }: {
    bikeId: string
    totalAmountOfRates: number
    totalRateSum: number
    newRate: number
    reserveRating: number
    reservationId: string
  }) => {
    const newTotalAmountOfRates = totalAmountOfRates + (!reserveRating ? 1 : 0)
    const newTotalRateSum = totalRateSum + newRate - reserveRating
    const calcBikeRate = Math.ceil(newTotalRateSum / newTotalAmountOfRates)

    updateDoc({
      model: 'reservations',
      data: {
        id: reservationId,
        reserveRating: newRate,
      } as Reserve,
    })
    reservations.forEach(({ id: reservationId }) => {
      updateDoc({
        model: 'reservations',
        data: {
          id: reservationId,
          totalAmountOfRates: newTotalAmountOfRates,
          totalRateSum: newTotalRateSum,
        } as Reserve,
      })
    })

    updateDoc({
      model: 'bikes',
      data: {
        id: bikeId,
        totalAmountOfRates: newTotalAmountOfRates,
        totalRateSum: newTotalRateSum,
        rating: calcBikeRate,
      } as Bike,
    })
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
      label: 'From',
      render: ({ from }: any) => from.toDate().toDateString(),
    },
    {
      label: 'To',
      render: ({ to }: any) => to.toDate().toDateString(),
    },
    {
      label: 'Rate your bike',
      render: ({ reserveRating, totalAmountOfRates, totalRateSum, bike, id }: Reserve) => (
        <Rating
          stars={reserveRating}
          setStars={(stars: any) =>
            onRateBike({
              bikeId: bike,
              totalRateSum,
              totalAmountOfRates,
              newRate: stars,
              reserveRating,
              reservationId: id,
            })
          }
        />
      ),
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
        return where('userId', '==', authenticatedUser.id)
      }

      return null
    }
    const unsubscribe = getAll<Reserve>({
      model: 'reservations',
      setData: (data) => {
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
