import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import api from '../services/api'
import { useUser } from './useUser'

interface Account {
  _id: string
  type: string
  value: number
  dueDate: string
  issueDate: string
  documentNumber: string
  category: string
  isPaid: boolean
  documentType: string
  description: string
  payeeOrPayer: string
  status: string
  repeat?: number
  createdBy: string
  repeatInterval: number
  walletId: string
  createdAt: string
}

type AccountInput = Omit<Account, '_id' | 'createdAt'>

interface AccountsProviderProps {
  children: React.ReactNode
}

interface GetAccountsParams {
  dateRange: { startDate: Date; endDate: Date }
  status: string[]
}

function getMonthDateRange() {
  const currentDate = new Date()

  const firstDayCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  )

  const lastDayNextMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 2,
    0,
  )

  return {
    startDate: firstDayCurrentMonth,
    endDate: lastDayNextMonth,
  }
}

interface AccountsContextData {
  payables: Account[]
  receivables: Account[]
  accounts: Account[]
  selectedAccount: Account
  loading: boolean
  createAccount: (account: AccountInput) => Promise<void>
  EditAccount: (account: Account) => void
  handleDeleteAccount: (id: string) => void
  handleSelectAccount: (account: Account) => void
  PayAccount: (id: string, walletId: string, payday: Date) => void
  UnpayAccount: (id: string) => void
  getAccounts: (filters: GetAccountsParams) => Promise<void>
}

const AccountsContext = createContext<AccountsContextData>(
  {} as AccountsContextData,
)

export function AccountsProvider({ children }: AccountsProviderProps) {
  const { user } = useUser()
  const [accounts, setAccounts] = useState<Account[]>([])
  const [payables, setPayables] = useState<Account[]>([])
  const [receivables, setReceivables] = useState<Account[]>([])
  const [selectedAccount, setSelectedAccount] = useState<Account>({} as Account)
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('@Myfinance:token')

  const getAccounts = useCallback(
    async ({ dateRange, status }: GetAccountsParams) => {
      if (!user?._id || !token) return

      setLoading(true)
      try {
        const response = await api.get(`/accounts/user/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            status,
          },
        })
        const accounts = response.data
        setAccounts(accounts)
        setPayables(
          accounts.filter((account: Account) => account.type === 'payable'),
        )
        setReceivables(
          accounts.filter((account: Account) => account.type === 'receivable'),
        )
      } catch (error) {
        console.error('Erro ao obter contas:', error)
      } finally {
        setLoading(false)
      }
    },
    [user, token],
  )

  useEffect(() => {
    getAccounts({
      dateRange: getMonthDateRange(),
      status: [],
    })
  }, [getAccounts])

  const createAccount = async (account: AccountInput) => {
    try {
      await api.post('/accounts', account, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      getAccounts({
        dateRange: getMonthDateRange(),
        status: [],
      })
    } catch (error) {
      console.error('Erro ao criar conta:', error)
    }
  }

  const EditAccount = async (account: Account) => {
    try {
      await api.patch(`/accounts/${account._id}`, account, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      getAccounts({
        dateRange: getMonthDateRange(),
        status: [],
      })
    } catch (error) {
      console.error('Erro ao editar conta:', error)
    }
  }

  const handleDeleteAccount = async (id: string) => {
    try {
      await api.delete(`/accounts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      getAccounts({
        dateRange: getMonthDateRange(),
        status: [],
      })
    } catch (error) {
      console.error('Erro ao deletar conta:', error)
    }
  }

  const handleSelectAccount = (account: Account) => {
    setSelectedAccount(account)
  }

  const PayAccount = async (id: string, walletId: string, payday: Date) => {
    try {
      await api.post(
        `/accounts/${id}/pay`,
        {
          walletId,
          payday,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      getAccounts({
        dateRange: getMonthDateRange(),
        status: [],
      })
    } catch (error) {
      console.error('Erro ao pagar conta:', error)
    }
  }

  const UnpayAccount = async (id: string) => {
    try {
      await api.post(
        `/accounts/${id}/underPay`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      getAccounts({
        dateRange: getMonthDateRange(),
        status: [],
      })
    } catch (error) {
      console.error('Erro ao desfazer pagamento:', error)
    }
  }

  return (
    <AccountsContext.Provider
      value={{
        payables,
        receivables,
        accounts,
        selectedAccount,
        loading,
        createAccount,
        EditAccount,
        handleDeleteAccount,
        handleSelectAccount,
        PayAccount,
        UnpayAccount,
        getAccounts,
      }}
    >
      {children}
    </AccountsContext.Provider>
  )
}

export function useAccounts() {
  const context = useContext(AccountsContext)
  if (!context) {
    throw new Error('useAccounts must be used within an AccountsProvider')
  }
  return context
}
