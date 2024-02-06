import React from 'react';

import { AuthProvider } from './Auth';
import { ToastProvider } from './Toast';
import { UserProvider } from './User';
import { TransactionsProvider } from './useTransactions';

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <UserProvider>
        <TransactionsProvider>
          {children}
        </TransactionsProvider>
      </UserProvider>
    </ToastProvider>
  </AuthProvider>
)


export default AppProvider
