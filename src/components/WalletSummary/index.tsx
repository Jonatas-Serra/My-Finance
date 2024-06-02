import { useWallets } from '../../hooks/useWallets'
import { Container } from './styles'
import totalImg from '../../assets/Total.svg'

export function WalletSummary() {
  const { wallets } = useWallets()

  const totalBalances = wallets.reduce((acc, wallet) => acc + wallet.balance, 0)

  return (
    <Container>
      {wallets.map((wallet) => (
        <div key={wallet._id}>
          <header>
            <p>{wallet.name}</p>
          </header>
          <strong>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(wallet.balance)}
          </strong>
        </div>
      ))}
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(totalBalances)}
        </strong>
      </div>
    </Container>
  )
}
