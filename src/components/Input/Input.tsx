import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control'
import { Input as ChakraInput } from '@chakra-ui/input'
import { Field, useFormikContext } from 'formik'
import React from 'react'

export interface InputProps {
  label: string
  name: string
  validator?: (value: any) => string | undefined
}

const Input: React.FC<InputProps> = ({ label, name, validator }) => {
  const { errors, touched } = useFormikContext<any>()
  return (
    <Field name={name} validate={validator}>
      {({ field }: any) => (
        <FormControl mt={4} isInvalid={!!errors[name] && !!touched[name]}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <ChakraInput id={name} {...field} autoComplete='off' />
          {errors[name] && touched[name] && (
            <FormErrorMessage>{errors[name] as string}</FormErrorMessage>
          )}
        </FormControl>
      )}
    </Field>
  )
}

export default Input
