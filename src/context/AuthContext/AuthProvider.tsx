import { createContext, useContext, useState } from 'react'

const AuthContext = createContext({})
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null)

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  return context
}
