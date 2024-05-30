import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  NavbarContainer,
  Title,
  NotificationIcon,
  UserProfile,
  UserSection,
  HamburgerIcon,
} from './styles'
import { useUser } from '../../hooks/User'
import userImg from '../../assets/perfil.png'
import { getPageTitle } from '../../utils/pageTitles'

export function NavBar({ toggleMenu }) {
  const location = useLocation()
  const [pageTitle, setPageTitle] = useState<string>(
    getPageTitle(location.pathname),
  )
  const { user } = useUser()

  useEffect(() => {
    setPageTitle(getPageTitle(location.pathname))
  }, [location.pathname])

  return (
    <NavbarContainer>
      <HamburgerIcon onClick={toggleMenu} />
      <Title>{pageTitle}</Title>
      <UserSection>
        <NotificationIcon />
        <UserProfile
          src={user.photo ? user.photo : userImg}
          alt="User Profile"
        />
      </UserSection>
    </NavbarContainer>
  )
}
