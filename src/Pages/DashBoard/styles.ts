import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: var(--background);
  display: flex;
`

export const Content = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100vh;

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
