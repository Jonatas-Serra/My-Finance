import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    background: var(--quinary);
    border: 0;
    color: var(--white);
    padding: 0.6rem 0.9rem;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    margin: 0 0.5rem;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }
  .active {
    background: var(--quaternary);
    color: var(--background);

    &:hover {
      filter: brightness(0.8);
    }
  }
`
