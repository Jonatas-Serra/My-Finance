import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import Select from 'react-select'
import { DateFilter } from '../../components/DateFilter'
import {
  Container,
  Search,
  SearchInput,
  FilterContainer,
  FilterItem,
  FilterButton,
  AddContent,
  AddButton,
  ReceivablesTable,
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
  CardBanner,
} from './styles'

import { NewAccountModal } from '../../components/NewAccountModal'
import { EditAccountModal } from '../../components/EditAccountsModal'
import {
  FiEdit,
  FiTrash2,
  FiCheckSquare,
  FiSquare,
  FiFilter,
} from 'react-icons/fi'
import { FaCheckCircle } from 'react-icons/fa'
import deleteImg from '../../assets/delete-icon.svg'
import moneyImg from '../../assets/money.svg'
import underpayImg from '../../assets/underpay.svg'

import { useAccounts } from '../../hooks/useAccounts'
import { useWallets } from '../../hooks/useWallets'
import { useToast } from '../../hooks/useToast'

interface DateRange {
  startDate: string
  endDate: string
}

interface AppliedFilters {
  dateRange: DateRange
  status: string[]
}

interface Receivable {
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
  status: string
  repeat?: number
  createdBy: string
  repeatInterval: number
  walletId: string
  createdAt: string
}

const statusOptions = [
  { value: 'Paid', label: 'Recebido', color: '#08C6AB' },
  { value: 'Pending', label: 'A vencer', color: '#733cf8' },
  { value: 'Late', label: 'Atrasado', color: '#dc2020' },
]

const customStyles = {
  control: (base: any) => ({
    ...base,
    borderRadius: '5px',
    borderColor: 'var(--gray)',
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'var(--gray)',
    },
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? '#733cf8' : 'white',
    color: state.data.color,
    '&:hover': {
      backgroundColor: '#733cf8',
      color: 'white',
    },
  }),
  multiValue: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.data.color,
    color: 'white',
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: 'white',
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: 'white',
    '&:hover': {
      backgroundColor: '#733cf8',
      color: 'white',
    },
  }),
}

function getMonthDateRange() {
  const currentDate = new Date()

  const firstDayCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  )

  const lastDayNextMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 2,
    0,
  )

  const formatDateToISO = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const startDate = formatDateToISO(firstDayCurrentMonth)
  const endDate = formatDateToISO(lastDayNextMonth)

  return {
    startDate,
    endDate,
  }
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
  const [selectedAccount, setSelectedAccount] = useState({} as Receivable)
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<DateRange>(getMonthDateRange())
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({
    dateRange: getMonthDateRange(),
    status: [],
  })

  const handleFilter = () => {
    setAppliedFilters({
      dateRange,
      status,
    })
    getAccounts(appliedFilters)
  }

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
    if (!walletId) {
      addToast({
        type: 'error',
        title: 'Selecione uma carteira',
        description:
          'Você precisa selecionar uma carteira para receber a conta',
      })
      return
    }

    try {
      PayAccount(id, walletId, payday)
      addToast({
        type: 'success',
        title: 'Conta recebida com sucesso',
        description: 'A conta foi marcada como recebida',
      })
      setIsOpenCheck(false)
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao receber conta',
        description: 'Ocorreu um erro ao tentar receber a conta',
      })
      setIsOpenCheck(false)
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
      getAccounts({
        dateRange: getMonthDateRange(),
        status: [],
      })
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
    getAccounts(appliedFilters)
  }, [getAccounts, appliedFilters])

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
          <SearchInput
            type="text"
            placeholder="Buscar conta"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </Search>
        <FilterContainer>
          <div className="flexum">
            <h4>Filtros</h4>
          </div>
          <FilterItem>
            <DateFilter
              onDateChange={setDateRange}
              initialRange={{
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                key: 'selection',
              }}
            />
          </FilterItem>
          <div className="flexdois">
            <FilterItem>
              <Select
                isMulti
                options={statusOptions}
                value={statusOptions.filter((option) =>
                  status.includes(option.value),
                )}
                onChange={(selectedOption) => {
                  const selectStatus = selectedOption
                    ? selectedOption.map((option) => option.value)
                    : []
                  setStatus(selectStatus)
                }}
                classNamePrefix="select"
                styles={customStyles}
              />
            </FilterItem>
            <FilterButton onClick={handleFilter}>
              <FiFilter size={20} />
            </FilterButton>
          </div>
        </FilterContainer>
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
        <CardContainer>
          {loading ? (
            <Spinner />
          ) : (
            paginatedAccounts.map((receivable) => (
              <Card key={receivable._id}>
                <CardBanner status={receivable.status} />
                <CardHeader>
                  {receivable.isPaid && (
                    <FaCheckCircle color="var(--secondary)" />
                  )}
                  {receivable.payeeOrPayer}
                </CardHeader>
                <CardContent>
                  <p>
                    Descrição: <strong>{receivable.description}</strong>
                  </p>
                  <p>
                    Status:{' '}
                    <strong
                      className={
                        receivable.status === 'Late'
                          ? 'late'
                          : receivable.status === 'Paid'
                            ? 'paid'
                            : receivable.status === 'Pending'
                              ? 'pending'
                              : ''
                      }
                    >{`${
                      receivable.status === 'Late'
                        ? 'Conta atrasada'
                        : receivable.status === 'Paid'
                          ? 'Conta recebida'
                          : receivable.status === 'Pending'
                            ? 'A vencer'
                            : 'Desconhecido'
                    }`}</strong>
                  </p>
                  <p>
                    Data de Vencimento:{' '}
                    <strong>
                      {new Intl.DateTimeFormat('pt-BR', {
                        timeZone: 'UTC',
                      }).format(new Date(receivable.dueDate))}
                    </strong>
                  </p>
                  <p>
                    Valor:{' '}
                    <strong>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(receivable.value)}
                    </strong>
                  </p>
                  <Actions>
                    <ReceiveButton
                      onClick={() => {
                        if (receivable.isPaid) {
                          handleUnderPayAccount(receivable._id)
                        } else {
                          setSelectedAccount(receivable)
                          setIsOpenCheck(true)
                        }
                      }}
                    >
                      {receivable.isPaid ? 'Desfazer recebimento' : 'Receber'}
                    </ReceiveButton>
                    <EditButton
                      onClick={() => {
                        setIsOpenEdit(true)
                        setSelectedAccount(receivable)
                      }}
                    >
                      Editar
                    </EditButton>
                    <DeleteButton
                      onClick={() => handleDeleteAccount(receivable._id)}
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
          typeOfAccount="receivable"
        />
      </Container>
    </>
  )
}
