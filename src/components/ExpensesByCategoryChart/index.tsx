import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { useTransactions } from '../../hooks/useTransactions'

import { Container } from './styles'

const ExpensesByCategoryChart: React.FC = () => {
  const { transactions } = useTransactions()
  const [chartData, setChartData] = useState({ series: [], labels: [] } as any)

  useEffect(() => {
    const expensesByCategory = transactions
      .filter((transaction) => transaction.type === 'Withdrawal')
      .reduce((acc, transaction) => {
        const { category, amount } = transaction
        if (!acc[category]) {
          acc[category] = 0
        }
        acc[category] += amount
        return acc
      }, {})

    const categories = Object.keys(expensesByCategory)
    const series = categories.map((category) => expensesByCategory[category])

    setChartData({ series, labels: categories })
  }, [transactions])

  const options = {
    labels: chartData.labels,
    colors: [
      '#1f77b4',
      '#2ca02c',
      '#ffbb78',
      '#bcbd22',
      '#393b79',
      '#9edae5',
      '#e377c2',
      '#7f7f7f',
      '#ff7f0e',
      '#17becf',
      '#aec7e8',
      '#98df8a',
      '#ff9896',
      '#c5b0d5',
      '#c49c94',
      '#f7b6d2',
      '#c7c7c7',
      '#dbdb8d',
      '#8c564b',
      '#637939',
      '#9467bd',
      '#8c6d31',
      '#843c39',
      '#7b4173',
      '#d62728',
      '#5254a3',
      '#6b6ecf',
      '#9c9ede',
      '#637939',
    ],
    legend: {
      position: 'right',
    } as any,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 280,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    tooltip: {
      y: {
        formatter: (val: number) => {
          return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(val)
        },
      },
    },
  }

  return (
    <Container>
      <Chart
        options={options}
        series={chartData.series}
        type="pie"
        width="450"
      />
    </Container>
  )
}

export default ExpensesByCategoryChart
