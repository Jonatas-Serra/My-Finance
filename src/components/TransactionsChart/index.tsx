import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { useTransactions } from '../../hooks/useTransactions'

import { Spinner, Container } from './styles'

const TransactionsChart: React.FC = () => {
  const { transactions } = useTransactions()
  const [chartData, setChartData] = useState<any>(null)

  useEffect(() => {
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      return date.toLocaleString('default', { month: 'short' })
    }).reverse()

    const deposits = new Array(6).fill(0)
    const withdrawals = new Array(6).fill(0)

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date)
      const month = date.toLocaleString('default', { month: 'short' })
      const index = last6Months.indexOf(month)

      if (index !== -1) {
        // Ensure the transaction date is within the last 6 months
        if (transaction.type === 'Deposit') {
          deposits[index] += transaction.amount
        } else if (transaction.type === 'Withdrawal') {
          withdrawals[index] += transaction.amount
        }
      }
    })

    setChartData({
      series: [
        {
          name: 'Receitas',
          data: deposits,
          color: '#08c6ab',
        },
        {
          name: 'Despesas',
          data: withdrawals,
          color: '#dc2020',
        },
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        xaxis: {
          categories: last6Months,
        },
        yaxis: {
          title: {
            text: 'R$',
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return `R$ ${val}`
            },
          },
        },
      },
    })
  }, [transactions])

  if (!chartData) {
    return (
      <Container>
        <Spinner />
      </Container>
    )
  }

  return (
    <Container>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={210}
      />
    </Container>
  )
}

export default TransactionsChart
