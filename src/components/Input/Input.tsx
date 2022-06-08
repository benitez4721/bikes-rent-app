import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input as ChakraInput } from '@chakra-ui/input'
import { Field } from 'formik'
import React from 'react'

export interface InputProps {
  label: string
  name: string
}

const Input: React.FC<InputProps> = ({ label, name }) => {
  return (
    <Field name={name}>
      {({ field }: any) => (
        <FormControl mt={4}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <ChakraInput id={name} {...field} />
        </FormControl>
      )}
    </Field>
  )
}

export default Input
