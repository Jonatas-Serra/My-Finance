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

 import { FiSearch, FiEdit, FiTrash2, FiCheckSquare } from "react-icons/fi";

export default function Receables() {
  return (
    <Container>
      <Header>
        <h1>Contas a receber</h1>
      </Header>
      <Search>
        <div className='flex'>
          <SearchInput type="text" placeholder='Buscar conta' />
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
              <th>Nome</th>
              <th>Valor</th>
              <th>Vencimento</th>
              <th>Pagador</th>
              <th>Carteira</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0001</td>
              <td>Salário</td>
              <td>R$ 5.000,00</td>
              <td>10/02/2024</td>
              <td>Space x</td>
              <td>Itaú</td>
              <td>Pendente</td>
              <td>
                <a className='edit'>
                  <div className='tooltip'>
                    <FiEdit size={20} />
                    <span className='tooltiptext'>Editar</span>
                  </div>
                </a>
                <a className='delete'>
                  <div className='tooltip'>
                    <FiTrash2 size={20} />
                    <span className='tooltiptext'>Excluir</span>
                  </div>
                </a>
                <a className='check'>
                 <div className='tooltip'>
                  <FiCheckSquare size={20} />
                    <span className='tooltiptext'>Marcar como pago</span>
                  </div>
                </a>
              </td>
            </tr>
            
          </tbody>
        </table>
      </ReceivablesTable>
    </Container>
  )
}