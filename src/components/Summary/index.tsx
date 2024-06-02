import React, { useEffect, useState } from 'react'
import { useTransactions } from '../../hooks/useTransactions'
import { Container } from './styles'
import incomeImg from '../../assets/Receita.svg'
import outcomeImg from '../../assets/Despesa.svg'
import totalImg from '../../assets/Total.svg'

export function Summary() {
  const { transactions } = useTransactions()
  const [summary, setSummary] = useState({
    deposits: 0,
    withdraws: 0,
    total: 0,
  })

  useEffect(() => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    const monthlySummary = transactions.reduce(
      (acc, transaction) => {
        const transactionDate = new Date(transaction.date)
        const transactionMonth = transactionDate.getMonth()
        const transactionYear = transactionDate.getFullYear()

        if (
          transactionMonth === currentMonth &&
          transactionYear === currentYear
        ) {
          if (transaction.type === 'Deposit') {
            acc.deposits += transaction.amount
            acc.total += transaction.amount
          } else if (transaction.type === 'Withdrawal') {
            acc.withdraws += transaction.amount
            acc.total -= transaction.amount
          }
        }

        return acc
      },
      {
        deposits: 0,
        withdraws: 0,
        total: 0,
      },
    )

    setSummary(monthlySummary)
  }, [transactions])

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong className="deposit">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong className="nowp">{` - ${new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(summary.withdraws)} `}</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  )
}
