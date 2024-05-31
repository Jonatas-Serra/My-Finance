import { useState, useCallback, useRef } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import getValidationErrors from '../../utils/getValidationErrors'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '../../hooks/Toast'

import api from '../../services/api'

import { Container, Content, Info, TopLogin, LoginForm, Button } from './styles'
import { Input } from '../../components/Input'
import { FiMail } from 'react-icons/fi'
import imgForgot from '../../assets/imgForgot.png'
import logoImg from '../../assets/logo.svg'

interface ForgotFormData {
  email: string
}

export default function Forgot() {
  const formRef = useRef<FormHandles>(null)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: ForgotFormData) => {
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        })

        schema.validate(data, { abortEarly: false })

        await api.post('/auth/request-password-reset', {
          email: data.email,
        })

        navigate('/')

        addToast({
          type: 'success',
          title: 'E-mail enviado com sucesso!',
          description: 'Siga os passos e redefina sua senha.',
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          addToast({
            type: 'error',
            title: 'Erro na recuperação de senha',
            description:
              'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.',
          })

          return
        }

        addToast({
          type: 'error',
          title: 'Email não encontrado!',
          description:
            'Infelizmente não encontramos nenhum usuário com esse e-mail.',
        })
      }
    },
    [addToast, navigate],
  )

  return (
    <Container>
      <Content>
        <Info>
          <h1>Esqueci a senha</h1>
          <p>
            Ops! Parece que alguém esqueceu a senha. Não se preocupe, estamos
            aqui para ajudar! Informe seu e-mail e prepare-se para desbloquear
            sua conta com estilo.{' '}
          </p>
          <img src={imgForgot} alt="" />
        </Info>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <TopLogin>
            <img src={logoImg} alt="logomarca my finance" />
            <h1>My Finance</h1>
          </TopLogin>
          <LoginForm>
            <Input
              name="email"
              icon={FiMail}
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </LoginForm>
          <p>Enviaremos um link para você redefinir sua senha.</p>
          <br />
          <Button type="submit">Confirmar</Button>

          <p>
            Lembrou a senha? <Link to="/">Entrar</Link>
          </p>
        </Form>
      </Content>
    </Container>
  )
}
