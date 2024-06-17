import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import Select from 'react-select'
import { DateFilter } from '../../components/DateFilter'
import {
  Container,
  Search,
  SearchInput,
  AddContent,
  AddButton,
  TransactionsTable,
  ContentModalDelete,
  Spinner,
  Actions,
  PayButton,
  DeleteButton,
  CardContainer,
  Card,
  CardHeader,
  CardContent,
  CardBanner,
  FilterContainer,
  FilterItem,
  FilterButton,
} from './styles'
import { FiEdit, FiTrash2, FiFilter } from 'react-icons/fi'
import deleteImg from '../../assets/delete-icon.svg'

import { NewTransitionModal } from '../../components/NewTransitionsModal'
import { EditTransitionModal } from '../../components/EditTransactionModal'

import { useTransactions } from '../../hooks/useTransactions'
import { useWallets } from '../../hooks/useWallets'

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

interface DateRange {
  startDate: Date
  endDate: Date
}

interface AppliedFilters {
  dateRange: DateRange
  transactionType: string[]
}

const getCurrentMonthDateRange = (): DateRange => {
  const now = new Date()
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  return { startDate: firstDay, endDate: lastDay }
}

const transactionTypeOptions = [
  { value: 'Deposit', label: 'Entrada', color: '#08C6AB' },
  { value: 'Withdrawal', label: 'Saída', color: '#dc2020' },
  { value: 'Transfer', label: 'Transferência', color: '#733cf8' },
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

const adjustEndDate = (date: Date) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
  )
}

export default function Transactions() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDel, setIsOpenDel] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange>(
    getCurrentMonthDateRange(),
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [transactionType, setTransactionType] = useState<string[]>([])
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({
    dateRange: getCurrentMonthDateRange(),
    transactionType: [],
  })
  const { transactions, loading, handleDeleteTransaction, getTransactions } =
    useTransactions()
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>(
    {} as Transaction,
  )
  const { wallets } = useWallets()
  const [page, setPage] = useState(1)

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  const handleFilter = () => {
    setAppliedFilters({ dateRange, transactionType })
  }

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.walletId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transactionType.length === 0 ||
      transactionType.includes(transaction.type),
  )

  const sortedTransactions = filteredTransactions.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const paginatedTransactions = sortedTransactions.slice(0, page * 15)

  const handleScroll = (event: React.UIEvent<HTMLTableElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget
    if (scrollHeight - scrollTop === clientHeight) {
      loadMore()
    }
  }

  useEffect(() => {
    getTransactions({
      ...appliedFilters,
      dateRange: {
        ...appliedFilters.dateRange,
        endDate: adjustEndDate(appliedFilters.dateRange.endDate),
      },
    })
  }, [getTransactions, appliedFilters])

  return (
    <>
      <EditTransitionModal
        isOpen={isOpenEdit}
        onRequestClose={() => setIsOpenEdit(false)}
        selectedTransaction={selectedTransaction}
      />
      <Modal
        isOpen={isOpenDel}
        onRequestClose={() => setIsOpenDel(false)}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <ContentModalDelete>
          <h2>Excluir Lançamento?</h2>
          <img src={deleteImg} alt="lixeira" />
          <p>
            Tem certeza que deseja excluir
            <strong> {selectedTransaction.description}</strong> ?
          </p>
          <div>
            <button
              type="button"
              onClick={() => setIsOpenDel(false)}
              className="cancel"
            >
              Não
            </button>
            <button
              type="button"
              onClick={() => {
                handleDeleteTransaction(selectedTransaction._id)
                setIsOpenDel(false)
              }}
            >
              Sim
            </button>
          </div>
        </ContentModalDelete>
      </Modal>
      <Container onScroll={handleScroll}>
        <Search>
          <div className="flex">
            <SearchInput
              type="text"
              placeholder="Buscar transação"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </Search>
        <FilterContainer>
          <div className="flex">
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
          <FilterItem>
            <Select
              isMulti
              options={transactionTypeOptions}
              value={transactionTypeOptions.filter((option) =>
                transactionType.includes(option.value),
              )}
              onChange={(selectedOptions) =>
                setTransactionType(
                  selectedOptions
                    ? selectedOptions.map((option) => option.value)
                    : [],
                )
              }
              placeholder="Selecione o tipo"
              classNamePrefix="select"
              styles={customStyles}
            />
          </FilterItem>
          <FilterButton onClick={handleFilter}>
            <FiFilter size={20} />
          </FilterButton>
        </FilterContainer>

        <AddContent>
          <AddButton onClick={() => setIsOpen(true)}>Novo Lançamento</AddButton>
        </AddContent>
        <TransactionsTable>
          {loading ? (
            <Spinner />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Valor</th>
                  <th>Data</th>
                  <th>Tipo</th>
                  <th>Categoria</th>
                  <th>Carteira</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td>{transaction.description}</td>
                    <td>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(transaction.amount)}
                    </td>
                    <td>
                      {new Intl.DateTimeFormat('pt-BR', {
                        timeZone: 'UTC',
                      }).format(new Date(transaction.date))}
                    </td>
                    <td
                      className={
                        transaction.type === 'Deposit'
                          ? 'deposit'
                          : transaction.type === 'Withdrawal'
                            ? 'withdraw'
                            : transaction.type === 'Transfer'
                              ? 'transfer'
                              : ''
                      }
                    >
                      {transaction.type === 'Deposit'
                        ? 'Entrada'
                        : transaction.type === 'Withdrawal'
                          ? 'Saída'
                          : transaction.type === 'Transfer'
                            ? 'Transf. entre carteiras'
                            : 'Desconhecido'}
                    </td>
                    <td>{transaction.category}</td>
                    <td>
                      {
                        wallets.find(
                          (wallet) => wallet._id === transaction.walletId,
                        )?.name
                      }
                    </td>
                    <td>
                      <a
                        className={`edit ${transaction.type === 'Transfer' ? 'disabled' : ''}`}
                        type="button"
                        onClick={() => {
                          if (transaction.type !== 'Transfer') {
                            setIsOpenEdit(true)
                            setSelectedTransaction(transaction)
                          }
                        }}
                      >
                        <FiEdit size={20} />
                      </a>
                      <a
                        className="delete"
                        type="button"
                        onClick={() => {
                          setIsOpenDel(true)
                          setSelectedTransaction(transaction)
                        }}
                      >
                        <FiTrash2 size={20} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </TransactionsTable>
        <CardContainer>
          {transactions.map((transaction) => (
            <Card key={transaction._id}>
              <CardBanner type={transaction.type} />
              <CardHeader>{transaction.description}</CardHeader>
              <CardContent>
                <p>
                  Descrição: <strong>{transaction.description}</strong>
                </p>
                <p>
                  Data:{' '}
                  <strong>
                    {new Date(transaction.date).toLocaleDateString()}
                  </strong>
                </p>
                <p>
                  Valor:{' '}
                  <strong
                    className={
                      transaction.type === 'Deposit'
                        ? 'deposit'
                        : transaction.type === 'Withdrawal'
                          ? 'withdraw'
                          : transaction.type === 'Transfer'
                            ? 'transfer'
                            : ''
                    }
                  >
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(transaction.amount)}
                  </strong>
                </p>
                <p>
                  Tipo:{' '}
                  <strong
                    className={
                      transaction.type === 'Deposit'
                        ? 'deposit'
                        : transaction.type === 'Withdrawal'
                          ? 'withdraw'
                          : transaction.type === 'Transfer'
                            ? 'transfer'
                            : ''
                    }
                  >
                    {transaction.type === 'Deposit'
                      ? 'Entrada'
                      : transaction.type === 'Withdrawal'
                        ? 'Saída'
                        : 'Transferência'}
                  </strong>
                </p>
                <p>
                  Categoria: <strong>{transaction.category}</strong>
                </p>
                <p>
                  Carteira:{' '}
                  <strong>
                    {
                      wallets.find(
                        (wallet) => wallet._id === transaction.walletId,
                      )?.name
                    }
                  </strong>
                </p>
                <Actions>
                  <PayButton
                    className={`edit ${transaction.type === 'Transfer' ? 'disabled' : ''}`}
                    type="button"
                    onClick={() => {
                      if (transaction.type !== 'Transfer') {
                        setIsOpenEdit(true)
                        setSelectedTransaction(transaction)
                      }
                    }}
                  >
                    Editar
                  </PayButton>
                  <DeleteButton
                    type="button"
                    onClick={() => {
                      setIsOpenDel(true)
                      setSelectedTransaction(transaction)
                    }}
                  >
                    Excluir
                  </DeleteButton>
                </Actions>
              </CardContent>
            </Card>
          ))}
        </CardContainer>
        <NewTransitionModal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
        />
      </Container>
    </>
  )
}
