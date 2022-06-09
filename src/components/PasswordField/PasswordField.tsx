import {
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
} from '@chakra-ui/react'
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/form-control'
import React from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { useFormikContext } from 'formik'

interface PasswordFieldProps extends InputProps {
  label?: string
  error?: string
}

const PasswordField: React.FC<PasswordFieldProps> = ({ label = 'Password', mt = 0, ...props }) => {
  const { isOpen, onToggle } = useDisclosure()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const { errors, touched } = useFormikContext<any>()

  const onClickReveal = () => {
    onToggle()
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }

  return (
    <FormControl mt={mt} isInvalid={!!errors['password'] && !!touched['password']}>
      <FormLabel htmlFor='password'>{label}</FormLabel>
      <InputGroup>
        <InputRightElement>
          <IconButton
            variant='link'
            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Input
          id='password'
          ref={inputRef}
          name='password'
          type={isOpen ? 'text' : 'password'}
          autoComplete='current-password'
          {...props}
        />
      </InputGroup>
      {errors['password'] && touched['password'] && (
        <FormErrorMessage>{errors['password'] as string}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export default PasswordField
