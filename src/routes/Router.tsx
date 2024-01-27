import { Routes, Route } from 'react-router-dom'
import Login from '../Pages/Login'
import SignUp  from '../Pages/SignUp'
import Forgot from '../Pages/Forgot'

import ProtectedRoute from './ProtectedRoute'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        } />
      <Route path="/signup" element={
          <ProtectedRoute>
            <SignUp />
          </ProtectedRoute>
        } />
      <Route path="/forgot" element={<Forgot />} />
    </Routes>
  )
}