import { useAuth } from '../context/AuthContext/AuthProvider'
import AuthenticatedApp from './AuthenticatedApp'
import UnAuthenticatedApp from './UnAuthenticatedApp'

const AppSwitcher = () => {
  const { user } = useAuth()

  return user ? <AuthenticatedApp /> : <UnAuthenticatedApp />
}

export default AppSwitcher
