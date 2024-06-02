import { useState } from 'react'
import {
  Container,
  SummaryContainer,
  SummaryItem,
  ChartContainer,
  WalletContainer,
  WalletItem,
  UpcomingContainer,
  ButtonGroup,
  Button,
} from './styles'

import TransactionsChart from '../../components/TransactionsChart'
import ExpensesByCategoryChart from '../../components/ExpensesByCategoryChart'
import { WalletSummary } from '../../components/WalletSummary'
import { Summary } from '../../components/Summary'
import UpcomingAccounts from '../../components/UpcomingAccounts'

export default function Resume() {
  const [selectedDays, setSelectedDays] = useState(30)

  return (
    <Container>
      <SummaryContainer>
        <SummaryItem>
          <h2>Receitas e Despesas</h2>
          <ChartContainer>
            <TransactionsChart />
          </ChartContainer>
        </SummaryItem>
        <SummaryItem>
          <h2>Lançamentos do Mês</h2>
          <Summary />
        </SummaryItem>
      </SummaryContainer>
      <WalletContainer>
        <WalletItem>
          <h2>Carteiras</h2>
          <WalletSummary />
        </WalletItem>
        <WalletItem>
          <h2>Despesas por Categoria</h2>
          <ExpensesByCategoryChart />
        </WalletItem>
      </WalletContainer>
      <UpcomingContainer>
        <h2>Próximas Contas</h2>
        <ButtonGroup>
          <Button
            active={selectedDays === 30}
            onClick={() => setSelectedDays(30)}
          >
            30 dias
          </Button>
          <Button
            active={selectedDays === 15}
            onClick={() => setSelectedDays(15)}
          >
            15 dias
          </Button>
          <Button
            active={selectedDays === 7}
            onClick={() => setSelectedDays(7)}
          >
            7 dias
          </Button>
        </ButtonGroup>
        <UpcomingAccounts days={selectedDays} />
      </UpcomingContainer>
    </Container>
  )
}
