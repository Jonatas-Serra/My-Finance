import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useToast } from '../../hooks/useToast'

import api from '../../services/api'

import { Container, Content, Input, Button } from './styles'
import imgReset from '../../assets/imgReset.png'
import logoImg from '../../assets/logo.svg'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const token = searchParams.get('token')?.toString()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!token) {
      addToast({
        type: 'error',
        title: 'Token não encontrado',
        description: 'Token de recuperação de senha inválido.',
      })
      return
    }

    if (password !== confirmPassword) {
      addToast({
        type: 'error',
        title: 'Erro na confirmação',
        description: 'As senhas não coincidem.',
      })
      return
    }

    try {
      await api.post('/auth/reset-password', {
        token,
        newPassword: password,
      })

      addToast({
        type: 'success',
        title: 'Senha alterada',
        description: 'Sua senha foi alterada com sucesso.',
      })

      navigate('/')
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao resetar senha',
        description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
      })
    }
  }

  return (
    <Container>
      <Content>
        <div>
          <h1>Defina sua senha</h1>
          <p>
            Estamos quase lá! Defina sua nova senha e abra as portas para um
            mundo de possibilidades financeiras. Pronto para começar a jornada
            com uma senha mais segura e estilosa?{' '}
          </p>
          <img src={imgReset} alt="" />
        </div>
        <form onSubmit={handleResetPassword}>
          <div>
            <img src={logoImg} alt="logomarca my finance" />
            <h1>My Finance</h1>
          </div>
          <Input
            type="password"
            placeholder="Nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirmar nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <Button type="submit">Confirmar</Button>
        </form>
      </Content>
    </Container>
  )
}
