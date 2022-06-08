import { Checkbox } from '@chakra-ui/checkbox'
import React from 'react'
import Table from '../../../components/Table/Table'

const BikesTable: React.FC = () => {
  const columns = [
    { label: 'Model', render: ({ model }: any) => model },
    { label: 'Color', render: ({ color }: any) => color },
    { label: 'Location', render: ({ location }: any) => location },
    { label: 'Rating', render: ({ rating }: any) => rating },
    { label: 'Avaliable', render: () => <Checkbox /> },
  ]

  const rows = [
    { model: 'Modelo', color: 'Red', location: 'Urb miranda', rating: '5/5', available: true },
    { model: 'Modelo', color: 'Red', location: 'Urb miranda', rating: '5/5', available: false },
  ]
  return <Table columns={columns} rows={rows} />
}

export default BikesTable
