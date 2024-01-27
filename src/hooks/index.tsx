import React from 'react';

import { AuthProvider } from './Auth';
import { ToastProvider } from './Toast';
import { UserProvider } from './User';

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </ToastProvider>
  </AuthProvider>
)


export default AppProvider
