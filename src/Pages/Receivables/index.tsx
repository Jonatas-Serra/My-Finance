import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import {
  Container,
  Search,
  SearchInput,
  SearchButton,
  AddContent,
  AddButton,
  ReceivablesTable,
  ContentModalDelete,
  ContentModalPaid,
  Spinner,
} from './styles'

import { NewAccountModal } from '../../components/NewAccountModal'
import { EditAccountModal } from '../../components/EditAccountsModal'
import {
  FiSearch,
  FiEdit,
  FiTrash2,
  FiCheckSquare,
  FiSquare,
} from 'react-icons/fi'
import deleteImg from '../../assets/delete-icon.svg'
import moneyImg from '../../assets/money.svg'
import underpayImg from '../../assets/underpay.svg'

import { useAccounts } from '../../hooks/useAccounts'
import { useWallets } from '../../hooks/useWallets'
import { useToast } from '../../hooks/useToast'

interface Reaceable {
  _id: string
  type: string
  value: number
  dueDate: string
  issueDate: string
  documentNumber: string
  category: string
  isPaid: boolean
  documentType: string
  description: string
  payeeOrPayer: string
  status?: string
  repeat?: number
  createdBy: string
  repeatInterval: number
  walletId: string
  createdAt: string
}

export default function Receivables() {
  const { addToast } = useToast()
  const { wallets } = useWallets()
  const {
    receivables,
    loading,
    handleDeleteAccount,
    getAccounts,
    PayAccount,
    UnpayAccount,
  } = useAccounts()

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDel, setIsOpenDel] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenCheck, setIsOpenCheck] = useState(false)
  const [isOpenUnderPay, setIsOpenUnderPay] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [walletId, setWalletId] = useState('')
  const [payday, setPayday] = useState(Date)
  const [selectedAccount, setSelectedAccount] = useState({} as Reaceable)
  const [page, setPage] = useState(1)

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  const filteredAccounts = receivables.filter(
    (receivable) =>
      receivable.description
        ?.toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      receivable.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receivable.payeeOrPayer?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedAccounts = filteredAccounts.sort((a, b) => {
    const dateA = new Date(a.dueDate)
    const dateB = new Date(b.dueDate)
    return dateA.getTime() - dateB.getTime()
  })

  const paginatedAccounts = sortedAccounts.slice(0, page * 15)

  const handleScroll = (event: React.UIEvent<HTMLTableElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget
    if (scrollHeight - scrollTop === clientHeight) {
      loadMore()
    }
  }

  const handlePayAccount = async (
    id: string,
    walletId: string,
    payday: Date,
  ) => {
    try {
      await PayAccount(id, walletId, payday)
      addToast({
        type: 'success',
        title: 'Conta recebida com sucesso',
        description: 'A conta foi marcada como recebida',
      })
      getAccounts()
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao receber conta',
        description: 'Ocorreu um erro ao tentar receber a conta',
      })
    }
  }

  const handleUnderPayAccount = async (id: string) => {
    try {
      await UnpayAccount(id)
      addToast({
        type: 'success',
        title: 'Recebimento desfeito',
        description: 'O recebimento da conta foi desfeito',
      })
      getAccounts()
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao desfazer recebimento',
        description:
          'Ocorreu um erro ao tentar desfazer o recebimento da conta',
      })
    }
  }

  useEffect(() => {
    getAccounts()
  }, [getAccounts])

  return (
    <>
      <EditAccountModal
        typeOfAccount="receivable"
        isOpen={isOpenEdit}
        onRequestClose={() => setIsOpenEdit(false)}
        selectedAccount={selectedAccount}
      />
      <Modal
        isOpen={isOpenUnderPay}
        onRequestClose={() => setIsOpenUnderPay(false)}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <ContentModalPaid>
          <h2>Desfazer recebimento</h2>
          <img src={underpayImg} alt="Desfazer recebimento" />
          <p>
            Tem certeza que deseja desfazer o recebimento da conta{' '}
            <strong>{selectedAccount.description}</strong> ?
          </p>
          <div>
            <button
              onClick={() => {
                setIsOpenUnderPay(false)
              }}
              className="cancel"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                handleUnderPayAccount(selectedAccount._id)
                setIsOpenUnderPay(false)
              }}
            >
              Desfazer
            </button>
          </div>
        </ContentModalPaid>
      </Modal>
      <Modal
        isOpen={isOpenCheck}
        onRequestClose={() => setIsOpenCheck(false)}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <ContentModalPaid>
          <h2>Receber</h2>
          <img src={moneyImg} alt="Marcar como pago" />
          <p>
            Tem certeza que deseja receber a conta{' '}
            <strong>{selectedAccount.description}</strong> ?
          </p>
          <div className="flex">
            <div className="block">
              <h5>Carteira de recebimento:</h5>
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
            <div className="block">
              <h5>Escolha a data de recebimento:</h5>
              <input
                type="date"
                value={payday.toString()}
                onChange={(event) => setPayday(event.target.value)}
                placeholder="Data de Pagamento"
              />
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                setIsOpenCheck(false)
              }}
              className="cancel"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                setIsOpenCheck(false)
                handlePayAccount(
                  selectedAccount._id,
                  walletId,
                  new Date(payday),
                )
              }}
            >
              Receber
            </button>
          </div>
        </ContentModalPaid>
      </Modal>
      <Modal
        isOpen={isOpenDel}
        onRequestClose={() => setIsOpenDel(false)}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <ContentModalDelete>
          <h2>Excluir conta</h2>
          <img src={deleteImg} alt="Excluir conta" />
          <p>
            Tem certeza que deseja excluir a conta{' '}
            <strong>{selectedAccount.description}</strong>?
          </p>
          <div>
            <button
              onClick={() => {
                setIsOpenDel(false)
              }}
              className="cancel"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                handleDeleteAccount(selectedAccount._id)
                setIsOpenDel(false)
              }}
            >
              Excluir
            </button>
          </div>
        </ContentModalDelete>
      </Modal>
      <Container onScroll={handleScroll}>
        <Search>
          <div className="flex">
            <SearchInput
              type="text"
              placeholder="Buscar conta"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <SearchButton>
              <FiSearch size={20} />
            </SearchButton>
          </div>
        </Search>
        <AddContent>
          <AddButton onClick={() => setIsOpen(true)}>
            Nova conta a receber
          </AddButton>
        </AddContent>
        <ReceivablesTable>
          {loading ? (
            <Spinner />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Nº doc.</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Vencimento</th>
                  <th>Pagador</th>
                  <th>Carteira</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAccounts.map((receivable) => (
                  <tr key={receivable._id}>
                    <td>{receivable.documentNumber}</td>
                    <td className="nowp">{receivable.description}</td>
                    <td>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(receivable.value)}
                    </td>
                    <td>
                      {new Intl.DateTimeFormat('pt-BR', {
                        timeZone: 'UTC',
                      }).format(new Date(receivable.dueDate))}
                    </td>
                    <td>{receivable.payeeOrPayer}</td>
                    <td>
                      {wallets.map((wallet) =>
                        wallet._id === receivable.walletId ? wallet.name : '',
                      )}
                    </td>
                    <td
                      className={
                        receivable.status === 'Late'
                          ? 'late'
                          : receivable.status === 'Paid'
                            ? 'paid'
                            : receivable.status === 'Pending'
                              ? 'pending'
                              : ''
                      }
                    >
                      {receivable.status === 'Late'
                        ? 'Conta atrasada'
                        : receivable.status === 'Paid'
                          ? 'Conta recebida'
                          : receivable.status === 'Pending'
                            ? 'A vencer'
                            : 'Desconhecido'}
                    </td>
                    <td>
                      <div className="actions">
                        <a
                          className="edit"
                          type="button"
                          onClick={() => {
                            setIsOpenEdit(true)
                            setSelectedAccount(receivable)
                          }}
                        >
                          <div className="tooltip">
                            <FiEdit size={20} />
                            <span className="tooltiptext">Editar</span>
                          </div>
                        </a>
                        <a
                          className="delete"
                          type="button"
                          onClick={() => {
                            setIsOpenDel(true)
                            setSelectedAccount(receivable)
                          }}
                        >
                          <div className="tooltip">
                            <FiTrash2 size={20} />
                            <span className="tooltiptext">Excluir</span>
                          </div>
                        </a>
                        <a
                          className="check"
                          type="button"
                          onClick={() => {
                            setSelectedAccount(receivable)
                            if (receivable.isPaid) {
                              setIsOpenUnderPay(true)
                            } else {
                              setIsOpenCheck(true)
                            }
                          }}
                        >
                          <div className="tooltip">
                            {receivable.isPaid ? (
                              <FiCheckSquare size={20} />
                            ) : (
                              <FiSquare color="#181d29" size={20} />
                            )}
                            <span className="tooltiptext">
                              {receivable.isPaid
                                ? 'Desfazer recebimento'
                                : 'Receber conta'}
                            </span>
                          </div>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </ReceivablesTable>
        <NewAccountModal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          typeOfAccount="receivable"
        />
      </Container>
    </>
  )
}
