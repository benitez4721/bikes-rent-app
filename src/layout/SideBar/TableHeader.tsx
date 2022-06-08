import { HStack } from '@chakra-ui/layout'
import React from 'react'

interface TableHeaderProps {
  children?: React.ReactNode
}
const TableHeader: React.FC<TableHeaderProps> = ({ children }) => {
  return (
    <HStack pl='1rem' pr='4.5rem' justifyContent='space-between'>
      {children}
    </HStack>
  )
}

export default TableHeader
