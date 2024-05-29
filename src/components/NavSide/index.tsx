import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FiHome,
  FiBookOpen,
  FiTrendingDown,
  FiTrendingUp,
  FiLogOut,
  FiSettings,
} from 'react-icons/fi'
import { IoWalletOutline } from 'react-icons/io5'
import logoImg from '../../assets/logo.svg'
import { useAuth } from '../../hooks/Auth'
import {
  NavSideContainer,
  NavSideList,
  NavSideItem,
  NavSideFooter,
  Logo,
} from './styles'
import { getPageTitle } from '../../utils/pageTitles'

export function NavSide() {
  const { signOut } = useAuth()
  const location = useLocation()
  const [activeLink, setActiveLink] = useState<string>(location.pathname)

  const handleLinkClick = (link: string) => {
    setActiveLink(link)
  }

  useEffect(() => {
    setActiveLink(location.pathname)
  }, [location])

  return (
    <NavSideContainer>
      <Logo>
        <img src={logoImg} alt="" />
        <h1>My Finance</h1>
      </Logo>
      <NavSideList>
        <NavSideItem isActive={activeLink === '/dashboard/resume'}>
          <Link to="resume" onClick={() => handleLinkClick('/resume')}>
            <FiHome />
            Resumo
          </Link>
        </NavSideItem>
        <NavSideItem isActive={activeLink === '/dashboard/transactions'}>
          <Link
            to="transactions"
            onClick={() => handleLinkClick('/transactions')}
          >
            <FiBookOpen />
            Lançamentos
          </Link>
        </NavSideItem>
        <NavSideItem isActive={activeLink === '/dashboard/wallets'}>
          <Link to="wallets" onClick={() => handleLinkClick('/wallets')}>
            <IoWalletOutline />
            Carteiras
          </Link>
        </NavSideItem>
        <NavSideItem isActive={activeLink === '/dashboard/receivables'}>
          <Link
            to="receivables"
            onClick={() => handleLinkClick('/receivables')}
          >
            <FiTrendingUp />
            Contas a receber
          </Link>
        </NavSideItem>
        <NavSideItem isActive={activeLink === '/dashboard/payables'}>
          <Link to="payables" onClick={() => handleLinkClick('/payables')}>
            <FiTrendingDown />
            Contas a pagar
          </Link>
        </NavSideItem>
        <NavSideItem isActive={activeLink === '/dashboard/settings'}>
          <Link to="settings" onClick={() => handleLinkClick('/settings')}>
            <FiSettings />
            Configurações
          </Link>
        </NavSideItem>
      </NavSideList>
      <NavSideFooter>
        <Link to="/" onClick={signOut}>
          <FiLogOut />
          Sair
        </Link>
      </NavSideFooter>
    </NavSideContainer>
  )
}
