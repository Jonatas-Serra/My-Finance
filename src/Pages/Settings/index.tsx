import { useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { useToast } from '../../hooks/useToast'
import { useAccounts } from '../../hooks/useAccounts'
import { useTransactions } from '../../hooks/useTransactions'
import Modal from 'react-modal'
import {
  Container,
  UserInformation,
  Form,
  Section,
  InputGroup,
  Button,
  ProfilePicture,
  CategoriesList,
  CategoryItem,
  DeleteButton,
  ContentModalDelete,
} from './styles'
import api from '../../services/api'

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

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    try {
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
      addToast({
        type: 'error',
        title: 'Erro ao atualizar perfil',
        description: 'Não foi possível atualizar seu perfil. Tente novamente.',
      })
    }
  }

  const handleUpdateProfilePicture = async (event) => {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('profilePicture', file)

    try {
      const response = await api.post(`upload/users/${user._id}`, formData, {
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

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmNewPassword) {
      addToast({
        type: 'error',
        title: 'Erro na troca de senha',
        description: 'A nova senha e a confirmação de senha não coincidem.',
      })
      return
    }

    try {
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
      addToast({
        type: 'error',
        title: 'Erro na troca de senha',
        description: 'Não foi possível trocar a senha. Tente novamente.',
      })
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

  return (
    <Container>
      <UserInformation>
        <Form onSubmit={handleUpdateProfile}>
          <Section>
            <h2>Informações do Perfil</h2>
            <InputGroup>
              <label>Nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <label>Telefone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <label>Foto do Perfil</label>
              <input
                id="profilePicture"
                type="file"
                onChange={handleUpdateProfilePicture}
              />
              {profilePicture && (
                <ProfilePicture src={profilePicture} alt="Foto de Perfil" />
              )}
            </InputGroup>
            <Button type="submit">Atualizar Perfil</Button>
          </Section>
        </Form>

        <Form onSubmit={handleChangePassword}>
          <Section>
            <h2>Trocar Senha</h2>
            <InputGroup>
              <label>Senha Atual</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <label>Nova Senha</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <label>Confirmar Nova Senha</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </InputGroup>
            <Button type="submit">Trocar Senha</Button>
          </Section>
        </Form>

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
