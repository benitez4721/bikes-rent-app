import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { Field, Form, Formik } from 'formik'
import * as React from 'react'
import { useNavigate } from 'react-router'
import PasswordField from '../../../components/PasswordField/PasswordField'
import { useAuth } from '../../../context/AuthContext/AuthProvider'
import { auth } from '../../../libs/firebase/config'
import { me } from '../../../services/auth/me'
import { Logo } from '../AuthLogo/AuthLogo'

const SignIn = () => {
  const navigate = useNavigate()
  const { setUser } = useAuth() as any
  const execLogin = async (values: any) => {
    try {
      const response = await signInWithEmailAndPassword(auth, values.email, values.password)
      const user = await me(response.user.uid)
      setUser({ ...user, id: response.user.uid })
    } catch (error) {
      console.log(error)
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
            <Form>
              <Stack spacing='6'>
                <Stack spacing='5'>
                  <Field name='email'>
                    {({ field }: any) => (
                      <FormControl>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <Input id='email' type='email' {...field} />
                      </FormControl>
                    )}
                  </Field>
                  <Field name='password'>{({ field }: any) => <PasswordField {...field} />}</Field>
                </Stack>
                <HStack justify='space-between'>
                  <Checkbox defaultChecked>Remember me</Checkbox>
                  <Button variant='link' colorScheme='blue' size='sm'>
                    Forgot password?
                  </Button>
                </HStack>
                <Stack spacing='6'>
                  <Button variant='primary' type='submit'>
                    Sign in
                  </Button>
                  <HStack>
                    <Divider />
                    <Text fontSize='sm' whiteSpace='nowrap' color='muted'>
                      or continue with
                    </Text>
                    <Divider />
                  </HStack>
                  {/* <OAuthButtonGroup /> */}
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
