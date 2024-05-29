const pageTitleMap: { [key: string]: string } = {
  '/dashboard/resume': 'Resumo',
  '/dashboard/transactions': 'Lançamentos',
  '/dashboard/wallets': 'Carteiras',
  '/dashboard/receivables': 'Contas a receber',
  '/dashboard/payables': 'Contas a pagar',
  '/dashboard/settings': 'Configurações',
}

export function getPageTitle(pathname: string): string {
  return pageTitleMap[pathname] || 'My Finance'
}
