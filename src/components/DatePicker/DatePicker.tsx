import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { useField, useFormikContext } from 'formik'
import React from 'react'
import ReactDatePicker from 'react-datepicker'
interface DatePickerProps {
  name: string
  label: string
}
const DatePicker: React.FC<DatePickerProps> = ({ name, label }) => {
  const { setFieldValue } = useFormikContext()
  const [field] = useField({ name })
  return (
    <FormControl mt={4}>
      <FormLabel htmlFor='published-date'>{label}</FormLabel>

      <ReactDatePicker
        {...field}
        selected={field.value && new Date(field.value)}
        id='published-date'
        onChange={(date) => setFieldValue(field.name, date)}
        showPopperArrow={true}
      />
    </FormControl>
  )
}

export default DatePicker
