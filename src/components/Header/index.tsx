import logoImg from "../../assets/logo.svg";
import { Container, Content } from "./styles";

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal } : HeaderProps) {
  

  return (
    <Container>
      <Content>
        <div>
          <img src={logoImg} alt="My Finance" />
          <h1>My Finance</h1>
        </div>
        <button 
          type="button"
          onClick={onOpenNewTransactionModal}
        >
          Novo Lançamento
        </button>
        <button
          type="button"
          className="button-mobile"
          onClick={onOpenNewTransactionModal}
        >
          +
        </button>
      </Content>
    </Container>
  );
}
