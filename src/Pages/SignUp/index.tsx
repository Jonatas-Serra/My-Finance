import { useCallback, useRef, useState } from 'react'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'

import { Container, Content, Info, TopLogin, Login, Button } from './styles'
import { Input } from '../../components/Input'
import imgSignUp from '../../assets/imgSignUp.png'
import logoImg from '../../assets/logo.svg'

import { FiUser, FiPhone, FiMail, FiLock } from 'react-icons/fi'

import api from '../../services/api'

import { useToast } from '../../hooks/useToast'

import getValidationErrors from '../../utils/getValidationErrors'

interface SignUpFormData {
  name: string
  phone: string
  email: string
  password: string
  confirm: string
}

const formatPhoneNumber = (value: string) => {
  const cleanedValue = value.replace(/\D/g, '')
  const match = cleanedValue.match(/^(\d{2})(\d{1,5})(\d{0,4})$/)

  if (match) {
    return `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ''}`
  }

  return value
}

export default function Signup() {
  const formRef = useRef<FormHandles>(null)
  const navigate = useNavigate()
  const { addToast } = useToast()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(false)

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          phone: Yup.string().required('Telefone obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          confirm: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Confirmação incorreta',
          ),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await api.post('/users/signup', data)
        setBtnDisabled(true)

        navigate('/')

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu login no My Finance!',
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
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        })
      }
      setBtnDisabled(false)
    },
    [addToast, navigate],
  )

  const handlePhoneChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      const cleanedValue = value.replace(/\D/g, '')
      const formattedPhone = formatPhoneNumber(cleanedValue)
      setPhone(formattedPhone)
    },
    [],
  )

  return (
    <Container>
      <Content>
        <Info>
          <h1>Cadastre-se</h1>
          <p>
            Com uma interface amigável e funcionalidades abrangentes, oferecemos
            uma solução completa para manter suas finanças pessoais sob
            controle.{' '}
          </p>
          <img src={imgSignUp} alt="" />
        </Info>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <TopLogin>
            <img src={logoImg} alt="" />
            <h1>My Finance</h1>
          </TopLogin>
          <Login>
            <Input
              name="name"
              icon={FiUser}
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              id="phone"
              name="phone"
              icon={FiPhone}
              type="tel"
              placeholder="Telefone"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={15}
            />
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
              icon={FiLock}
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              name="confirm"
              icon={FiLock}
              type="password"
              placeholder="Confirmar senha"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </Login>

          <Button disabled={btnDisabled} type="submit">
            Criar conta
          </Button>

          <p>
            Já possui uma conta? <Link to="/">Entrar</Link>
          </p>
        </Form>
      </Content>
    </Container>
  )
}
