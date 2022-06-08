import { Routes, Route, Navigate } from 'react-router-dom'
import SideBar from '../layout/SideBar/SideBar'
import Bikes from '../views/Bikes/Bikes'
import Reserves from '../views/Reserves/Reserves'
import Users from '../views/Users/Users'

const AuthenticatedApp = () => {
  return (
    <SideBar>
      <Routes>
        <Route path='users' element={<Users />} />

        <Route path='/users/reservations/:userId' element={<Reserves />} />
        <Route path='bikes' element={<Bikes />} />
        <Route path='reserves' element={<Reserves />} />
        <Route path='*' element={<Navigate to='users' replace />} />
      </Routes>
    </SideBar>
  )
}

export default AuthenticatedApp
