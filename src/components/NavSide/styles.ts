import styled from 'styled-components'

interface NavSideItemProps {
  isActive: boolean
}

export const NavSideContainer = styled.div`
  width: 100%;
  max-width: 240px;
  height: 100vh;
  background-color: var(--primary);
  display: grid;
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  @media (max-width: 375px) {
    min-width: 83px;
  }

  @media (max-width: 767px) {
    grid-template-rows: auto auto;
    justify-items: center;
    max-width: 83px;
  }
`

export const Logo = styled.div`
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
    display: none;
    font-size: 20px;
    color: var(--white);
    margin-left: 10px;

    @media (min-width: 768px) {
      display: block;
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

  @media (max-width: 767px) {
    flex-wrap: wrap;
    padding: 0;
  }
`

export const NavSideItem = styled.li<NavSideItemProps>`
  width: 100%;
  padding: 10px 0;
  display: flex;
  align-items: start;
  justify-content: center;
  background-color: ${({ isActive }) =>
    isActive ? 'var(--secondary)' : 'transparent'};

  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? 'var(--secondary)' : 'var(--quinary)'};
  }

  a {
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
    a {
      justify-content: center;
      font-size: 0;
    }
  }

  @media (min-width: 768px) {
    padding: 0;

    a {
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
