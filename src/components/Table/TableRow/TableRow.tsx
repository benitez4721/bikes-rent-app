import { Td, Tr } from '@chakra-ui/table'
import React, { ReactNode } from 'react'

interface TableRowProps {
  columns: { label: string; render: (row: any) => ReactNode }[]
  row: Record<string, any>
}

const TableRow: React.FC<TableRowProps> = ({ columns, row }) => {
  return (
    <Tr>
      {columns.map(({ render }, idx) => (
        <Td key={idx}>{render(row)}</Td>
      ))}
    </Tr>
  )
}

export default TableRow
