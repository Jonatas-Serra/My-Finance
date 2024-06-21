import React, { useEffect, useState } from 'react'
import { useAccounts } from '../../hooks/useAccounts'
import { useToast } from '../../hooks/useToast'
import {
  Container,
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  Actions,
  PayButton,
  ReceiveButton,
  DeleteButton,
  CardContainer,
  Card,
  CardHeader,
  CardContent,
} from './styles'

interface UpcomingAccountsProps {
  days: number
}

function getMonthDateRange() {
  const currentDate = new Date()

  const firstDayCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  )

  const lastDayNextMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 2,
    0,
  )

  return {
    startDate: firstDayCurrentMonth,
    endDate: lastDayNextMonth,
  }
}

const UpcomingAccounts: React.FC<UpcomingAccountsProps> = ({ days }) => {
  const { accounts, handleDeleteAccount, PayAccount, getAccounts } =
    useAccounts()
  const { addToast } = useToast()
  const [payableAccounts, setPayableAccounts] = useState<any[]>([])
  const [receivableAccounts, setReceivableAccounts] = useState<any[]>([])

  useEffect(() => {
    const updateAccounts = () => {
      const now = new Date()
      const upcomingPayable = accounts.filter((account) => {
        const dueDate = new Date(account.dueDate)
        const diffTime = dueDate.getTime() - now.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return (
          account.type === 'payable' &&
          diffDays <= days &&
          diffDays >= 0 &&
          !account.isPaid
        )
      })
      const upcomingReceivable = accounts.filter((account) => {
        const dueDate = new Date(account.dueDate)
        const diffTime = dueDate.getTime() - now.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return (
          account.type === 'receivable' &&
          diffDays <= days &&
          diffDays >= 0 &&
          !account.isPaid
        )
      })

      setPayableAccounts(upcomingPayable)
      setReceivableAccounts(upcomingReceivable)
    }

    updateAccounts()
  }, [accounts, days])

  const handleAction = async (action: string, account: any) => {
    if (action === 'delete') {
      await handleDeleteAccount(account._id)
      addToast({
        type: 'success',
        title: 'Conta excluída com sucesso',
      })
    } else if (action === 'payReceive') {
      await PayAccount(account._id, account.walletId, new Date())
      addToast({
        type: 'success',
        title: 'Conta paga/recebida com sucesso',
      })
    }
    await getAccounts({
      dateRange: getMonthDateRange(),
      status: [],
    })
  }

  return (
    <Container>
      <TableContainer>
        <h3>Contas a Pagar</h3>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Beneficiário</TableHeader>
              <TableHeader>Descrição</TableHeader>
              <TableHeader>Data de Vencimento</TableHeader>
              <TableHeader>Valor</TableHeader>
              <TableHeader>Ações</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {payableAccounts.map((account) => (
              <TableRow key={account._id}>
                <TableCell>{account.payeeOrPayer}</TableCell>
                <TableCell>{account.description}</TableCell>
                <TableCell>
                  {new Date(account.dueDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(account.value)}
                </TableCell>
                <TableCell>
                  <Actions>
                    <PayButton
                      onClick={() => handleAction('payReceive', account)}
                    >
                      Pagar
                    </PayButton>
                    <DeleteButton
                      onClick={() => handleAction('delete', account)}
                    >
                      Excluir
                    </DeleteButton>
                  </Actions>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      <CardContainer>
        <h3>Contas a Pagar</h3>
        {payableAccounts.map((account) => (
          <Card key={account._id}>
            <CardHeader>{account.payeeOrPayer}</CardHeader>
            <CardContent>
              <p>Descrição: {account.description}</p>
              <p>
                Data de Vencimento:{' '}
                {new Date(account.dueDate).toLocaleDateString()}
              </p>
              <p>
                Valor:{' '}
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(account.value)}
              </p>
              <Actions>
                <PayButton onClick={() => handleAction('payReceive', account)}>
                  Pagar
                </PayButton>
                <DeleteButton onClick={() => handleAction('delete', account)}>
                  Excluir
                </DeleteButton>
              </Actions>
            </CardContent>
          </Card>
        ))}
      </CardContainer>
      <TableContainer>
        <h3>Contas a Receber</h3>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Pagador</TableHeader>
              <TableHeader>Descrição</TableHeader>
              <TableHeader>Data de Vencimento</TableHeader>
              <TableHeader>Valor</TableHeader>
              <TableHeader>Ações</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {receivableAccounts.map((account) => (
              <TableRow key={account._id}>
                <TableCell>{account.payeeOrPayer}</TableCell>
                <TableCell>{account.description}</TableCell>
                <TableCell>
                  {new Date(account.dueDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(account.value)}
                </TableCell>
                <TableCell>
                  <Actions>
                    <ReceiveButton
                      onClick={() => handleAction('payReceive', account)}
                    >
                      Receber
                    </ReceiveButton>
                    <DeleteButton
                      onClick={() => handleAction('delete', account)}
                    >
                      Excluir
                    </DeleteButton>
                  </Actions>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      <CardContainer>
        <h3>Contas a Receber</h3>
        {receivableAccounts.map((account) => (
          <Card key={account._id}>
            <CardHeader>{account.payeeOrPayer}</CardHeader>
            <CardContent>
              <p>Descrição: {account.description}</p>
              <p>
                Data de Vencimento:{' '}
                {new Date(account.dueDate).toLocaleDateString()}
              </p>
              <p>
                Valor:{' '}
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(account.value)}
              </p>
              <Actions>
                <ReceiveButton
                  onClick={() => handleAction('payReceive', account)}
                >
                  Receber
                </ReceiveButton>
                <DeleteButton onClick={() => handleAction('delete', account)}>
                  Excluir
                </DeleteButton>
              </Actions>
            </CardContent>
          </Card>
        ))}
      </CardContainer>
    </Container>
  )
}

export default UpcomingAccounts
