import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

interface Transaction {
  _id: string;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, '_id' | 'createdAt'>

interface TransactionsProviderProps {
  children: React.ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  selectedTransaction: Transaction;
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  handleEditTransaction: (transaction: Transaction) => void;
  handleDeleteTransaction: (id: string) => void;
  handleSelectTransaction: (transaction: Transaction) => void;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
)


export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>({} as Transaction)

  const getTransactions = async () => {
    const response = await api.get('/transactions')
    setTransactions(response.data)
  }


  useEffect(() => {
    getTransactions()
  }, [])
  
  async function createTransaction(transactionInput: TransactionInput) {
    await api.post('/transactions', transactionInput )
    getTransactions()
  }


  async function handleEditTransaction(transaction: Transaction) {
    await api.patch(`/transactions/${transaction._id}`, transaction)
    getTransactions()
  }

  async function handleDeleteTransaction(id: string) {
    await api.delete(`/transactions/${id}`)
    getTransactions()
  }

  function handleSelectTransaction(transaction: Transaction) {
    setSelectedTransaction(transaction)
  }
  
  return (
    <TransactionsContext.Provider value={{ 
      transactions,
      selectedTransaction,
      createTransaction, 
      handleEditTransaction, 
      handleDeleteTransaction,
      handleSelectTransaction,
      }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
