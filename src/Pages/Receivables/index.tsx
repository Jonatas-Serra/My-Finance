import { useState } from 'react';

import { 
  Container, 
  Header, 
  Search, 
  SearchInput, 
  SearchButton,
  AddContent,
  AddButton,
  ReceivablesTable,
 } from './styles';

 import { FiSearch, FiEdit, FiTrash2, FiCheckSquare, FiSquare  } from "react-icons/fi";

 import { useAccounts } from '../../hooks/useAccounts';

 interface Reaceable {
  _id: string;
  type: string;
  description: string;
  value: number;
  dueDate: string;
  issueDate: string;
  documentNumber: string;
  category: string;
  payeeOrPayer: string;
  repeat: number;
  isPaid: boolean;
  createdBy: string;
 }

export default function Receables() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDel, setIsOpenDel] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { receivables } = useAccounts()
  const [selectedAccount, setSelectedAccount] = useState({} as Reaceable) 
  const [page, setPage] = useState(1);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };  

  const filteredAccounts = receivables.filter(receivable => receivable.description?.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
  receivable.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  receivable.payeeOrPayer?.toLowerCase().includes(searchTerm.toLowerCase())
);

const sortedAccounts = filteredAccounts.sort((a, b) => {
  return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
});

const paginatedAccounts = sortedAccounts.slice(0, page * 15);

const handleScroll = (event: React.UIEvent<HTMLTableElement>) => {
  const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
  if (scrollHeight - scrollTop === clientHeight) {
    loadMore();
  }
}



  return (
    <Container onScroll={handleScroll}>
      <Header>
        <h1>Contas a receber</h1>
      </Header>
      <Search>
        <div className='flex'>
        <SearchInput 
              type="text" 
              placeholder='Buscar conta' 
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          <SearchButton>
            <FiSearch size={20} />
          </SearchButton>
        </div>

      </Search>
        <AddContent>
          <AddButton>Nova conta a receber</AddButton>
        </AddContent>
      <ReceivablesTable>
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
            {paginatedAccounts.map(receivable => (
              <tr key={receivable._id}>
                <td>{receivable.documentNumber}</td>
                <td>{receivable.description}</td>
                <td>{new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(receivable.value)}</td>
                <td>{new Intl.DateTimeFormat('pt-BR',{
                      timeZone: 'UTC'
                    }).format(
                      new Date(receivable.dueDate)
                    )}</td>
                    <td>{receivable.payeeOrPayer}</td>
                    <td>Carteira</td>
                    <td
                      className={
                        receivable.status === 'Late' ? 'late' :
                      receivable.status === 'Paid' ? 'paid' :
                      receivable.status === 'Pending' ? 'pending' : ''
                      }
                    >{
                      receivable.status === 'Late' ? 'Conta atrasada' :
                      receivable.status === 'Paid' ? 'Conta paga' :
                      receivable.status === 'Pending' ? 'A vencer': 'Desconhecido'
                    }
                    </td>
                    <td>
                <a className='edit'>
                  <div className='tooltip'>
                    <FiEdit size={20} />
                    <span className='tooltiptext'>Editar</span>
                  </div>
                </a>
                <a 
                  className='delete'
                  type='button'
                  onClick={() => {
                    setIsOpenDel(true);
                    setSelectedAccount(receivable);
                  }}
                >
                  <div className='tooltip'>
                    <FiTrash2 size={20} />
                    <span className='tooltiptext'>Excluir</span>
                  </div>
                </a>
                <a className='check'>
                 <div className='tooltip'>
                 {receivable.isPaid ? <FiCheckSquare size={20} /> : <FiSquare color='#181d29' size={20} />}
                    <span className='tooltiptext'>{receivable.isPaid ? 'Desfazer pagamento' : 'Marcar como pago'}</span>
                  </div>
                </a>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ReceivablesTable>
    </Container>
  )
}