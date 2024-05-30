import styled from 'styled-components'
import { FiBell } from 'react-icons/fi'

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
