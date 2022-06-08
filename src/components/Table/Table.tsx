import { Center, Heading } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { Table as TableComponent, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/table'
import React, { ReactNode } from 'react'
import TableRow from './TableRow/TableRow'

interface TableProps {
  columns: { label: string; render: (row: any) => ReactNode }[]
  rows: Record<string, any>[]
  loading?: boolean
}

const Table: React.FC<TableProps> = ({ columns, rows, loading = true }) => {
  return (
    <TableContainer mt={10} px={0}>
      <TableComponent variant='simple' size='md'>
        <Thead>
          <Tr>
            {columns.map(({ label }) => (
              <Th key={label}>{label}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, idx) => (
            <TableRow key={idx} row={row} columns={columns} />
          ))}
        </Tbody>
      </TableComponent>
      {loading && (
        <Center w='100%' h='10rem'>
          <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
        </Center>
      )}
      {!rows.length && !loading && (
        <Center w='100%' h='10rem'>
          <Heading fontSize='1.5rem' color='gray'>
            No data to display
          </Heading>
        </Center>
      )}
    </TableContainer>
  )
}

export default Table
