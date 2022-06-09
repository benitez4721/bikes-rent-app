import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/form-control'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router'
import PasswordField from '../../../components/PasswordField/PasswordField'
import Input from '../../../components/Input/Input'
import { useAuth } from '../../../context/AuthContext/AuthProvider'
import { auth } from '../../../libs/firebase/config'
import { me } from '../../../services/auth/me'
import { required, validateEmail } from '../../../utils/validators'
import { Logo } from '../AuthLogo/AuthLogo'
import { useState } from 'react'
import TextError from '../../../components/TextError'

const SignIn = () => {
  const navigate = useNavigate()
  const { setUser } = useAuth() as any
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)

  const execLogin = async (values: any) => {
    try {
      setLoading(true)
      const response = await signInWithEmailAndPassword(auth, values.email, values.password)
      const user = await me(response.user.uid)
      setUser({ ...user, id: response.user.uid })
      localStorage.setItem('user', JSON.stringify({ ...user, id: response.user.uid }))
    } catch (error: any) {
      setFormError('* Credentials are wrong')
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing='8'>
        <Stack spacing='6'>
          <Logo />
          <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
            <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
              Log in to your account
            </Heading>
            <HStack spacing='1' justify='center'>
              <Text color='muted'>Dont have an account?</Text>
              <Button variant='link' colorScheme='blue' onClick={() => navigate('/register')}>
                Sign up
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
          boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Formik onSubmit={execLogin} initialValues={{ email: '', password: '' }}>
            <Form
              onChange={() => {
                setFormError('')
              }}
            >
              <Stack spacing='6'>
                <Stack spacing='5'>
                  <Input name='email' label='Email' validator={validateEmail} />
                  <Field name='password' validate={required}>
                    {({ field }: any) => <PasswordField {...field} />}
                  </Field>
                </Stack>
                {formError && <TextError>{formError}</TextError>}
                <HStack justify='space-between'>
                  <Button variant='link' colorScheme='blue' size='sm'>
                    Forgot password?
                  </Button>
                </HStack>
                <Stack spacing='6'>
                  <Button colorScheme='linkedin' type='submit' isLoading={loading}>
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </Form>
          </Formik>
        </Box>
      </Stack>
    </Container>
  )
}

export default SignIn
