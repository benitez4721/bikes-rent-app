import { HStack, StackProps } from '@chakra-ui/layout'
import React from 'react'

interface TableHeaderProps {
  children?: React.ReactNode
}
const TableHeader: React.FC<TableHeaderProps | StackProps> = ({ children, ...props }) => {
  return (
    <HStack pl='1rem' pr='4.5rem' justifyContent='space-between' {...props}>
      {children}
    </HStack>
  )
}

export default TableHeader
