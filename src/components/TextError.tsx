import { Text, TextProps } from '@chakra-ui/layout'
import React from 'react'

type TextErrorProps = {
  children: string
}

const TextError: React.FC<TextErrorProps | TextProps> = ({ children, ...props }) => {
  return (
    <Text color='#e53e3e' fontSize='sm' mt='0' {...props}>
      {children}
    </Text>
  )
}

export default TextError
