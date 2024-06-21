import { FormEvent, useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useWallets } from '../../hooks/useWallets'
import { useUser } from '../../hooks/useUser'
import { useAccounts } from '../../hooks/useAccounts'
import { useToast } from '../../hooks/useToast'

import { Container } from './styles'

import closeImg from '../../assets/close.svg'

interface Account {
  _id: string
  type: string
  value: number
  description: string
  documentType: string
  dueDate: string
  documentNumber: string
  category: string
  payeeOrPayer: string
  walletId: string
}

interface EditAccountsModalProps {
  typeOfAccount: string
  isOpen: boolean
  onRequestClose: () => void
  selectedAccount: Account
}

export function EditAccountModal({
  typeOfAccount,
  isOpen,
  onRequestClose,
  selectedAccount,
}: EditAccountsModalProps) {
  const { user, handleUpdateUser } = useUser()
  const { wallets } = useWallets()
  const { addToast } = useToast()
  const { EditAccount } = useAccounts()

  const currentDate = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]
  const [type, setType] = useState(selectedAccount?.type || '')
  const [value, setValue] = useState(selectedAccount?.value || 0)
  const [description, setDescription] = useState(
    selectedAccount?.description || '',
  )
  const [documentType, setDocumentType] = useState(
    selectedAccount?.documentType || '',
  )
  const [dueDate, setDueDate] = useState(selectedAccount?.dueDate || '')
  const [documentNumber, setDocumentNumber] = useState(
    selectedAccount?.documentNumber || '',
  )
  const [category, setCategory] = useState(selectedAccount?.category || '')
  const [newCategory, setNewCategory] = useState('')
  const [payeeOrPayer, setPayeeOrPayer] = useState(
    selectedAccount?.payeeOrPayer || '',
  )
  const [walletId, setWalletId] = useState(selectedAccount?.walletId || '')
  const [btnDisabled, setBtnDisabled] = useState(false)

  useEffect(() => {
    if (selectedAccount) {
      setType(selectedAccount.type)
      setValue(selectedAccount.value)
      setDescription(selectedAccount.description)
      setDocumentType(selectedAccount.documentType)
      setDueDate(selectedAccount.dueDate)
      setDocumentNumber(selectedAccount.documentNumber)
      setCategory(selectedAccount.category)
      setPayeeOrPayer(selectedAccount.payeeOrPayer)
      setWalletId(selectedAccount.walletId)
    }
  }, [selectedAccount])

  async function handleEditAccount(event: FormEvent) {
    event.preventDefault()
    setBtnDisabled(true)

    if (newCategory) {
      const updatedUser = {
        ...user,
        categories: [...user.categories, newCategory],
      }
      await handleUpdateUser(updatedUser)
      setCategory(newCategory)
      setNewCategory('')
    }

    EditAccount({
      _id: selectedAccount._id,
      type,
      value,
      description,
      documentType,
      dueDate,
      documentNumber,
      category: newCategory || category,
      payeeOrPayer,
      walletId,
      issueDate: '',
      isPaid: false,
      createdBy: '',
      repeatInterval: 0,
      createdAt: '',
    })

    addToast({
      type: 'success',
      title: 'Conta editada com sucesso!',
      description: 'A conta foi editada com sucesso.',
    })
    handleClear()
    onRequestClose()
    setBtnDisabled(false)
  }

  if (!selectedAccount || !user || !wallets) {
    return null
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
        onClick={() => {
          onRequestClose()
          setBtnDisabled(false)
        }}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleEditAccount}>
        <h2>
          Editar conta{' '}
          {typeOfAccount === 'receivable' ? 'a receber' : 'a pagar'}
        </h2>
        <input
          placeholder="Descrição"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <div className="flex">
          <input
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
            type="date"
            placeholder="Data de Vencimento"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Número do Documento"
            value={documentNumber}
            onChange={(event) => setDocumentNumber(event.target.value)}
          />
          <select
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
          type="text"
          placeholder={
            typeOfAccount === 'receivable' ? 'Pagador' : 'Beneficiário'
          }
          value={payeeOrPayer}
          onChange={(event) => setPayeeOrPayer(event.target.value)}
        />
        <div className="actions">
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
