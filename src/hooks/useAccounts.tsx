import { createContext, useContext, useEffect, useState } from 'react';
import { useTransactions } from './useTransactions'; 
import api from '../services/api';

interface Account {
  _id: string;
  type: string;
  value: number;
  dueDate: Date;
  issueDate: Date;
  documentNumber?: string;
  category: string;
  documentType: string;
  description?: string;
  payeeOrPayer: string;
  repeat?: number;
  createdBy: string;
  repeatInterval: number;
  walletId: string;
}

interface AccountsContextData {
  accountsToPay: Account[];
  accountsToReceive: Account[];
  handleEditAccount: (account: Account) => void;
  handleDeleteAccount: (id: string) => void;
  handleSelectAccount: (account: Account) => void;
  getAccount: (id: string) => Account | undefined;
}

const AccountsContext = createContext<AccountsContextData>(
  {} as AccountsContextData
);

export function AccountsProvider({ children }: { children: React.ReactNode }) {
  const [accountsToPay, setAccountsToPay] = useState<Account[]>([]);
  const [accountsToReceive, setAccountsToReceive] = useState<Account[]>([]);

  useEffect(() => {
    const checkDueDate = () => {
      const today = new Date();
      const accountsToPayFiltered = transactions.filter(
        (transaction) => transaction.type === 'payable' && new Date(transaction.dueDate) <= today
      );
      const accountsToReceiveFiltered = transactions.filter(
        (transaction) => transaction.type === 'receivable' && new Date(transaction.dueDate) <= today
      );

      setAccountsToPay(accountsToPayFiltered);
      setAccountsToReceive(accountsToReceiveFiltered);
    };

    checkDueDate();

    const interval = setInterval(() => {
      checkDueDate();
    }, 12 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Função para editar uma conta
  const handleEditAccount = (account: Account) => {
    // Implemente aqui a lógica para editar uma conta
  };

  // Função para excluir uma conta
  const handleDeleteAccount = (id: string) => {
    // Implemente aqui a lógica para excluir uma conta
  };

  // Função para selecionar uma conta
  const handleSelectAccount = (account: Account) => {
    // Implemente aqui a lógica para selecionar uma conta
  };

  // Função para obter uma conta pelo ID
  const getAccount = (id: string) => {
    // Implemente aqui a lógica para obter uma conta pelo ID
  };

  return (
    <AccountsContext.Provider
      value={{
        accountsToPay,
        accountsToReceive,
        handleEditAccount,
        handleDeleteAccount,
        handleSelectAccount,
        getAccount,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
}

export function useAccounts() {
  const context = useContext(AccountsContext);
  if (!context) {
    throw new Error('useAccounts must be used within an AccountsProvider');
  }
  return context;
}
