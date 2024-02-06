import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBookOpen, FiTrendingDown, FiTrendingUp, FiLogOut, FiSettings } from 'react-icons/fi';
import { IoWalletOutline } from 'react-icons/io5';
import logoImg from '../../assets/logo.svg';

import { useAuth } from '../../hooks/Auth';

import { NavSideContainer, NavSideList, NavSideItem, NavSideFooter, Logo } from './styles';

export function NavSide() {
  const { signOut } = useAuth();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState<string>(location.pathname);

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
  };

  return (
    <NavSideContainer>
      <Logo>
        <img src={logoImg} alt="" />
        <h1>My Finance</h1>
      </Logo>
      <NavSideList>
        <NavSideItem isActive={activeLink === '/resume'}>
          <Link to="resume" onClick={() => handleLinkClick('/resume')}>
            <FiHome />
            Resumo
          </Link>
        </NavSideItem>
        <NavSideItem isActive={activeLink === '/transactions'}>
          <Link to="transactions" onClick={() => handleLinkClick('/transactions')}>
            <FiBookOpen />
            Transações
          </Link>
        </NavSideItem>
        <NavSideItem isActive={activeLink === '/wallets'}>
          <Link to="wallets" onClick={() => handleLinkClick('/wallets')}>
            <IoWalletOutline />
            Carteiras
          </Link>
        </NavSideItem>
        <NavSideItem isActive={activeLink === '/receivables'}>
          <Link to="receivables" onClick={() => handleLinkClick('/receivables')}>
            <FiTrendingUp />
            Contas a receber
          </Link>
        </NavSideItem>
        <NavSideItem isActive={activeLink === '/payables'}>
          <Link to="payables" onClick={() => handleLinkClick('/payables')}>
            <FiTrendingDown />
            Contas a pagar
          </Link>
        </NavSideItem>
        <NavSideItem isActive={activeLink === '/settings'}>
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
  );
}
