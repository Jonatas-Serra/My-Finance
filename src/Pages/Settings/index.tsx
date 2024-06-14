import { useState, useRef, useCallback } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { useUser } from '../../hooks/useUser'
import { useToast } from '../../hooks/useToast'
import { useAccounts } from '../../hooks/useAccounts'
import { useTransactions } from '../../hooks/useTransactions'
import Modal from 'react-modal'
import { Input } from '../../components/Input'
import {
  Container,
  UserInformation,
  Section,
  InputGroup,
  Button,
  ProfilePicture,
  CategoriesList,
  CategoryItem,
  DeleteButton,
  ContentModalDelete,
  ButtonGroup,
  ProfilePictureArea,
} from './styles'
import api from '../../services/api'
import getValidationErrors from '../../utils/getValidationErrors'
import { FiKey, FiLock, FiMail, FiPhone, FiUser } from 'react-icons/fi'

export default function Settings() {
  const { user, handleUpdateUser } = useUser()
  const { addToast } = useToast()
  const { accounts } = useAccounts()
  const { transactions } = useTransactions()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)
  const [profilePicture, setProfilePicture] = useState(user.photo || '')
  const [newCategory, setNewCategory] = useState('')
  const [categories, setCategories] = useState(user.categories)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState('')
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false)
  const [isFinalDeleteAccountModalOpen, setIsFinalDeleteAccountModalOpen] =
    useState(false)
  const token = localStorage.getItem('@Myfinance:token')

  const formRef = useRef<FormHandles>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleUpdateProfile = async () => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        phone: Yup.string().required('Telefone obrigatório'),
      })

      await schema.validate(
        { name, email, phone },
        {
          abortEarly: false,
        },
      )

      await handleUpdateUser({
        ...user,
        name,
        email,
        phone,
        photo: profilePicture,
      })

      addToast({
        type: 'success',
        title: 'Perfil atualizado!',
        description: 'Suas informações foram atualizadas com sucesso.',
      })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)
      } else {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar perfil',
          description:
            'Não foi possível atualizar seu perfil. Tente novamente.',
        })
      }
    }
  }

  const handleUpdateProfilePicture = async () => {
    if (
      !fileInputRef.current ||
      !fileInputRef.current.files ||
      fileInputRef.current.files.length === 0
    ) {
      return
    }

    const file = new FormData()
    file.append('file', fileInputRef.current.files[0])

    try {
      const response = await api.post(`upload/user/${user._id}`, file, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      setProfilePicture(response.data.photo)
      await handleUpdateUser({ ...user, photo: response.data.photo })
      addToast({
        type: 'success',
        title: 'Foto de perfil atualizada!',
        description: 'Sua foto de perfil foi atualizada com sucesso.',
      })
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao atualizar foto de perfil',
        description:
          'Não foi possível atualizar sua foto de perfil. Tente novamente.',
      })
    }
  }

  const handleRemoveProfilePicture = async () => {
    try {
      await api.delete(`/upload/user/${user._id}/photo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setProfilePicture('')
      await handleUpdateUser({ ...user, photo: '' })
      addToast({
        type: 'success',
        title: 'Foto de perfil removida!',
        description: 'Sua foto de perfil foi removida com sucesso.',
      })
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao remover foto de perfil',
        description:
          'Não foi possível remover sua foto de perfil. Tente novamente.',
      })
    }
  }

  const handleChangePassword = async () => {
    if (!currentPassword) {
      addToast({
        type: 'error',
        title: 'Senha atual obrigatória',
        description: 'O campo de senha atual é obrigatório.',
      })
      return
    }
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        currentPassword: Yup.string().required('Senha atual obrigatória'),
        newPassword: Yup.string()
          .min(6, 'A nova senha deve ter no mínimo 6 caracteres')
          .required('Nova senha obrigatória'),
        confirmNewPassword: Yup.string()
          .oneOf(
            [Yup.ref('newPassword'), null],
            'Confirmação de senha não coincide',
          )
          .required('Confirmação de senha obrigatória'),
      })

      await schema.validate(
        { currentPassword, newPassword, confirmNewPassword },
        {
          abortEarly: false,
        },
      )

      await api.patch(
        `/users/${user._id}/change-password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      addToast({
        type: 'success',
        title: 'Senha atualizada!',
        description: 'Sua senha foi atualizada com sucesso.',
      })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)
        formRef.current?.setErrors(errors)
      } else {
        addToast({
          type: 'error',
          title: 'Erro na troca de senha',
          description: 'Não foi possível trocar a senha. Tente novamente.',
        })
      }
    }
  }

  const handleAddCategory = async () => {
    if (!newCategory) {
      addToast({
        type: 'error',
        title: 'Categoria inválida',
        description: 'O nome da categoria não pode ser vazio.',
      })
      return
    }

    if (categories.includes(newCategory)) {
      addToast({
        type: 'error',
        title: 'Categoria já existe',
        description: 'Não é possível adicionar uma categoria que já existe.',
      })
      return
    }

    try {
      const updatedCategories = [...categories, newCategory]
      await handleUpdateUser({ ...user, categories: updatedCategories })
      setCategories(updatedCategories)
      setNewCategory('')
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao adicionar categoria',
        description: 'Não foi possível adicionar a categoria. Tente novamente.',
      })
    }
  }

  const handleDeleteCategory = async () => {
    const hasCategoryInUse =
      accounts.some((account) => account.category === categoryToDelete) ||
      transactions.some(
        (transaction) => transaction.category === categoryToDelete,
      )

    if (hasCategoryInUse) {
      addToast({
        type: 'error',
        title: 'Categoria em uso',
        description: 'Não é possível deletar uma categoria que está em uso.',
      })
      setIsDeleteModalOpen(false)
      return
    }

    try {
      const updatedCategories = categories.filter(
        (cat) => cat !== categoryToDelete,
      )
      await handleUpdateUser({ ...user, categories: updatedCategories })
      setCategories(updatedCategories)
      setIsDeleteModalOpen(false)
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao deletar categoria',
        description: 'Não foi possível deletar a categoria. Tente novamente.',
      })
    }
  }

  const handleDeleteAccount = () => {
    setIsDeleteAccountModalOpen(true)
  }

  const confirmDeleteAccount = async () => {
    setIsDeleteAccountModalOpen(false)
    setIsFinalDeleteAccountModalOpen(true)
  }

  const finalDeleteAccount = async () => {
    setIsFinalDeleteAccountModalOpen(false)
    try {
      await api.delete(`/users/${user._id}`)
      addToast({
        type: 'success',
        title: 'Conta excluída',
        description: 'Sua conta foi excluída com sucesso.',
      })
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao excluir conta',
        description: 'Não foi possível excluir sua conta. Tente novamente.',
      })
    }
  }

  const handleClickUpdatePhoto = () => {
    fileInputRef.current?.click()
  }

  const formatPhoneNumber = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '')
    const match = cleanedValue.match(/^(\d{2})(\d{1,5})(\d{0,4})$/)

    if (match) {
      return `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ''}`
    }

    return value
  }

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
      <UserInformation>
        <Section>
          <Form ref={formRef} onSubmit={handleUpdateProfile}>
            <h2>Informações do Perfil</h2>
            <InputGroup>
              <label>Nome</label>
              <Input
                name="name"
                icon={FiUser}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <label>Email</label>
              <Input
                name="email"
                icon={FiMail}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <label>Telefone</label>
              <Input
                name="phone"
                icon={FiPhone}
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                maxLength={15}
              />
              <Button className="mt-1" type="submit">
                Atualizar Perfil
              </Button>
            </InputGroup>
          </Form>

          <Form ref={formRef} onSubmit={handleChangePassword}>
            <h2>Trocar Senha</h2>
            <InputGroup>
              <label>Senha Atual</label>
              <Input
                name="password"
                icon={FiKey}
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <label>Nova Senha</label>
              <Input
                name="newPassword"
                icon={FiLock}
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <label>Confirmar Nova Senha</label>
              <Input
                name="confirmNewPassword"
                icon={FiLock}
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </InputGroup>
            <Button type="submit">Trocar Senha</Button>
          </Form>
        </Section>

        <Section>
          <InputGroup>
            <h2>Foto do Perfil</h2>
            <input
              id="profilePicture"
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleUpdateProfilePicture}
            />
            {profilePicture ? (
              <ProfilePictureArea>
                <ProfilePicture src={profilePicture} alt="Foto de Perfil" />
                <ButtonGroup>
                  <Button type="button" onClick={handleRemoveProfilePicture}>
                    Remover Foto
                  </Button>
                  <Button type="button" onClick={handleClickUpdatePhoto}>
                    Atualizar Foto
                  </Button>
                </ButtonGroup>
              </ProfilePictureArea>
            ) : (
              <Button type="button" onClick={handleClickUpdatePhoto}>
                Adicionar Foto
              </Button>
            )}
          </InputGroup>
        </Section>

        <Section>
          <h2>Categorias</h2>
          <InputGroup className="flex">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Adicionar nova categoria"
            />
            <Button onClick={handleAddCategory}>Adicionar</Button>
          </InputGroup>
          <CategoriesList>
            {categories?.map((category) => (
              <CategoryItem key={category}>
                {category}
                <DeleteButton
                  onClick={() => {
                    setCategoryToDelete(category)
                    setIsDeleteModalOpen(true)
                  }}
                >
                  Deletar
                </DeleteButton>
              </CategoryItem>
            ))}
          </CategoriesList>
        </Section>
      </UserInformation>
      <Section>
        <h2>Segurança</h2>
        <Button onClick={handleDeleteAccount}>Excluir Conta</Button>
      </Section>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <ContentModalDelete>
          <h2>Excluir Categoria</h2>
          <p>
            Tem certeza que deseja excluir a categoria{' '}
            <strong>{categoryToDelete}</strong>?
          </p>
          <div>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="cancel"
            >
              Cancelar
            </button>
            <button onClick={handleDeleteCategory}>Excluir</button>
          </div>
        </ContentModalDelete>
      </Modal>

      <Modal
        isOpen={isDeleteAccountModalOpen}
        onRequestClose={() => setIsDeleteAccountModalOpen(false)}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <ContentModalDelete>
          <h2>Excluir Conta</h2>
          <p>
            Tem certeza que deseja excluir sua conta? Esta ação não pode ser
            desfeita.
          </p>
          <div>
            <button
              onClick={() => setIsDeleteAccountModalOpen(false)}
              className="cancel"
            >
              Cancelar
            </button>
            <button onClick={confirmDeleteAccount}>Excluir</button>
          </div>
        </ContentModalDelete>
      </Modal>

      <Modal
        isOpen={isFinalDeleteAccountModalOpen}
        onRequestClose={() => setIsFinalDeleteAccountModalOpen(false)}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <ContentModalDelete>
          <h2>Confirmação Final</h2>
          <p>
            Esta ação é irreversível. Tem certeza de que deseja excluir sua
            conta e perder todos os seus dados?
          </p>
          <div>
            <button
              onClick={() => setIsFinalDeleteAccountModalOpen(false)}
              className="cancel"
            >
              Cancelar
            </button>
            <button onClick={finalDeleteAccount}>
              Excluir Permanentemente
            </button>
          </div>
        </ContentModalDelete>
      </Modal>
    </Container>
  )
}
