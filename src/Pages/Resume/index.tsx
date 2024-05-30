import { Container, Content, MainContent } from './styles'
import { Summary } from '../../components/Summary'

export default function Resume() {
  return (
    <Container>
      <MainContent>
        <Content>
          <Summary />
        </Content>
      </MainContent>
    </Container>
  )
}
