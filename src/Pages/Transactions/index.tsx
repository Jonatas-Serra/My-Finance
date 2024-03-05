import { useState } from 'react';
import Modal from "react-modal";
import { 
  Container, 
  Header, 
  Search, 
  SearchInput, 
  SearchButton,
  AddContent,
  AddButton,
  TransactionsTable,
  ContentModalDelete,
  Spinner
} from './styles';
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import deleteImg from '../../assets/delete-icon.svg';

import { NewTransitionModal } from '../../components/NewTransitionsModal';
import { EditTransitionModal } from '../../components/EditTransactionModal';

import { useTransactions } from '../../hooks/useTransactions';
import { useWallets } from '../../hooks/useWallets';

interface Transaction {
  _id: string;
  description: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
  createdBy: string;
  walletId: string;
  date: string;
}

export default function Transactions() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDel, setIsOpenDel] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { transactions, loading, handleDeleteTransaction } = useTransactions();
  const [selectedTransaction, setSelectedTransaction] = useState({} as Transaction);
  const { wallets } = useWallets();
  const [page, setPage] = useState(1);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.walletId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTransactions = filteredTransactions.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const paginatedTransactions = sortedTransactions.slice(0, page * 15);

  const handleScroll = (event: React.UIEvent<HTMLTableElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      loadMore();
    }
  }


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
          <h2>Excluir Transação?</h2>
          <img src={deleteImg} alt="lixeira" />
          <p>Tem certeza que deseja excluir
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
            >Sim</button>
          </div>
        </ContentModalDelete>
      </Modal>
      <Container onScroll={handleScroll}>
        <Header>
          <h1>Transações</h1>
        </Header>
        <Search>
          <div className='flex'>
            <SearchInput 
              type="text" 
              placeholder='Buscar transação' 
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <SearchButton>
              <FiSearch size={20} />
            </SearchButton>
          </div>
        </Search>
        <AddContent>
          <AddButton
            onClick={() => setIsOpen(true)}
          >Nova transação</AddButton>
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
                {paginatedTransactions.map(transaction => (
                  <tr key={transaction._id}>
                    <td>{transaction.description}</td>
                    <td>{new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(transaction.amount)}</td>
                    <td>{new Intl.DateTimeFormat('pt-BR',{
                      timeZone: 'UTC'
                    }).format(
                      new Date(transaction.date)
                    )}</td>
                    <td className={transaction.type === 'Deposit' ? 'deposit' : 'withdraw'}>{
                      transaction.type === 'Deposit' ? 'Entrada' :
                      transaction.type === 'Withdrawal' ? 'Saída' :
                      transaction.type === 'Transfer' ? 'Transf. entre carteiras' :
                      'Desconhecido'
                    }</td>
                    <td>{transaction.category}</td>
                    <td>
                      {
                        wallets.map(wallet => {
                          if (wallet._id === transaction.walletId) {
                            return wallet.name
                          }
                        })
                      }
                    </td>
                    <td>
                    <a
                      className={`edit ${transaction.type === 'Transfer' ? 'disabled' : ''}`}
                      type="button"
                      onClick={() => {
                        if (transaction.type !== 'Transfer') {
                          setIsOpenEdit(true);
                          setSelectedTransaction(transaction);
                        }
                      }}
                      >
                        <FiEdit size={20} />
                      </a>
                      <a
                        className='delete'
                        type="button"
                        onClick={() => {
                          setIsOpenDel(true);
                          setSelectedTransaction(transaction);
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
        <NewTransitionModal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
        />
      </Container>
    </>
  )
}
