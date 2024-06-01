import React from 'react'
import { useTransition } from '@react-spring/web'

import Toast from './Toast'

import { ToastMessage } from '../../hooks/useToast'
import { Container } from './styles'

interface ToastContainerProps {
  messages: ToastMessage[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(messages, {
    keys: (message) => message.id,
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  })
  return (
    <Container>
      {messagesWithTransitions((style, item, t) => (
        <Toast key={t.key} style={style} message={item} />
      ))}
    </Container>
  )
}

export default ToastContainer
