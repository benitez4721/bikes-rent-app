import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

interface PasswordFieldProps extends InputProps {
  label?: string
}

const PasswordField: React.FC<PasswordFieldProps> = ({ label = 'Password', mt = 0, ...props }) => {
  const { isOpen, onToggle } = useDisclosure()
  const inputRef = React.useRef<HTMLInputElement>(null)

  const onClickReveal = () => {
    onToggle()
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }

  return (
    <FormControl mt={mt}>
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
          required
          {...props}
        />
      </InputGroup>
    </FormControl>
  )
}

export default PasswordField
