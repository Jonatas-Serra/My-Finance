import styled from "styled-components";

export const Container = styled.header`
  background-color: var(--primary);

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.div`

  @media screen and (max-width: 768px) {
    flex-direction: column;    
  }

  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
  
  padding: 2rem 1rem 12rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  div {
    display: flex;
    align-items: center;
    gap: 1rem;

    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1.5rem;
    color: var(--primary);
    
  }

  button {
    @media screen and (max-width: 768px) {
      display: none;
    }

    font-size: 1.2rem;
    color: var(--background);
    background-color: var(--quaternary);
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem;
    font-weight: 600;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }

  .button-mobile {
    @media screen and (min-width: 768px) {
      display: none;
    }

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
    color: var(--background);
    background-color: var(--quaternary);
    border: 0;
    padding: 2rem;
    border-radius: 50%;
    height: 28px;
    width: 28px;
    font-weight: 600;

    position: fixed;
    bottom: 1.4rem;
    right: 1.4rem;

    z-index: 999;


    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }


  h1 {
    color: var(--quaternary);
    font-size: 2.5rem;
  }

  img {
    width: 5rem;
    height: 5rem;
  }
`;