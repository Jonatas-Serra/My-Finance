import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { NavSide } from "../../components/NavSide";
import { Container, Content } from './styles';

import api from '../../services/api';
import { useToast } from '../../hooks/Toast';
import { useAuth } from '../../hooks/Auth';



const DashBoard: React.FC = () => {
  const { addToast } = useToast()
  const { signOut } = useAuth()

  const verifyToken = () => {
    const token = localStorage.getItem('@Myfinance:token');

    if (!token) {
      signOut()
      addToast({
        type: 'info',
        title: 'Usuario não autenticado',
        description: 'Faça login para continuar',
      })
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
  }

  useEffect(() => {
    setTimeout(() => {
    verifyToken()
    }
    , 1000)
  }, [])

  return (
    <Container>
      <NavSide />
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
}

export default DashBoard;