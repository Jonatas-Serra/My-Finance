import styled from 'styled-components'
import { FiBell, FiMenu } from 'react-icons/fi'

export const NavbarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: var(--white);
  border-bottom: 1px solid rgba(204, 204, 204, 0.1);
`

export const Title = styled.h1`
  font-size: 24px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`

export const UserSection = styled.div`
  display: flex;
  align-items: center;
`

export const NotificationIcon = styled(FiBell)`
  font-size: 26px;
  margin-right: 16px;
  cursor: pointer;
`

export const UserProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`

export const HamburgerIcon = styled(FiMenu)`
  display: none;
  font-size: 26px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`
