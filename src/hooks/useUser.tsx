import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react'
import api from '../services/api'
import { useAuth } from './Auth'

interface User {
  _id: string
  name: string
  email: string
  phone: string
  password: string
  createdAt: string
  photo: string
  categories: string[]
}

interface UserAuth {
  _id: string
}

interface UserContextData {
  user: User
  handleUpdateUser: (user: User) => Promise<void>
}

const UserContext = React.createContext<UserContextData>({} as UserContextData)

interface Props {
  children: React.ReactNode
}

const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User)

  const auth = useAuth()
  const token = localStorage.getItem('@Myfinance:token')

  const getUser = useCallback(async () => {
    const response = await api.get(`/users/${(auth.user as UserAuth)?._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setUser(response.data)
  }, [auth.user, token])

  useEffect(() => {
    if (auth.user) {
      getUser()
    }
  }, [auth.user, getUser])

  const handleUpdateUser = useCallback(
    async (userData: User) => {
      await api.patch(`/users/${(auth.user as UserAuth)?._id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      await getUser()
    },
    [auth.user, token, getUser],
  )

  const value = useMemo(
    () => ({ user, handleUpdateUser }),
    [user, handleUpdateUser],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

function useUser(): UserContextData {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used within an UserProvider')
  }

  return context
}

export { UserProvider, useUser }
