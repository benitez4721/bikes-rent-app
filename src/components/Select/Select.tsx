import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Select as ChakraSelect } from '@chakra-ui/select'
import { Field } from 'formik'
import React from 'react'
import { InputProps } from '../Input/Input'

interface SelectProps extends InputProps {
  options: { value: any; label: string }[]
}

const Select: React.FC<SelectProps> = ({ options, label, name }) => {
  return (
    <Field name={name}>
      {({ field }: any) => (
        <FormControl mt={4}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <ChakraSelect id={name} placeholder='Select rol' {...field}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </ChakraSelect>
        </FormControl>
      )}
    </Field>
  )
}

export default Select
