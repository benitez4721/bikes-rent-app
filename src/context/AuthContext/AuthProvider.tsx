import { createContext, useContext, useState } from 'react'
import { User } from '../../interfaces/UserInterface'

const AuthContext = createContext({})
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null)

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  return context as { user: User; setUser: () => void }
}
