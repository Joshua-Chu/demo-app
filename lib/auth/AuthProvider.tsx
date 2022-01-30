import React, { createContext, useContext, useState } from 'react'
import { User } from '../../types'

export type authContextType = {
  user: User
  login: () => void
  logout: () => void
  setRegUser: (userData: User) => void
}

const authContextDefaultValues: authContextType = {
  user: {
    id: '',
    username: '',
    imageUrl: '',
  },
  login: () => {},
  logout: () => {},
  setRegUser: () => {},
}

const AuthContext = createContext<authContextType>(authContextDefaultValues)

export function useAuth() {
  return useContext(AuthContext)
}

type Props = {
  children: React.ReactNode
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User>({
    id: '',
    username: '',
    imageUrl: '',
  })

  const setRegUser = ({ id, username, imageUrl }: User) => {
    setUser({ id, username, imageUrl })
  }

  const login = () => {
    setUser({ id: '', username: '', imageUrl: '' })
  }

  const logout = () => {
    setUser({ id: '', username: '', imageUrl: '' })
  }

  const value = {
    user,
    login,
    logout,
    setRegUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
