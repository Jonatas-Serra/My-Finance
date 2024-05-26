import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import api from '../services/api'

interface AuthState {
  token: string
  user: object
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: object
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
}

interface Props {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Myfinance:token')
    const userString = localStorage.getItem('@Myfinance:user')

    if (token && userString) {
      try {
        const user = JSON.parse(userString)
        return { token, user }
      } catch (error) {
        console.error('Erro ao fazer parse do usuário:', error)
      }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('/auth/login', {
      email,
      password,
    })

    const { token, user } = response.data

    localStorage.setItem('@Myfinance:token', token)
    localStorage.setItem('@Myfinance:user', JSON.stringify(user))

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@Myfinance:token')
    localStorage.removeItem('@Myfinance:user')

    setData({} as AuthState)
  }, [])

  const value = useMemo(
    () => ({ user: data.user, signIn, signOut }),
    [data.user, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
