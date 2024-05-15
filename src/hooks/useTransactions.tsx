import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { useUser } from './User';
import { useWallets } from './useWallets';
interface Transaction {
  _id: string;
  description: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
  createdBy: string;
  walletId: string;
  date: string;

}

type TransactionInput = Omit<Transaction, '_id' | 'createdAt'>

interface TransactionsProviderProps {
  children: React.ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  selectedTransaction: Transaction;
  loading: boolean;
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  handleEditTransaction: (transaction: Transaction) => void;
  handleDeleteTransaction: (id: string) => void;
  handleSelectTransaction: (transaction: Transaction) => void;
  getTransactions: () => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const { user } = useUser();
  const { getWallets } = useWallets();
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>({} as Transaction)
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('@Myfinance:token');

  const getTransactions = async () => {
    try {
      const response = await api.get(`/transactions/${user._id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTransactions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao obter transações:', error);
      setLoading(false); 
    }
  }

  useEffect(() => {
    if (token) { 
      getTransactions();
    }
  }, [getTransactions, token]);

  async function createTransaction(transactionInput: TransactionInput) {
    await api.post('/transactions', {
      ...transactionInput
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    getTransactions()
    getWallets()
  }

  async function handleEditTransaction(transaction: Transaction) {
    await api.patch(`/transactions/${transaction._id}`, transaction, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    getWallets()
    getTransactions()
  }

  async function handleDeleteTransaction(id: string) {
    await api.delete(`/transactions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    getWallets()
    getTransactions()
  }

  function handleSelectTransaction(transaction: Transaction) {
    setSelectedTransaction(transaction)
  }
  
  return (
    <TransactionsContext.Provider value={{ 
      transactions,
      selectedTransaction,
      loading,
      createTransaction, 
      handleEditTransaction, 
      handleDeleteTransaction,
      handleSelectTransaction,
      getTransactions
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
}
