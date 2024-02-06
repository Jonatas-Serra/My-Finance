import { 
  Container, 
  Header, 
  Search, 
  SearchInput, 
  SearchButton,
  AddContent,
  AddButton,
  TransactionsTable
 } from './styles';
 import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";

export default function Transactions() {
  return (
    <Container>
      <Header>
        <h1>Transações</h1>
      </Header>
      <Search>
        <div className='flex'>
          <SearchInput type="text" placeholder='Buscar transação' />
          <SearchButton>
            <FiSearch size={20} />
          </SearchButton>
        </div>

      </Search>
        <AddContent>
          <AddButton>Nova transação</AddButton>
        </AddContent>
      <TransactionsTable>
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
            <tr>
              <td>Compra de pão</td>
              <td>R$ 5,00</td>
              <td>10/08/2021</td>
              <td>Saída</td>
              <td>Alimentação</td>
              <td>Dinheiro</td>
              <td>
                <a className='edit'>
                  <FiEdit size={20} />
                </a>
                <a className='delete'>
                  <FiTrash2 size={20} />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </TransactionsTable>
    </Container>
  )
}