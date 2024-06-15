import { useState } from 'react'
import {
  Container,
  SummaryContainer,
  SummaryItem,
  ChartContainer,
  WalletContainer,
  WalletItem,
  UpcomingContainer,
  UpcomingItem,
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
          <h2>Lançamentos do Mês</h2>
          <Summary />
        </SummaryItem>
        <SummaryItem className="it2">
          <h2>Receitas e Despesas</h2>
          <ChartContainer>
            <TransactionsChart />
          </ChartContainer>
        </SummaryItem>
      </SummaryContainer>
      <UpcomingContainer>
        <UpcomingItem>
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
        </UpcomingItem>
      </UpcomingContainer>
      <WalletContainer>
        <WalletItem>
          <h2>Carteiras</h2>
          <WalletSummary />
        </WalletItem>
        <WalletItem className="end">
          <h2>Despesas mensal por Categoria</h2>
          <ExpensesByCategoryChart />
        </WalletItem>
      </WalletContainer>
    </Container>
  )
}
