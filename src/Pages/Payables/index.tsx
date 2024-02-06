import { 
  Container, 
  Header, 
  Search, 
  SearchInput, 
  SearchButton,
  AddContent,
  AddButton,
  PayablesTable,
 } from './styles';

 import { FiSearch, FiEdit, FiTrash2, FiCheckSquare } from "react-icons/fi";

export default function Payables() {
  return (
    <Container>
      <Header>
        <h1>Contas a pagar</h1>
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
          <AddButton>Nova conta a pagar</AddButton>
        </AddContent>
      <PayablesTable>
        <table>
          <thead>
            <tr>
              <th>Nº doc.</th>
              <th>Nome</th>
              <th>Valor</th>
              <th>Vencimento</th>
              <th>Recebedor</th>
              <th>Carteira</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>33214</td>
              <td>Energia</td>
              <td>R$ 159,00</td>
              <td>10/02/2024</td>
              <td>Coelba</td>
              <td>Nubank</td>
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
                    <span className='tooltiptext'>Confirmar pagamento</span>
                  </div>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </PayablesTable>
    </Container>
  )
}