import styled from "styled-components";

export const Container = styled.header`
  background-color: var(--primary);

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.div`
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

  h1 {
    color: var(--quaternary);
    font-size: 2.5rem;
  }

  img {
    width: 5rem;
    height: 5rem;
  }
`;