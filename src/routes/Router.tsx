import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import Forgot from '../Pages/Forgot'
import DashBoard from '../Pages/DashBoard'
import Resume from '../Pages/Resume'
import Transactions from '../Pages/Transactions'
import Wallets from '../Pages/Wallets'
import Receivables from '../Pages/Receivables'
import Payables from '../Pages/Payables'
import Settings from '../Pages/Settings'
import ResetPassword from '../Pages/ResetPassword'

import ProtectedRoute from './ProtectedRoute'

export function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedRoute>
            <SignUp />
          </ProtectedRoute>
        }
      />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isPrivate>
            <DashBoard />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={<Navigate to="/dashboard/resume" />}
        />
        <Route path="resume" element={<Resume />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="wallets" element={<Wallets />} />
        <Route path="receivables" element={<Receivables />} />
        <Route path="payables" element={<Payables />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
