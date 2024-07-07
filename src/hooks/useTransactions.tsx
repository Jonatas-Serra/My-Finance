import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import api from '../services/api'
import { useUser } from './useUser'
import { useWallets } from './useWallets'

interface Transaction {
  _id: string
  description: string
  type: string
  category: string
  amount: number
  createdAt: string
  createdBy: string
  walletId: string
  date: string
}

type TransactionInput = Omit<Transaction, '_id' | 'createdAt'>

interface TransactionsProviderProps {
  children: React.ReactNode
}

interface DateRange {
  startDate: string
  endDate: string
}

interface GetTransactionsParams {
  dateRange: DateRange
  transactionType: string[]
}

interface TransactionsContextData {
  transactions: Transaction[]
  selectedTransaction: Transaction
  loading: boolean
  createTransaction: (transaction: TransactionInput) => Promise<void>
  handleEditTransaction: (transaction: Transaction) => void
  handleDeleteTransaction: (id: string) => void
  handleSelectTransaction: (transaction: Transaction) => void
  getTransactions: (filters: GetTransactionsParams) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData,
)

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

function getMonthDateRange() {
  const currentDate = new Date()

  const firstDayCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
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

  const startDate = formatDateToISO(firstDayCurrentMonth)
  const endDate = formatDateToISO(lastDayCurrentMonth)

  return {
    startDate,
    endDate,
  }
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const { user } = useUser()
  const { getWallets } = useWallets()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>(
    {} as Transaction,
  )
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('@Myfinance:token')

  const getTransactions = useCallback(
    async ({ dateRange, transactionType }: GetTransactionsParams) => {
      if (!user?._id || !token) return

      setLoading(true)
      try {
        const adjustedEndDate = dateRange.endDate
        const response = await api.get(`/transactions/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            startDate: dateRange.startDate,
            endDate: adjustedEndDate,
            transactionType,
          },
        })

        setTransactions(response.data)
      } catch (error) {
        console.error('Erro ao obter transações:', error)
      } finally {
        setLoading(false)
      }
    },
    [user, token],
  )

  useEffect(() => {
    getTransactions({
      dateRange: getCurrentMonthDateRange(),
      transactionType: [],
    })
  }, [getTransactions])

  async function createTransaction(transactionInput: TransactionInput) {
    try {
      await api.post('/transactions', transactionInput, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      getTransactions({
        dateRange: getMonthDateRange(),
        transactionType: [],
      })
      getWallets()
    } catch (error) {
      console.error('Erro ao criar transação:', error)
    }
  }

  async function handleEditTransaction(transaction: Transaction) {
    try {
      await api.patch(`/transactions/${transaction._id}`, transaction, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      getTransactions({
        dateRange: getMonthDateRange(),
        transactionType: [],
      })
      getWallets()
    } catch (error) {
      console.error('Erro ao editar transação:', error)
    }
  }

  async function handleDeleteTransaction(id: string) {
    try {
      await api.delete(`/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      getTransactions({
        dateRange: getMonthDateRange(),
        transactionType: [],
      })
      getWallets()
    } catch (error) {
      console.error('Erro ao deletar transação:', error)
    }
  }

  function handleSelectTransaction(transaction: Transaction) {
    setSelectedTransaction(transaction)
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        selectedTransaction,
        loading,
        createTransaction,
        handleEditTransaction,
        handleDeleteTransaction,
        handleSelectTransaction,
        getTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)
  if (!context) {
    throw new Error(
      'useTransactions must be used within a TransactionsProvider',
    )
  }
  return context
}
