import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  max-height: calc(100vh - 91px);
  background-color: var(--background);
  display: flex;
`

export const Content = styled.div`
  width: 100%;
  height: 100%;
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  p {
    font-size: 16px;
    margin-bottom: 20px;
  }
  @media (min-width: 768px) {
    h1 {
      font-size: 32px;
    }
    p {
      font-size: 20px;
    }
  }
`
