import { useEffect, useState } from 'react'
import {
  Container,
  Search,
  SearchInput,
  SearchButton,
  AddContent,
  AddButton,
  PayablesTable,
  ContentModalDelete,
  ContentModalPaid,
  Spinner,
  CardContainer,
  Card,
  CardHeader,
  CardContent,
  Actions,
  EditButton,
  DeleteButton,
  ReceiveButton,
} from './styles'
import Modal from 'react-modal'
import {
  FiSearch,
  FiEdit,
  FiTrash2,
  FiCheckSquare,
  FiSquare,
} from 'react-icons/fi'
import { FaCheckCircle } from 'react-icons/fa'

import { NewAccountModal } from '../../components/NewAccountModal'
import { EditAccountModal } from '../../components/EditAccountsModal'
import deleteImg from '../../assets/delete-icon.svg'
import moneyImg from '../../assets/money.svg'
import underpayImg from '../../assets/underpay.svg'

import { useAccounts } from '../../hooks/useAccounts'
import { useWallets } from '../../hooks/useWallets'
import { useToast } from '../../hooks/useToast'

interface Payable {
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

export default function Payables() {
  const { addToast } = useToast()
  const { wallets } = useWallets()
  const {
    payables,
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
  const [selectedAccount, setSelectedAccount] = useState({} as Payable)
  const [page, setPage] = useState(1)

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  const filteredAccounts = payables.filter(
    (payable) =>
      payable.description
        ?.toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      payable.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payable.payeeOrPayer?.toLowerCase().includes(searchTerm.toLowerCase()),
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
    if (!walletId)
      return addToast({
        type: 'error',
        title: 'Erro ao pagar conta',
        description: 'Selecione uma carteira e uma data de pagamento',
      })

    try {
      await PayAccount(id, walletId, payday)
      addToast({
        type: 'success',
        title: 'Conta paga com sucesso',
        description: 'A conta foi marcada como paga',
      })
      getAccounts()
      setIsOpenCheck(false)
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao pagar conta',
        description: 'Ocorreu um erro ao tentar pagar a conta',
      })
      setIsOpenCheck(false)
    }
  }

  const handleUnderPayAccount = async (id: string) => {
    try {
      await UnpayAccount(id)
      addToast({
        type: 'success',
        title: 'Pagamento desfeito',
        description: 'O pagamento da conta foi desfeito',
      })
      getAccounts()
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao desfazer pagamento',
        description: 'Ocorreu um erro ao tentar desfazer o pagamento da conta',
      })
    }
  }

  function handleClear() {
    setWalletId('')
    setPayday(Date)
  }

  useEffect(() => {
    getAccounts()
  }, [getAccounts])

  return (
    <>
      <EditAccountModal
        typeOfAccount="payable"
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
          <h2>Desfazer pagamento</h2>
          <img src={underpayImg} alt="Desfazer pagamento" />
          <p>
            Tem certeza que deseja desfazer o pagamento da conta{' '}
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
          <h2>Pagar</h2>
          <img src={moneyImg} alt="Fazer pagamento" />
          <p>
            Tem certeza que deseja fazer o pagamento da conta{' '}
            <strong>{selectedAccount.description}</strong> ?
          </p>
          <div className="flex">
            <div className="block">
              <h5>Carteira de pagamento:</h5>
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
            <div className="block">
              <h5>Escolha a data de pagamento:</h5>
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
                handlePayAccount(
                  selectedAccount._id,
                  walletId,
                  new Date(payday),
                )
                handleClear()
              }}
            >
              Pagar
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
            Nova conta a pagar
          </AddButton>
        </AddContent>
        <PayablesTable>
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
                  <th>Beneficiário</th>
                  <th>Carteira</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAccounts.map((payable) => (
                  <tr key={payable._id}>
                    <td>{payable.documentNumber}</td>
                    <td className="nowp">{payable.description}</td>
                    <td>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(payable.value)}
                    </td>
                    <td>
                      {new Intl.DateTimeFormat('pt-BR', {
                        timeZone: 'UTC',
                      }).format(new Date(payable.dueDate))}
                    </td>
                    <td>{payable.payeeOrPayer}</td>
                    <td>
                      {wallets.map((wallet) =>
                        wallet._id === payable.walletId ? wallet.name : '',
                      )}
                    </td>
                    <td
                      className={
                        payable.status === 'Late'
                          ? 'late'
                          : payable.status === 'Paid'
                            ? 'paid'
                            : payable.status === 'Pending'
                              ? 'pending'
                              : ''
                      }
                    >
                      {payable.status === 'Late'
                        ? 'Conta atrasada'
                        : payable.status === 'Paid'
                          ? 'Conta paga'
                          : payable.status === 'Pending'
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
                            setSelectedAccount(payable)
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
                            setSelectedAccount(payable)
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
                            setSelectedAccount(payable)
                            if (payable.isPaid) {
                              setIsOpenUnderPay(true)
                            } else {
                              setIsOpenCheck(true)
                            }
                          }}
                        >
                          <div className="tooltip">
                            {payable.isPaid ? (
                              <FiCheckSquare size={20} />
                            ) : (
                              <FiSquare color="#181d29" size={20} />
                            )}
                            <span className="tooltiptext">
                              {payable.isPaid
                                ? 'Desfazer pagamento'
                                : 'Pagar conta'}
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
        </PayablesTable>
        <CardContainer>
          {loading ? (
            <Spinner />
          ) : (
            paginatedAccounts.map((payable) => (
              <Card key={payable._id}>
                <CardHeader>
                  {payable.isPaid && <FaCheckCircle color="var(--secondary)" />}
                  {payable.payeeOrPayer}
                </CardHeader>
                <CardContent>
                  <p>
                    Descrição: <strong>{payable.description}</strong>
                  </p>
                  <p>
                    Data de Vencimento:{' '}
                    <strong>
                      {new Date(payable.dueDate).toLocaleDateString()}
                    </strong>
                  </p>
                  <p>
                    Valor:{' '}
                    <strong>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(payable.value)}
                    </strong>
                  </p>
                  <Actions>
                    <ReceiveButton
                      onClick={() => {
                        if (payable.isPaid) {
                          setIsOpenUnderPay(true)
                        } else {
                          setSelectedAccount(payable)
                          setIsOpenCheck(true)
                        }
                      }}
                    >
                      {payable.isPaid ? 'Desfazer recebimento' : 'Pagar'}
                    </ReceiveButton>
                    <EditButton
                      onClick={() => {
                        setIsOpenEdit(true)
                        setSelectedAccount(payable)
                      }}
                    >
                      Editar
                    </EditButton>
                    <DeleteButton
                      onClick={() => handleDeleteAccount(payable._id)}
                    >
                      Excluir
                    </DeleteButton>
                  </Actions>
                </CardContent>
              </Card>
            ))
          )}
        </CardContainer>
        <NewAccountModal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          typeOfAccount="payable"
        />
      </Container>
    </>
  )
}
