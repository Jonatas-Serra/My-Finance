import { Container } from "./styles";
import incomeImg from "../../assets/Receita.svg";
import outcomeImg from "../../assets/Despesa.svg";
import totalImg from "../../assets/Total.svg";

export function Summary() {
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>R$ 3.000,00</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>- R$ 800,00</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>R$ 2.200,00</strong>
      </div>
      </Container>
  )
}
