import { Routes, Route, Navigate } from 'react-router-dom'
import SignIn from '../views/Auth/SignIn/SignIn'
import SignUp from '../views/Auth/SignUp/SignUp'

const UnAuthenticatedApp = () => {
  return (
    <Routes>
      <Route path='login' element={<SignIn />} />
      <Route path='register' element={<SignUp />} />
      <Route path='*' element={<Navigate to='login' replace />} />
    </Routes>
  )
}

export default UnAuthenticatedApp
