import styled from 'styled-components'

interface NavSideContainerProps {
  isMenuOpen: boolean
}

export const NavSideContainer = styled.div<NavSideContainerProps>`
  width: ${({ isMenuOpen }) => (isMenuOpen ? '240px' : '84px')};
  height: 100%;
  min-height: 100vh;
  background-color: var(--primary);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease-in-out;

  @media (max-width: 767px) {
    width: ${({ isMenuOpen }) => (isMenuOpen ? '84px' : '0')};
  }

  @media (min-width: 768px) {
    min-width: 240px;
  }

  @media (max-width: 400px) {
    max-width: 84px;
  }
`

export const Logo = styled.div<{ isMenuOpen: boolean }>`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 80%;
    max-width: 50px;
    height: auto;

    @media (max-width: 767px) {
      margin: 0 auto;
    }
  }

  h1 {
    display: ${({ isMenuOpen }) => (isMenuOpen ? 'none' : 'block')};
    font-size: 20px;
    color: var(--white);
    margin-left: 10px;

    @media (max-width: 767px) {
      display: none;
    }
  }

  @media (max-width: 767px) {
    padding: 0px;
  }
`

export const NavSideList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  @media (max-width: 767px) {
    flex-wrap: wrap;
    padding: 0;
  }
`

export const NavSideItem = styled.li<{ isActive: boolean; disabled?: boolean }>`
  width: 100%;
  padding: 10px 0;
  display: flex;
  align-items: start;
  justify-content: center;
  background-color: ${({ isActive }) =>
    isActive ? 'var(--secondary)' : 'transparent'};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? 'var(--secondary)' : 'var(--quinary)'};
  }

  a,
  div {
    width: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--white);
    font-family: 'Montserrat', sans-serif;
    transition: all 0.3s ease-in-out;
    padding: 14px 24px;
    gap: 14px;

    svg {
      margin-right: 0;
      font-size: 20px;
    }

    &:hover {
      transform: translateX(8px);
    }
  }

  @media (max-width: 767px) {
    a,
    div {
      justify-content: center;
      font-size: 0;
    }
  }

  @media (min-width: 768px) {
    padding: 0;

    a,
    div {
      font-size: 16px;
    }
  }
`

export const NavSideFooter = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--quaternary);

  a {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: var(--white);
    font-family: 'Montserrat', sans-serif;
    transition: all 0.3s ease-in-out;
    font-size: 0;

    svg {
      margin-right: 0;
      font-size: 20px;
    }

    &:hover {
      color: var(--secondary);
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;

    a {
      font-size: 16px;
      padding: 10px 20px;
    }
  }

  .logout {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
  }
`

export const Badge = styled.span`
  background-color: var(--secondary);
  color: var(--white);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 10px;
  margin-left: 8px;
`
