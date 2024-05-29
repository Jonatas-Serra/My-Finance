import styled from 'styled-components'
import { FaBell } from 'react-icons/fa'

export const NavbarContainer = styled.div`
  width: 100%;
  min-width: 440px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: var(--white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const Title = styled.h1`
  font-size: 24px;
  color: #333;
`

export const UserSection = styled.div`
  display: flex;
  align-items: center;
`

export const NotificationIcon = styled(FaBell)`
  font-size: 24px;
  margin-right: 16px;
  cursor: pointer;
`

export const UserProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`
