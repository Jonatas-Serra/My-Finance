import { FormEvent, useState } from 'react'
import Modal from 'react-modal'
import { useTransactions } from '../../hooks/useTransactions'
import { useWallets } from '../../hooks/useWallets'
import { useUser } from '../../hooks/useUser'
import { useToast } from '../../hooks/useToast'

import { Container, TransactionTypeContainer, RadioBox } from './styles'

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/Receita.svg'
import outcomeImg from '../../assets/Despesa.svg'

interface NewTransitionModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

export function NewTransitionModal({
  isOpen,
  onRequestClose,
}: NewTransitionModalProps) {
  const { createTransaction } = useTransactions()
  const { user, handleUpdateUser } = useUser()
  const { wallets } = useWallets()
  const { addToast } = useToast()

  const currentDate = new Date().toISOString().split('T')[0]

  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [type, setType] = useState('Deposit')
  const [walletId, setWalletId] = useState('')
  const [date, setDate] = useState(currentDate)
  const createdBy = user._id
  const [btnDisabled, setBtnDisabled] = useState(false)

  async function handleCreateNewTransition(event: FormEvent) {
    event.preventDefault()

    if (newCategory) {
      const updatedUser = {
        ...user,
        categories: [...user.categories, newCategory],
      }
      await handleUpdateUser(updatedUser)
      setCategory(newCategory)
      setNewCategory('')
    }

    setBtnDisabled(true)
    await createTransaction({
      description,
      amount,
      category: newCategory || category,
      type,
      createdBy,
      walletId,
      date,
    })

    addToast({
      type: 'success',
      title: 'Lançamento criado com sucesso!',
      description: `O lançamento ${description} foi criado com sucesso.`,
    })

    onRequestClose()
    handleClear()
  }

  const handleClear = () => {
    setDescription('')
    setAmount(0)
    setCategory('')
    setType('Deposit')
    setWalletId('')
    setDate(currentDate)
    setBtnDisabled(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={() => {
          onRequestClose()
          handleClear()
        }}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransition}>
        <h2>Cadastrar Lançamento</h2>
        <input
          required
          placeholder="Título"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <input
          required
          type="text"
          placeholder="Valor"
          value={
            amount === -1
              ? ''
              : new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(amount)
          }
          onChange={(event) => {
            const newValue = event.target.value
            setTimeout(() => {
              setAmount(Number(newValue.replace(/\D/g, '')) / 100)
            }, 1)
          }}
        />
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => {
              setType('Deposit')
            }}
            isActive={type === 'Deposit'}
            className={type === 'Deposit' ? 'Deposit' : ''}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => {
              setType('Withdrawal')
            }}
            isActive={type === 'Withdrawal'}
            className={type === 'Withdrawal' ? 'Withdrawal' : ''}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <select
          required
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="" disabled>
            Selecione a categoria
          </option>
          {user?.categories?.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
          <option value="newCategory">Adicionar nova categoria</option>
        </select>
        {category === 'newCategory' && (
          <input
            required
            placeholder="Nova Categoria"
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
          />
        )}
        <input type="hidden" value={createdBy} />
        <select
          required
          placeholder="Selecione a carteira"
          value={walletId}
          onChange={(event) => setWalletId(event.target.value)}
        >
          <option value="" disabled>
            Selecione a carteira
          </option>
          {wallets?.map((wallet) => (
            <option key={wallet._id} value={wallet._id}>
              {wallet.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          max={currentDate}
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <button disabled={btnDisabled} type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  )
}
