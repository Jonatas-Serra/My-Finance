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
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  handleEditTransaction: (transaction: Transaction) => void;
  handleDeleteTransaction: (id: string) => void;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
)


export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api.get('/transactions')
      .then(response => setTransactions(response.data))
  }, [transactions])
  
  async function createTransaction(transactionInput: TransactionInput) {
    await api.post('/transactions', transactionInput )
  }


  async function handleEditTransaction(transaction: Transaction) {
    await api.put(`/transactions/${transaction._id}`, transaction)
  }

  async function handleDeleteTransaction(id: string) {
    await api.delete(`/transactions/${id}`)
  }
  
  return (
    <TransactionsContext.Provider value={{ 
      transactions, 
      createTransaction, 
      handleEditTransaction, 
      handleDeleteTransaction
      }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
