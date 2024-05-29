import React, { useCallback, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { NavSide } from '../../components/NavSide'
import { NavBar } from '../../components/NavBar'
import { Container, Content } from './styles'

import api from '../../services/api'
import { useToast } from '../../hooks/Toast'
import { useAuth } from '../../hooks/Auth'

const DashBoard: React.FC = () => {
  const { addToast } = useToast()
  const { signOut } = useAuth()

  const verifyToken = useCallback(() => {
    const token = localStorage.getItem('@Myfinance:token')

    if (!token) {
      addToast({
        type: 'info',
        title: 'Usuario não autenticado',
        description: 'Faça login para continuar',
      })
      signOut()
    } else {
      api.post('/auth/check', { token }).catch(() => {
        addToast({
          type: 'info',
          title: 'Sessão expirada',
          description: 'Faça login novamente',
        })
        signOut()
      })
    }
  }, [addToast, signOut])

  useEffect(() => {
    verifyToken()
  }, [verifyToken])

  return (
    <Container>
      <NavSide />
      <Content>
        <NavBar />
        <Outlet />
      </Content>
    </Container>
  )
}

export default DashBoard
