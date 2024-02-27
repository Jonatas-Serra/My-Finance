import React from 'react';

import { AuthProvider } from './Auth';
import { ToastProvider } from './Toast';
import { UserProvider } from './User';
import { TransactionsProvider } from './useTransactions';
import { WalletsProvider } from './useWallets';

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <UserProvider>
        <WalletsProvider>
          <TransactionsProvider>
            {children}
          </TransactionsProvider>
        </WalletsProvider>
      </UserProvider>
    </ToastProvider>
  </AuthProvider>
)


export default AppProvider
