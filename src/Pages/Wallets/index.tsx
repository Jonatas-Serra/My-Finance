import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import {
  Container,
  Header,
  AddContent,
  AddButton,
  WalletsContent,
  ContentModalDelete,
} from './styles'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import deleteImg from '../../assets/delete-icon.svg'

import { NewWalletsModal } from '../../components/NewWalletModal'
import { EditWalletModal } from '../../components/EditWalletModal'
import { TransferModal } from '../../components/TransferModal'

import { useWallets } from '../../hooks/useWallets'

interface Wallet {
  _id: string
  name: string
  createdBy: string
  createdAt: string
  balance: number
  initialBalance: number
  currency?: string
}

export default function Wallets() {
  const { wallets, handleDeleteWallet, getWallets } = useWallets()
  const [selectedWallet, setSelectedWallet] = useState({} as Wallet)
  const [isOpenNew, setIsOpenNew] = useState(false)
  const [isOpenDel, setIsOpenDel] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenTransfer, setIsOpenTransfer] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false)

  useEffect(() => {
    if (wallets.length < 2) {
      setBtnDisabled(true)
    } else {
      setBtnDisabled(false)
    }
  }, [wallets])

  useEffect(() => {
    getWallets()
  }, [getWallets])

  return (
    <>
      <TransferModal
        isOpen={isOpenTransfer}
        onRequestClose={() => setIsOpenTransfer(false)}
      />
      <NewWalletsModal
        isOpen={isOpenNew}
        onRequestClose={() => setIsOpenNew(false)}
      />
      <EditWalletModal
        isOpen={isOpenEdit}
        onRequestClose={() => setIsOpenEdit(false)}
        selectedWallet={selectedWallet}
      />
      <Modal
        isOpen={isOpenDel}
        onRequestClose={() => setIsOpenDel(false)}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <ContentModalDelete>
          <h2>Excluir carteira?</h2>
          <img src={deleteImg} alt="Excluir" />
          <p>
            Tem certeza que deseja excluir a carteira{' '}
            <strong>{selectedWallet.name}</strong>?
          </p>
          <p>
            <strong>Todas as transações serão perdidas</strong>
          </p>
          <div>
            <button onClick={() => setIsOpenDel(false)} className="cancel">
              Cancelar
            </button>
            <button
              onClick={() => {
                handleDeleteWallet(selectedWallet._id)
                setIsOpenDel(false)
              }}
              type="button"
            >
              Excluir
            </button>
          </div>
        </ContentModalDelete>
      </Modal>
      <Container>
        <Header>
          <h1>Carteiras</h1>
        </Header>
        <AddContent>
          <AddButton
            disabled={btnDisabled}
            onClick={() => setIsOpenTransfer(true)}
          >
            Transferencias entre carteiras
          </AddButton>
          <AddButton onClick={() => setIsOpenNew(true)}>
            Nova carteira
          </AddButton>
        </AddContent>
        <WalletsContent>
          {wallets.map((wallet) => (
            <div key={wallet._id} className="wallet">
              <h2>{wallet.name}</h2>
              <p>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(wallet.balance)}
              </p>
              <div className="actions">
                <a
                  type="button"
                  className="edit"
                  onClick={() => {
                    setSelectedWallet(wallet)
                    setIsOpenEdit(true)
                  }}
                >
                  <FiEdit size={20} />
                </a>
                <a
                  type="button"
                  className="delete"
                  onClick={() => {
                    setIsOpenDel(true)
                    setSelectedWallet(wallet)
                  }}
                >
                  <FiTrash2 size={20} />
                </a>
              </div>
            </div>
          ))}
        </WalletsContent>
      </Container>
    </>
  )
}
