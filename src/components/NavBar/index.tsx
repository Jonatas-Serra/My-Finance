import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  NavbarContainer,
  Title,
  NotificationIcon,
  UserProfile,
  UserSection,
  HamburgerIcon,
  NotificationContainer,
  NotificationItem,
  NotificationWrapper,
  NotificationBadge,
} from './styles'
import userImg from '../../assets/perfil.png'
import incomeImg from '../../assets/Receita.svg'
import outcomeImg from '../../assets/Despesa.svg'

import { useUser } from '../../hooks/User'
import { useAccounts } from '../../hooks/useAccounts'

import { getPageTitle } from '../../utils/pageTitles'
import api from '../../services/api'

interface Notification {
  _id: string
  message: string
  read: boolean
  accountId: string
}

export function NavBar({ toggleMenu }) {
  const location = useLocation()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState<boolean>(false)
  const notificationRef = useRef<HTMLDivElement>(null)

  const { user } = useUser()
  const { accounts } = useAccounts()
  const navigate = useNavigate()
  const token = localStorage.getItem('@Myfinance:token')

  const [pageTitle, setPageTitle] = useState<string>(
    getPageTitle(location.pathname),
  )

  const numberOfUnreadNotifications = notifications.filter(
    (notification) => !notification.read,
  ).length

  async function fetchNotifications() {
    try {
      const response = await api.get(`notifications/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setNotifications(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await api.patch(`notifications/${notificationId}/read`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, read: true }
            : notification,
        ),
      )

      fetchNotifications()
    } catch (error) {
      console.error(error)
    }
  }

  const markAllNotificationsAsRead = async () => {
    try {
      await api.patch(`notifications/${user._id}/read-all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          read: true,
        })),
      )

      fetchNotifications()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchNotifications()
    setPageTitle(getPageTitle(location.pathname))
  }, [location.pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <NavbarContainer>
      <HamburgerIcon onClick={toggleMenu} />
      <Title>{pageTitle}</Title>
      <UserSection>
        <NotificationWrapper>
          <NotificationIcon
            onClick={() => setShowNotifications(!showNotifications)}
          />
          {numberOfUnreadNotifications > 0 && (
            <NotificationBadge>{numberOfUnreadNotifications}</NotificationBadge>
          )}
          {showNotifications && (
            <NotificationContainer ref={notificationRef}>
              {notifications.map(
                (notification) =>
                  !notification.read && (
                    <NotificationItem key={notification._id}>
                      <a
                        onClick={() => {
                          markNotificationAsRead(notification._id)
                          navigate(
                            `${
                              accounts.find(
                                (account) =>
                                  account._id === notification.accountId,
                              )?.type === 'payable'
                                ? 'payables'
                                : 'receivables'
                            }`,
                          )
                          setShowNotifications(false)
                        }}
                      >
                        <img
                          src={
                            accounts.find(
                              (account) =>
                                account._id === notification.accountId,
                            )?.type === 'payable'
                              ? outcomeImg
                              : incomeImg
                          }
                          alt="Account"
                        />
                        {notification.message}
                      </a>
                    </NotificationItem>
                  ),
              )}
              <a className="cls" onClick={markAllNotificationsAsRead}>
                Limpar notificações
              </a>
            </NotificationContainer>
          )}
        </NotificationWrapper>
        <UserProfile
          src={user.photo ? user.photo : userImg}
          alt="User Profile"
        />
      </UserSection>
    </NavbarContainer>
  )
}
