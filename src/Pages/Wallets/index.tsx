import { Container, Header, AddContent, AddButton, WalletsContent } from "./styles"
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function Wallets() {
  return (
    <Container>
      <Header>
        <h1>Carteiras</h1>
      </Header>
      <AddContent>
        <AddButton>Nova carteira</AddButton>
      </AddContent>
      <WalletsContent>
        <div className="wallet">
          <h2>Nubank</h2>
          <p>R$ 500,00</p>
          <div className="actions">
            <a className='edit'>
              <FiEdit size={20} />
            </a>
            <a className='delete'>
              <FiTrash2 size={20} />
            </a>
          </div>
        </div>
        <div className="wallet">
          <h2>Inter</h2>
          <p>R$ 100,00</p>
          <div className="actions">
            <a className='edit'>
              <FiEdit size={20} />
            </a>
            <a className='delete'>
              <FiTrash2 size={20} />
            </a>
          </div>
        </div>
        <div className="wallet">
          <h2>Neon</h2>
          <p>R$ 200,00</p>
          <div className="actions">
            <a className='edit'>
              <FiEdit size={20} />
            </a>
            <a className='delete'>
              <FiTrash2 size={20} />
            </a>
          </div>
        </div>
        <div className="wallet">
          <h2>Itaú</h2>
          <p>R$ 300,00</p>
          <div className="actions">
            <a className='edit'>
              <FiEdit size={20} />
            </a>
            <a className='delete'>
              <FiTrash2 size={20} />
            </a>
          </div>
        </div>
      </WalletsContent>
    </Container>
  )
}