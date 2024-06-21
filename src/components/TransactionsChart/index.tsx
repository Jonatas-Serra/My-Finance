import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { useTransactions } from '../../hooks/useTransactions'
import { Spinner, Container } from './styles'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowWidth
}

interface Transaction {
  _id: string
  description: string
  type: string
  category: string
  amount: number
  createdAt: string
  createdBy: string
  walletId: string
  date: string
}

const TransactionsChart: React.FC = () => {
  const { transactions } = useTransactions()
  const [formattedTransactions, setFormattedTransactions] = useState<
    Transaction[]
  >([])
  const [chartData, setChartData] = useState<any>(null)
  const windowWidth = useWindowWidth()

  const getChartWidth = () => {
    if (windowWidth <= 480) return 250
    if (windowWidth <= 550) return 320
    if (windowWidth <= 767) return 385
    if (windowWidth <= 991) return 420
    if (windowWidth <= 1199) return 600
    if (windowWidth <= 1399) return 850
    if (windowWidth <= 1720) return 1000
    if (windowWidth <= 1919) return 620
    return 600
  }

  useEffect(() => {
    const formatted = transactions.map((transaction) => ({
      ...transaction,
      date: transaction.date.split('T')[0], // Removendo a parte de tempo da data
    }))
    setFormattedTransactions(formatted)
  }, [transactions])

  useEffect(() => {
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      return format(date, 'MMM yyyy', { locale: ptBR })
    }).reverse()

    const deposits = new Array(6).fill(0)
    const withdrawals = new Array(6).fill(0)

    formattedTransactions.forEach((transaction) => {
      const date = parseISO(transaction.date)
      const formattedMonth = format(date, 'MMM yyyy', { locale: ptBR })
      const index = last6Months.indexOf(formattedMonth)

      if (index !== -1) {
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
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              width: '100%',
            },
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
          },
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
          enabled: true,
          formatter: (val: number) => {
            if (val === 0) return ''
            return `R$ ${val.toFixed(2).replace('.', ',')}`
          },
          style: {
            fontSize: '12px',
            colors: [
              function ({ seriesIndex, w }) {
                return w.config.series[seriesIndex].color
              },
            ],
          },
          background: {
            enabled: true,
            foreColor: '#fff',
            padding: 4,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: '#fff',
            opacity: 0.9,
            dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 1,
              color: '#000',
              opacity: 0.45,
            },
          },
          offsetY: -20,
          offsetX: -2,
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
              return `R$ ${val.toFixed(2).replace('.', ',')}`
            },
          },
        },
      },
    })
  }, [formattedTransactions])

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
        width={getChartWidth()}
      />
    </Container>
  )
}

export default TransactionsChart
