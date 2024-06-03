import React, { useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { NavSide } from '../../components/NavSide'
import { NavBar } from '../../components/NavBar'
import { Container, Content, MainContent } from './styles'

import api from '../../services/api'
import { useToast } from '../../hooks/useToast'
import { useAuth } from '../../hooks/Auth'

const DashBoard: React.FC = () => {
  const { addToast } = useToast()
  const { signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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
      <NavSide isMenuOpen={isMenuOpen} />
      <Content isMenuOpen={isMenuOpen}>
        <MainContent>
          <NavBar toggleMenu={toggleMenu} />
          <Outlet />
        </MainContent>
      </Content>
    </Container>
  )
}

export default DashBoard
