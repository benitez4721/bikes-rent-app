import { createContext, useContext, useState } from 'react'
import { User } from '../../interfaces/UserInterface'

const AuthContext = createContext({})
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null)

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext) as { user: User; setUser: () => void }
  const isAdmin = context.user?.rol === 'admin'

  return { ...context, isAdmin }
}
