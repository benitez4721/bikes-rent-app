import { Text } from '@chakra-ui/layout'
import React from 'react'

type TextErrorProps = {
  children: string
}

const TextError: React.FC<TextErrorProps> = ({ children }) => {
  return (
    <Text color='#e53e3e' fontSize='sm' mt='0'>
      {children}
    </Text>
  )
}

export default TextError
