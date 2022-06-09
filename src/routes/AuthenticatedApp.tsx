import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext/AuthProvider'
import SideBar from '../layout/SideBar/SideBar'
import Bikes from '../views/Bikes/Bikes'
import Reserves from '../views/Reserves/Reserves'
import Users from '../views/Users/Users'

const AuthenticatedApp = () => {
  const { isAdmin } = useAuth()
  return (
    <SideBar>
      <Routes>
        {isAdmin && <Route path='users' element={<Users />} />}
        {isAdmin && <Route path='/users/reservations/:userId' element={<Reserves />} />}
        <Route path='bikes' element={<Bikes />} />
        <Route path='reserves' element={<Reserves />} />
        <Route path='*' element={<Navigate to={isAdmin ? 'users' : 'bikes'} replace />} />
      </Routes>
    </SideBar>
  )
}

export default AuthenticatedApp
