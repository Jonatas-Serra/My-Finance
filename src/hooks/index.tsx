import React from 'react';

import { AuthProvider } from './Auth';
import { ToastProvider } from './Toast';
import { UserProvider } from './User';
import { TransactionsProvider } from './useTransactions';
import { WalletsProvider } from './useWallets';
import { AccountsProvider } from './useAccounts';

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <UserProvider>
        <WalletsProvider>
          <AccountsProvider>
            <TransactionsProvider>
              {children}
            </TransactionsProvider>
          </AccountsProvider>
        </WalletsProvider>
      </UserProvider>
    </ToastProvider>
  </AuthProvider>
)


export default AppProvider
