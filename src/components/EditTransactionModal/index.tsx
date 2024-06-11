import { FormEvent, useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useTransactions } from '../../hooks/useTransactions'
import { useWallets } from '../../hooks/useWallets'
import { useUser } from '../../hooks/useUser'
import { useToast } from '../../hooks/useToast'

import { Container, TransactionTypeContainer, RadioBox } from './styles'

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/Receita.svg'
import outcomeImg from '../../assets/Despesa.svg'

interface Transaction {
  _id: string
  description: string
  type: string
  category: string
  amount: number
  createdAt: string
  createdBy: string
  walletId: string
  date: string
}

interface EditTransitionModalProps {
  isOpen: boolean
  onRequestClose: () => void
  selectedTransaction: Transaction
}

export function EditTransitionModal({
  isOpen,
  onRequestClose,
  selectedTransaction,
}: EditTransitionModalProps) {
  const { handleEditTransaction } = useTransactions()
  const { addToast } = useToast()
  const { wallets } = useWallets()
  const { user, handleUpdateUser } = useUser()

  const currentDate = new Date().toISOString().split('T')[0]

  const [description, setDescription] = useState(
    selectedTransaction.description,
  )
  const [amount, setAmount] = useState(selectedTransaction.amount)
  const [category, setCategory] = useState(selectedTransaction.category)
  const [newCategory, setNewCategory] = useState('')
  const [type, setType] = useState(selectedTransaction.type)
  const [date, setDate] = useState(selectedTransaction.date)
  const [walletId, setWalletId] = useState(selectedTransaction.walletId)
  const [btnDisabled, setBtnDisabled] = useState(false)

  useEffect(() => {
    setDescription(selectedTransaction.description)
    setAmount(selectedTransaction.amount)
    setCategory(selectedTransaction.category)
    setType(selectedTransaction.type)
    setDate(selectedTransaction.date)
    setWalletId(selectedTransaction.walletId)
  }, [selectedTransaction])

  async function handleEditTransition(event: FormEvent) {
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
    handleEditTransaction({
      _id: selectedTransaction._id,
      description,
      amount,
      category: newCategory || category,
      type,
      createdAt: selectedTransaction.createdAt,
      date,
      createdBy: selectedTransaction.createdBy,
      walletId,
    })

    addToast({
      type: 'success',
      title: 'Lançamento editado com sucesso!',
      description: `O lançamento ${description} foi editado com sucesso.`,
    })
    onRequestClose()

    setDescription('')
    setAmount(0)
    setCategory('')
    setType('deposit')
    setDate('')
    setWalletId('')
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
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleEditTransition}>
        <h2>Editar Lançamento</h2>
        <input
          placeholder="Título"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <input
          type="text"
          placeholder="Valor"
          value={
            amount === 0
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
          {user.categories?.map((category) => (
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
        <select
          placeholder="Selecione a carteira"
          value={walletId}
          onChange={(event) => {
            setWalletId(event.target.value)
          }}
        >
          <option className="styledOption" value="" disabled>
            Selecione a carteira
          </option>
          {wallets?.map((wallet) => (
            <option
              className="styledOption"
              key={wallet._id}
              value={wallet._id}
            >
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
        <div className="formaction">
          <button type="button" onClick={onRequestClose}>
            Cancelar
          </button>
          <button disabled={btnDisabled} type="submit">
            Salvar
          </button>
        </div>
      </Container>
    </Modal>
  )
}
