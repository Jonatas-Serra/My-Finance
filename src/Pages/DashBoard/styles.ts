import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  max-width: 100vw;
  max-height: 100vh;
  overflow: none;
  background-color: var(--background);
`

export const Content = styled.div<{ isMenuOpen: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100vh;
  margin-left: ${({ isMenuOpen }) => (isMenuOpen ? '240px' : '0')};
  transition: margin-left 0.3s ease-in-out;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`

export const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: var(--white);
`
