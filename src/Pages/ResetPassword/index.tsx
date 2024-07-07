import { useRef, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useToast } from '../../hooks/useToast'
import api from '../../services/api'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import {
  Container,
  Content,
  Info,
  FormContainer,
  TopLogin,
  LoginForm,
  Button,
} from './styles'
import { Input } from '../../components/Input'
import imgReset from '../../assets/imgReset.png'
import logoImg from '../../assets/logo.svg'
import { FiLock } from 'react-icons/fi'

export default function ResetPassword() {
  const formRef = useRef<FormHandles>(null)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { addToast } = useToast()
  const token = searchParams.get('token')?.toString()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const handleResetPassword = async (data: {
    password: string
    confirm: string
  }) => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        password: Yup.string()
          .required('A senha é obrigatória')
          .min(6, 'A senha deve ter no mínimo 6 caracteres'),
        confirm: Yup.string().oneOf(
          [Yup.ref('password'), null],
          'As senhas não coincidem',
        ),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      if (!token) {
        addToast({
          type: 'error',
          title: 'Token não encontrado',
          description: 'Token de recuperação de senha inválido.',
        })
        return
      }

      await api.post('/auth/reset-password', {
        token,
        newPassword: data.password,
      })

      addToast({
        type: 'success',
        title: 'Senha alterada',
        description: 'Sua senha foi alterada com sucesso.',
      })

      navigate('/')
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {}
        err.inner.forEach((error) => {
          validationErrors[error.path ?? ''] = error.message
        })
        formRef.current?.setErrors(validationErrors)
        return
      }

      let errorMsg = 'Ocorreu um erro ao resetar sua senha, tente novamente.'

      if ((err as any).response) {
        switch ((err as any).response.data.message) {
          case 'Invalid or expired token':
            errorMsg = 'O link expirou ou já foi utilizado.'
            break
          case 'Token already used':
            errorMsg = 'O link já foi utilizado.'
            break
          case 'Expired token':
            errorMsg = 'O link expirou. Seu prazo é de 15 minutos.'
            break
          default:
            errorMsg = (err as any).response.data.message || errorMsg
        }
      }

      addToast({
        type: 'error',
        title: 'Erro ao resetar senha',
        description: errorMsg,
      })
    }
  }

  return (
    <Container>
      <Content>
        <Info>
          <h1>Defina sua senha</h1>
          <p>
            Estamos quase lá! Defina sua nova senha e abra as portas para um
            mundo de possibilidades financeiras. Pronto para começar a jornada
            com uma senha mais segura e estilosa?{' '}
          </p>
          <img src={imgReset} alt="Imagem de redefinição de senha" />
        </Info>
        <FormContainer>
          <Form onSubmit={handleResetPassword} ref={formRef}>
            <TopLogin>
              <img src={logoImg} alt="logomarca my finance" />
              <h1>My Finance</h1>
            </TopLogin>
            <LoginForm>
              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Nova senha"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <Input
                name="confirm"
                icon={FiLock}
                type="password"
                placeholder="Confirmar nova senha"
                onChange={(e) => setConfirm(e.target.value)}
                value={confirm}
              />
            </LoginForm>
            <br />
            <Button type="submit">Confirmar</Button>
          </Form>
        </FormContainer>
      </Content>
    </Container>
  )
}
