import React from 'react'
import { useAuth } from '../context/AuthContext/AuthProvider'
import AuthenticatedApp from './AuthenticatedApp'
import UnAuthenticatedApp from './UnAuthenticatedApp'

const AppSwitcher = () => {
  const { user } = useAuth() as any

  return user ? <AuthenticatedApp /> : <UnAuthenticatedApp />
}

export default AppSwitcher
