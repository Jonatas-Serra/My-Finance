import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  white-space: nowrap;

  .nowp {
    color: var(--tertiary);
  }

  .deposit {
    white-space: nowrap;
    color: var(--quaternary);
  }

  @media (min-width: 768px) and (max-width: 1060px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 280px;
    gap: 1rem;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    flex-direction: column;
    gap: 1rem;

    div {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      strong {
        font-size: 1.5rem;

        &.highlight-background {
          font-size: 2rem;
        }
      }

      header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
      }
    }
  }

  div {
    background-color: var(--white);
    padding: 1.5rem 2rem;
    border-radius: 0.5rem;
    color: var(--background);
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        font-size: 1.5rem;
        @media screen and (max-width: 768px) {
          font-size: 1rem;
        }
      }
    }

    strong {
      @media screen and (max-width: 768px) {
        font-size: 1.5rem;
      }

      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 600;
      line-height: 3rem;
    }

    img {
      width: 3rem;
      height: 3rem;
    }

    &.highlight-background {
      background-color: var(--quaternary);
      color: var(--background);

      img {
        width: 3rem;
        height: 3rem;
      }
    }
  }
`
