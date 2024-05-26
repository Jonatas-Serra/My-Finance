import { useState, useCallback, useRef } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import getValidationErrors from '../../utils/getValidationErrors'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock } from 'react-icons/fi'
import { Input } from '../../components/Input'
import { Container, Content, Info, TopLogin, LoginForm, Button } from './styles'
import imgLogin from '../../assets/imgLogin.png'
import logoImg from '../../assets/logo.svg'
import { useToast } from '../../hooks/Toast'
import { useAuth } from '../../hooks/Auth'

interface SignInFormData {
  email: string
  password: string
}

export default function Login() {
  const formRef = useRef<FormHandles>(null)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(false)

  const { signIn } = useAuth()
  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      setBtnDisabled(true)
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        })

        schema.validate(data, { abortEarly: false })

        await signIn({
          email: data.email,
          password: data.password,
        })

        navigate('/dashboard')
        addToast({
          type: 'success',
          title: 'Login realizado com sucesso!',
          description: 'Você já pode acessar sua conta.',
        })
        setBtnDisabled(false)
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        })
        setBtnDisabled(false)
      }
    },
    [addToast, signIn, navigate],
  )

  return (
    <Container>
      <Content>
        <Info>
          <h1>Login</h1>
          <p>
            Nosso aplicativo foi desenvolvido para proporcionar a você uma
            experiência intuitiva e eficiente no gerenciamento das suas
            finanças.{' '}
          </p>
          <img src={imgLogin} alt="" />
        </Info>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <TopLogin>
            <img src={logoImg} alt="" />
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
            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </LoginForm>
          <Link to="/forgot">Esqueci minha senha</Link>
          <br />
          <Button disabled={btnDisabled} type="submit">
            Entrar
          </Button>
          <p>
            Não possui uma conta? <Link to="/signup"> Cadastre-se</Link>
          </p>
        </Form>
      </Content>
    </Container>
  )
}
