import { FormEvent, useState } from 'react'
import Modal from 'react-modal'
import { useWallets } from '../../hooks/useWallets'
import { useUser } from '../../hooks/User'
import { useToast } from '../../hooks/Toast'

import { Container } from './styles'

import closeImg from '../../assets/close.svg'

interface NewWalletsModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

export function NewWalletsModal({
  isOpen,
  onRequestClose,
}: NewWalletsModalProps) {
  const { createWallet } = useWallets()
  const { user } = useUser()
  const { addToast } = useToast()

  const [name, setName] = useState('')
  const [initialBalance, setInitialBalance] = useState(0)
  const createdBy = user._id
  const [btnDisabled, setBtnDisabled] = useState(false)

  async function handleCreateNewWallet(event: FormEvent) {
    event.preventDefault()
    setBtnDisabled(true)

    await createWallet({
      name,
      initialBalance,
      createdBy,
    })

    onRequestClose()
    handleClear()

    addToast({
      type: 'success',
      title: 'Carteira criada com sucesso!',
      description: `A carteira ${name} foi criada com sucesso.`,
    })
  }

  const handleClear = () => {
    setName('')
    setInitialBalance(0)
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

      <Container onSubmit={handleCreateNewWallet}>
        <h2>Criar nova carteira</h2>

        <input
          required
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input type="hidden" value={createdBy} />

        <input
          type="text"
          placeholder="Saldo inicial"
          value={
            initialBalance === -1
              ? ''
              : new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(initialBalance)
          }
          onChange={(event) => {
            const newValue = event.target.value
            setTimeout(() => {
              setInitialBalance(Number(newValue.replace(/\D/g, '')) / 100)
            }, 1)
          }}
        />

        <button type="submit" disabled={btnDisabled}>
          Criar
        </button>
      </Container>
    </Modal>
  )
}
