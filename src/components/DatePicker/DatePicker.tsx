import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control'
import { useField, useFormikContext } from 'formik'
import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { required } from '../../utils/validators'
interface DatePickerProps {
  name: string
  label: string
}
const DatePicker: React.FC<DatePickerProps> = ({ name, label }) => {
  const { setFieldValue } = useFormikContext()
  const [field, meta] = useField({ name, validate: required })
  return (
    <FormControl mt={4} isInvalid={!!meta.error && !!meta.touched}>
      <FormLabel htmlFor='published-date'>{label}</FormLabel>

      <ReactDatePicker
        {...field}
        selected={field.value && new Date(field.value)}
        id='published-date'
        onChange={(date) => setFieldValue(field.name, date)}
        showPopperArrow={true}
        autoComplete='off'
      />
      {meta.error && meta.touched && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  )
}

export default DatePicker
