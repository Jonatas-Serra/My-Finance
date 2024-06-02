import { useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { useToast } from '../../hooks/useToast'
import { useAccounts } from '../../hooks/useAccounts'
import { useTransactions } from '../../hooks/useTransactions'
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
} from './styles'

export default function Settings() {
  const { user, handleUpdateUser } = useUser()
  const { addToast } = useToast()
  const { accounts } = useAccounts()
  const { transactions } = useTransactions()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)
  const [profilePicture, setProfilePicture] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [categories, setCategories] = useState(user.categories)

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

  const handleAddCategory = () => {
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

    setCategories([...categories, newCategory])
    setNewCategory('')
  }

  const handleDeleteCategory = (category) => {
    const hasCategoryInUse =
      accounts.some((account) => account.category === category) ||
      transactions.some((transaction) => transaction.category === category)

    if (hasCategoryInUse) {
      addToast({
        type: 'error',
        title: 'Categoria em uso',
        description: 'Não é possível deletar uma categoria que está em uso.',
      })
      return
    }

    setCategories(categories.filter((cat) => cat !== category))
  }

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
      )
    ) {
      try {
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
              <input type="file" onChange={() => setProfilePicture('ok')} />
              {user.photo && (
                <ProfilePicture src={user.photo} alt="Foto de Perfil" />
              )}
            </InputGroup>
            <Button type="submit">Atualizar Perfil</Button>
          </Section>
        </Form>

        <Section>
          <h2>Categorias</h2>
          <InputGroup>
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
                <DeleteButton onClick={() => handleDeleteCategory(category)}>
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
    </Container>
  )
}
