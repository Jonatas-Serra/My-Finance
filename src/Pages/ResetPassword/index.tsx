import { useState } from 'react'

import { Container, Content, Input, Button } from './styles'
import imgReset from '../../assets/imgReset.png'
import logoImg from '../../assets/logo.svg'

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

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
        <form action="">
          <div>
            <img src={logoImg} alt="logomarca my finance" />
            <h1>My Finance</h1>
          </div>
          <Input
            type="password"
            placeholder="Nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirmar nova senha"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <br />
          <Button
            onClick={() => {
              console.log('Enviado')
            }}
          >
            Confirmar
          </Button>

          <p>
            Já tem uma conta? <a href="/">Entrar</a>
          </p>
        </form>
      </Content>
    </Container>
  )
}
