import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { useUser } from './User';
import { useTransactions } from './useTransactions';
interface Account {
  _id: string;
  type: string;
  value: number;
  dueDate: string;
  issueDate: string;
  documentNumber: string;
  category: string;
  isPaid: boolean;
  documentType: string;
  description: string;
  payeeOrPayer: string;
  status: string;
  repeat: number;
  createdBy: string;
  repeatInterval: number;
  walletId: string;
  createdAt: string;
}

type AccountInput = Omit<Account, '_id' | 'createdAt'>

interface AccountsProviderProps {
  children: React.ReactNode;
}

interface AccountsContextData {
  payables: Account[];
  receivables: Account[];
  selectedAccount: Account;
  loading: boolean;
  createAccount: (account: AccountInput) => Promise<void>;
  handleEditAccount: (account: Account) => void;
  handleDeleteAccount: (id: string) => void;
  handleSelectAccount: (account: Account) => void;
  handlePayAccount: (id: string, walletId: string, payday: Date) => void;
  handleUnpayAccount: (id: string) => void;
  getAccounts: () => Promise<void>;
}

const AccountsContext = createContext<AccountsContextData>(
  {} as AccountsContextData
)

export function AccountsProvider({ children }: AccountsProviderProps) {
  const { user } = useUser();
  const [payables, setPayables] = useState<Account[]>([])
  const [receivables, setReceivables] = useState<Account[]>([])
  const [selectedAccount, setSelectedAccount] = useState<Account>({} as Account)
  const [loading, setLoading] = useState(true);
  const { getTransactions } = useTransactions();

  const token = localStorage.getItem('@Myfinance:token');

  const getAccounts = async () => {
    try {
      const response = await api.get(`/accounts/user/${user._id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPayables(response.data.filter((account: Account) => account.type === 'payable'));
      setReceivables(response.data.filter((account: Account) => account.type === 'receivable'));
      setLoading(false);
    } catch (error) {
      console.error('Erro ao obter contas:', error);
      setLoading(false); 
    }
  }

  const createAccount = async (account: AccountInput) => {
    try {
      await api.post('/accounts', account, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getAccounts();
    } catch (error) {
      console.error('Erro ao criar conta:', error);
    }
  }

  const handleEditAccount = (account: Account) => {
    setSelectedAccount(account);
  }

  const handleDeleteAccount = async (id: string) => {
    try {
      await api.delete(`/accounts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getAccounts();
    } catch (error) {
      console.error('Erro ao deletar conta:', error);
    }
  }

  const handleSelectAccount = (account: Account) => {
    setSelectedAccount(account);
  }

  const handlePayAccount = async (id: string, walletId: string, payday: Date) => {
    try {
      await api.post(`/accounts/${id}`, {
        walletId,
        payday
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getTransactions();
      getAccounts();
    } catch (error) {
      console.error('Erro ao pagar conta:', error);
    }
  }

  const handleUnpayAccount = async (id: string) => {
    try {
      await api.patch(`/accounts/${id}`, {
        status: new Date(selectedAccount.dueDate) > new Date() ? 'Pending' : 'Late'
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getAccounts();
    } catch (error) {
      console.error('Erro ao desfazer pagamento', error);
    }
  }

  useEffect(() => {
    if(token) {
        getAccounts()
        }
  }, [getAccounts, token])

  return (
    <AccountsContext.Provider value={{ payables, receivables, selectedAccount, loading, createAccount, handleEditAccount, handleDeleteAccount, handleSelectAccount, handlePayAccount, handleUnpayAccount, getAccounts }}>
      {children}
    </AccountsContext.Provider>
  )
}  

export function useAccounts() {
  const context = useContext(AccountsContext);
  if(!context) {
    throw new Error('useAccounts must be used within a AccountsProvider');
  }
  return context;
}