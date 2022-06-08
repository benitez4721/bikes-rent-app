import {
  Box,
  Button,
  Container,
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
import { createUserWithEmailAndPassword } from '@firebase/auth'
import { doc, setDoc } from '@firebase/firestore'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import PasswordField from '../../../components/PasswordField/PasswordField'
import { auth, db } from '../../../libs/firebase/config'
import { Logo } from '../AuthLogo/AuthLogo'
import { FormErrorMessage } from '@chakra-ui/form-control'
import { useNavigate } from 'react-router'

const SignUp = () => {
  const [emailError, setEmailError] = useState('')
  const navigate = useNavigate()

  const execSignUp = async (values: any) => {
    setEmailError('')
    try {
      const response = await createUserWithEmailAndPassword(auth, values.email, values.password)
      await setDoc(doc(db, 'users', response.user.uid), { ...values, rol: 'user' })
      navigate('login')
    } catch (error: any) {
      console.log(error.message.includes('email'))

      if (error.message.includes('email')) {
        setEmailError('* Email already in use')
      }
    }
  }
  return (
    <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing='8'>
        <Stack spacing='6'>
          <Logo />
          <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
            <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
              Create your account
            </Heading>
            <HStack spacing='1' justify='center'>
              <Text color='muted'>Do you have an account?</Text>
              <Button variant='link' colorScheme='blue' onClick={() => navigate('/login')}>
                Sign in
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
          <Formik
            onSubmit={execSignUp}
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
            }}
          >
            <Form>
              <Stack spacing='6'>
                <Stack spacing='5'>
                  <Field name='firstName'>
                    {({ field }: any) => (
                      <FormControl>
                        <FormLabel htmlFor='firstName'>First name</FormLabel>
                        <Input id='firstName' {...field} />
                      </FormControl>
                    )}
                  </Field>
                  <Field name='lastName'>
                    {({ field }: any) => (
                      <FormControl>
                        <FormLabel htmlFor='email'>Last name</FormLabel>
                        <Input id='lastName' {...field} />
                      </FormControl>
                    )}
                  </Field>
                  <Field name='email'>
                    {({ field }: any) => (
                      <FormControl isInvalid={!!emailError}>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <Input id='email' type='email' {...field} />
                        <FormErrorMessage>{emailError}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='password'>{({ field }: any) => <PasswordField {...field} />}</Field>
                </Stack>
                <Stack spacing='6'>
                  <Button variant='primary' type='submit'>
                    Sign up
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

export default SignUp
