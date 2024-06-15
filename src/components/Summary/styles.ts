import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;

  div {
    background-color: var(--white);
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    color: var(--background);
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
    width: 220px;

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

      img {
        width: 3rem;
        height: 3rem;
      }
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 1.6rem;
      font-weight: 600;
      line-height: 3rem;
      white-space: nowrap;

      @media screen and (max-width: 768px) {
        font-size: 1.5rem;
      }
    }

    .nowp {
      white-space: nowrap;
      color: var(--tertiary);
    }

    .deposit {
      color: var(--quaternary);
    }

    @media (min-width: 1200px) and (max-width: 1919px) {
      width: 100%;
      max-width: 320px;

      header p {
        font-size: 2rem;
      }

      strong {
        font-size: 2rem;
      }
    }
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 100%;
    }
  }

  .highlight-background {
    background-color: var(--quaternary);
    color: var(--background);
  }
`
