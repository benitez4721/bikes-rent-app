import React from 'react'
import Table from '../../../components/Table/Table'

const ReserversTable: React.FC = () => {
  const columns = [
    {
      label: 'Reservation ID',
      render: ({ id }: any) => id,
    },
    {
      label: 'User full name',
      render: ({ fullName }: any) => fullName,
    },
    {
      label: 'email',
      render: ({ email }: any) => email,
    },
    {
      label: 'Bike ID',
      render: ({ bikeId }: any) => bikeId,
    },

    {
      label: 'Start date',
      render: ({ startDate }: any) => startDate,
    },
    {
      label: 'End date',
      render: ({ endDate }: any) => endDate,
    },
  ]

  const rows = [
    {
      id: 1,
      fullName: 'Marco Benitez',
      email: 'benitez272@gamil.com',
      startDate: '10/10/22',
      endDate: '10/23/22',
      bikeId: 2,
    },
    {
      id: 1,
      fullName: 'Marco Benitez',
      email: 'benitez272@gamil.com',
      startDate: '10/10/22',
      endDate: '10/23/22',
      bikeId: 2,
    },
  ]
  return <Table columns={columns} rows={rows} />
}

export default ReserversTable
