import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import api from '../services/api'
import { useUser } from './useUser'
import { useTransactions } from './useTransactions'

interface Wallet {
  _id: string
  name: string
  createdBy: string
  createdAt: string
  balance: number
  initialBalance: number
  currency?: string
}

interface Transfer {
  sourceWalletId: string
  targetWalletId: string
  amount: number
  description: string
  createdBy: string
  date: string
}

type WalletInput = Omit<Wallet, '_id' | 'createdAt' | 'balance' | 'currency'>

type WalletEdit = {
  _id: string
  name: string
}

interface WalletsProviderProps {
  children: React.ReactNode
}

function getCurrentMonthDateRange() {
  const currentDate = new Date()

  const firstDayPrevMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 6,
    1,
  )

  const lastDayCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  )

  const formatDateToISO = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const startDate = formatDateToISO(firstDayPrevMonth)
  const endDate = formatDateToISO(lastDayCurrentMonth)

  return {
    startDate,
    endDate,
  }
}

interface WalletsContextData {
  wallets: Wallet[]
  selectedWallet: Wallet
  loading: boolean
  createWallet: (wallet: WalletInput) => Promise<void>
  handleEditWallet: (wallet: WalletEdit) => void
  handleDeleteWallet: (id: string) => void
  handleSelectWallet: (wallet: Wallet) => void
  getWallets: () => Promise<void>
  handleTransferWallet: (transfer: Transfer) => void
}

const WalletsContext = createContext<WalletsContextData>(
  {} as WalletsContextData,
)

export function WalletsProvider({ children }: WalletsProviderProps) {
  const { user } = useUser()
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [selectedWallet, setSelectedWallet] = useState<Wallet>({} as Wallet)
  const [loading, setLoading] = useState(true)

  const { getTransactions } = useTransactions()

  const token = localStorage.getItem('@Myfinance:token')

  const getWallets = useCallback(async () => {
    if (!user?._id || !token) return

    setLoading(true)
    try {
      const response = await api.get(`/wallets/user/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setWallets(response.data)
    } catch (error) {
      console.error('Erro ao obter carteiras:', error)
    } finally {
      setLoading(false)
    }
  }, [user, token])

  useEffect(() => {
    getWallets()
  }, [getWallets])

  const createWallet = async (wallet: WalletInput) => {
    try {
      const response = await api.post('/wallets', wallet, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setWallets((prevWallets) => [...prevWallets, response.data])
    } catch (error) {
      console.error('Erro ao criar carteira:', error)
    }
  }

  const handleEditWallet = async (wallet: WalletEdit) => {
    try {
      const updatedWallet = wallets.find((w) => w._id === wallet._id)
      if (!updatedWallet) {
        return
      }
      updatedWallet.name = wallet.name

      await api.patch(`/wallets/${wallet._id}`, updatedWallet, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setWallets((prevWallets) =>
        prevWallets.map((w) => (w._id === wallet._id ? updatedWallet : w)),
      )
    } catch (error) {
      console.error('Erro ao editar carteira:', error)
    }
  }

  const handleDeleteWallet = async (id: string) => {
    try {
      await api.delete(`/wallets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setWallets((prevWallets) =>
        prevWallets.filter((wallet) => wallet._id !== id),
      )
      getTransactions({
        dateRange: getCurrentMonthDateRange(),
        transactionType: [],
      })
    } catch (error) {
      console.error('Erro ao deletar carteira:', error)
    }
  }

  const handleSelectWallet = (wallet: Wallet) => {
    setSelectedWallet(wallet)
  }

  const handleTransferWallet = async (
    transfer: Transfer,
  ): Promise<{ success: boolean } | { error: string }> => {
    try {
      await api.post(`/wallets/transfer`, transfer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTimeout(() => {
        getWallets()
      }, 1000)
      return { success: true }
    } catch (error: any) {
      return error.response?.data || { error: 'UnknownError' }
    }
  }

  return (
    <WalletsContext.Provider
      value={{
        wallets,
        selectedWallet,
        loading,
        createWallet,
        handleEditWallet,
        handleDeleteWallet,
        handleSelectWallet,
        getWallets,
        handleTransferWallet,
      }}
    >
      {children}
    </WalletsContext.Provider>
  )
}

export function useWallets() {
  const context = useContext(WalletsContext)
  if (!context) {
    throw new Error('useWallets must be used within a WalletsProvider')
  }
  return context
}
