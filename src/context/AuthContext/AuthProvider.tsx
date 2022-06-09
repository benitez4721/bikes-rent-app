import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '../../interfaces/UserInterface'

const AuthContext = createContext({})
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null)

  const logOut = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  useEffect(() => {
    const localUser = localStorage.getItem('user')
    if (localUser) {
      setUser(JSON.parse(localUser))
    }
  }, [])

  return <AuthContext.Provider value={{ user, setUser, logOut }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext) as {
    user: User
    setUser: () => void
    logOut: () => void
  }
  const isAdmin = context.user?.rol === 'admin'

  return { ...context, isAdmin }
}
