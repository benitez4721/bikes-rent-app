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
import { createUserWithEmailAndPassword } from '@firebase/auth'
import { doc, setDoc } from '@firebase/firestore'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import PasswordField from '../../../components/PasswordField/PasswordField'
import { auth, db } from '../../../libs/firebase/config'
import { Logo } from '../AuthLogo/AuthLogo'
import { useNavigate } from 'react-router'
import Input from '../../../components/Input/Input'
import { required, validateEmail } from '../../../utils/validators'
import TextError from '../../../components/TextError'

const SignUp = () => {
  const [emailError, setEmailError] = useState('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const execSignUp = async (values: any) => {
    setEmailError('')
    try {
      setLoading(true)
      const response = await createUserWithEmailAndPassword(auth, values.email, values.password)
      await setDoc(doc(db, 'users', response.user.uid), { ...values, rol: 'user' })
      navigate('login')
    } catch (error: any) {
      if (error.message.includes('email')) {
        setEmailError('* Email already in use')
      }
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
            <Form onChange={() => setEmailError('')}>
              <Stack spacing='6'>
                <Stack spacing='5'>
                  <Input name='firstName' label='First name' validator={required} />
                  <Input name='lastName' label='Last name' validator={required} />
                  <Input name='email' label='email' validator={validateEmail} />
                  <Field name='password' validate={required}>
                    {({ field }: any) => <PasswordField {...field} />}
                  </Field>
                </Stack>
                {emailError && <TextError>{emailError}</TextError>}
                <Stack spacing='6'>
                  <Button colorScheme='linkedin' type='submit' mt={'1rem'} isLoading={loading}>
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
