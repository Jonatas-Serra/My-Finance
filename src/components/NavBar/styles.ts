import styled from 'styled-components'
import { FiBell, FiMenu } from 'react-icons/fi'

export const NavbarContainer = styled.div`
  overflow: none;
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
  position: relative;
`

export const NotificationWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

export const NotificationIcon = styled(FiBell)`
  font-size: 32px;
  cursor: pointer;
`

export const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -4px;
  background-color: var(--tertiary);
  color: var(--white);
  font-size: 10px;
  border-radius: 50%;
  padding: 4px 8px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export const UserProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 16px;
`

export const HamburgerIcon = styled(FiMenu)`
  display: none;
  font-size: 26px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`

export const NotificationContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  background-color: var(--white);
  border: 1px solid rgba(204, 204, 204, 0.1);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin: 16px -42px 0 0;
  cursor: pointer;

  .cls {
    padding: 16px;
    display: block;
    text-align: center;
    text-decoration: none;
    color: var(--primary);
    font-weight: bold;
    border-top: 1px solid rgba(204, 204, 204, 0.1);
    cursor: pointer;
  }
`

export const NotificationItem = styled.div`
  padding: 16px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.1);
  cursor: pointer;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`
