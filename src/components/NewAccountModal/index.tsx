import { FormEvent, useState } from 'react'
import Modal from 'react-modal'
import { useWallets } from '../../hooks/useWallets'
import { useUser } from '../../hooks/useUser'
import { useAccounts } from '../../hooks/useAccounts'
import { useToast } from '../../hooks/useToast'

import { Container } from './styles'

import closeImg from '../../assets/close.svg'

interface NewAccountModalProps {
  typeOfAccount: string
  isOpen: boolean
  onRequestClose: () => void
}

export function NewAccountModal({
  typeOfAccount,
  isOpen,
  onRequestClose,
}: NewAccountModalProps) {
  const { user, handleUpdateUser } = useUser()
  const { wallets } = useWallets()
  const { addToast } = useToast()

  const currentDate = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]

  const [type, setType] = useState(typeOfAccount)
  const [value, setValue] = useState(0)
  const [dueDate, setDueDate] = useState(currentDate)
  const issueDate = new Date().toISOString()
  const [documentNumber, setDocumentNumber] = useState('')
  const [category, setCategory] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [documentType, setDocumentType] = useState('')
  const [description, setDescription] = useState('')
  const [payeeOrPayer, setPayeeOrPayer] = useState('')
  const isPaid = false
  const repeatInterval = 1
  const [repeat, setRepeat] = useState(0)
  const [customRepeat, setCustomRepeat] = useState('')
  const [walletId, setWalletId] = useState('')
  const createdBy = user._id
  const [btnDisabled, setBtnDisabled] = useState(false)

  const { createAccount } = useAccounts()

  async function handleCreateNewAccount(event: FormEvent) {
    event.preventDefault()

    if (value < 0.01) {
      addToast({
        type: 'error',
        title: 'Erro',
        description: 'O valor da conta deve ser maior que R$ 0,01.',
      })
      setBtnDisabled(false)
      return
    }

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
    const repeatValue = customRepeat ? parseInt(customRepeat, 10) : repeat

    await createAccount({
      type,
      value,
      dueDate,
      issueDate,
      documentNumber,
      category: newCategory || category,
      documentType,
      description,
      payeeOrPayer,
      repeat: repeatValue,
      repeatInterval,
      createdBy,
      walletId,
      isPaid,
    })

    addToast({
      type: 'success',
      title: 'Conta criada com sucesso!',
      description: `A conta ${description} foi criada com sucesso.`,
    })

    onRequestClose()
    handleClear()
  }

  const handleClear = () => {
    setType(typeOfAccount)
    setValue(0)
    setDueDate(currentDate)
    setDocumentNumber('')
    setCategory('')
    setDocumentType('')
    setDescription('')
    setPayeeOrPayer('')
    setRepeat(0)
    setCustomRepeat('')
    setWalletId('')
    setBtnDisabled(false)
  }

  const handleRepeatChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const inputValue = event.target.value

    if (event.target.tagName === 'SELECT' && inputValue !== 'Outra') {
      setRepeat(Number(inputValue))
      setCustomRepeat('')
    } else if (event.target.tagName === 'INPUT') {
      if (/^\d*$/.test(inputValue)) {
        setCustomRepeat(inputValue)
        const numericValue = Number(inputValue)
        if (numericValue > 0) {
          setTimeout(() => {
            setRepeat(numericValue)
          }, 1000)
        }
      }
    } else {
      setCustomRepeat('')
      setRepeat(13)
    }
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

      <Container onSubmit={handleCreateNewAccount}>
        <h2>
          Nova Conta {typeOfAccount === 'receivable' ? 'a receber' : 'a pagar'}
        </h2>
        <input
          required
          placeholder="Descrição"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <div className="flex">
          <input
            required
            min={0.01}
            type="text"
            placeholder="Valor"
            value={
              value === 0
                ? ''
                : new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(value)
            }
            onChange={(event) => {
              const newValue = event.target.value
              setTimeout(() => {
                setValue(Number(newValue.replace(/\D/g, '')) / 100)
              }, 1)
            }}
          />
          <input
            alt="Data de Vencimento"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
        </div>
        <div className="flex">
          <input
            required
            type="text"
            placeholder="Número do Documento"
            value={documentNumber}
            onChange={(event) => setDocumentNumber(event.target.value)}
          />
          <select
            required
            placeholder="Tipo de Documento"
            value={documentType}
            onChange={(event) => setDocumentType(event.target.value)}
          >
            <option value="" disabled>
              Selecione o tipo de documento
            </option>
            <option value="boleto">Boleto</option>
            <option value="pix">Pix</option>
          </select>
        </div>
        <div className="flex">
          <select
            className="category"
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
          <select
            required
            placeholder="Selecione a carteira"
            value={walletId}
            onChange={(event) => setWalletId(event.target.value)}
          >
            <option value="" disabled>
              Selecione uma carteira
            </option>
            {wallets.map((wallet) => (
              <option key={wallet._id} value={wallet._id}>
                {wallet.name}
              </option>
            ))}
          </select>
        </div>
        {category === 'newCategory' && (
          <input
            required
            placeholder="Nova Categoria"
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
          />
        )}
        <input
          required
          type="text"
          placeholder={
            typeOfAccount === 'receivable' ? 'Pagador' : 'Beneficiário'
          }
          value={payeeOrPayer}
          onChange={(event) => setPayeeOrPayer(event.target.value)}
        />
        <div className="flex">
          <h5>Essa conta irá se repetir?</h5>
          <input
            className="checkbox"
            type="checkbox"
            onChange={(event) => {
              setRepeat(event.target.checked ? 1 : 0)
              setCustomRepeat('')
            }}
          />
        </div>
        {repeat > 0 && (
          <select
            value={repeat > 0 && repeat <= 12 ? repeat : 'Outra'}
            onChange={handleRepeatChange}
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} parcela(s)
              </option>
            ))}
            <option value="Outra">
              {customRepeat === '' ? 'Outra' : `${customRepeat} parcela(s)`}
            </option>
          </select>
        )}
        {repeat === 13 && (
          <input
            type="number"
            min={1}
            value={customRepeat}
            onChange={handleRepeatChange}
            placeholder="Digite a quantidade de parcelas"
          />
        )}
        <button disabled={btnDisabled} type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  )
}
