import { Container, Header, Content, MainContent } from './styles'
import { Summary } from '../../components/Summary'

export default function Resume() {
  return (
    <Container>
      <MainContent>
        <Header>
          <h1>Resumo</h1>
        </Header>
        <Content>
          <Summary />
        </Content>
      </MainContent>
    </Container>
  )
}
