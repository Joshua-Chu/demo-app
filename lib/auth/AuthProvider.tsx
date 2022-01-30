import React, { createContext, useContext, useEffect, useState } from 'react'
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

  useEffect(() => {
    const isAuth = Boolean(localStorage.getItem('isAuth'))
    const userCache = localStorage.getItem('user')
    if (isAuth && userCache) {
      setUser(JSON.parse(userCache) as User)
    }
  }, [])

  const setRegUser = ({ id, username, imageUrl }: User) => {
    setUser({ id, username, imageUrl })
    localStorage.setItem('isAuth', 'true')
    localStorage.setItem('user', JSON.stringify({ id, username, imageUrl }))
  }

  const login = () => {
    setUser({ id: '', username: '', imageUrl: '' })
  }

  const logout = () => {
    setUser({ id: '', username: '', imageUrl: '' })
    localStorage.removeItem('isAuth')
    localStorage.removeItem('user')
  }

  const value = {
    user,
    login,
    logout,
    setRegUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
