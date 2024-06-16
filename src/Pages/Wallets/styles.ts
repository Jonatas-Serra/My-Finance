import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
`

export const AddContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;

  @media (max-width: 440px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5px;

    button {
      width: 50%;
      margin: 0 auto;
    }

    button + button {
      margin-top: 10px;
    }
  }
`

export const AddButton = styled.button`
  height: 40px;
  background-color: var(--primary);
  color: var(--white);
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  padding: 0 10px;
`

export const WalletsContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 14px;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .wallet {
    width: 240px;
    height: 200px;
    background-color: var(--quinary);
    color: var(--white);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    cursor: pointer;
    transition: 0.2s;

    h2 {
      margin: 10px 0;
    }

    &:hover {
      filter: opacity(0.9);
    }

    @media (max-width: 440px) {
      width: 180px;
      height: 150px;
      margin: 5px 0;
    }
  }

  .actions {
    display: flex;
    justify-content: space-around;
    width: 30%;
    margin-top: 10px;
  }

  .edit {
    color: var(--primary);
    cursor: pointer;
    transition: filter 0.2s;

    :hover {
      filter: opacity(0.8);
    }
  }

  .delete {
    color: var(--tertiary);
    cursor: pointer;
    margin-left: 5px;
    transition: filter 0.2s;

    :hover {
      filter: opacity(0.8);
    }
  }
`

export const ContentModalDelete = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: var(--tertiary);
  }

  img {
    width: 5rem;
    height: 5rem;
  }

  p {
    margin-bottom: 1rem;
    font-size: 1rem;
    color: var(--background);
  }

  strong {
    font-size: 1.2rem;
    color: var(--tertiary);
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    button {
      font-size: 1.5rem;
      font-weight: 600;
      height: 4rem;
      margin-top: 1.5rem;
      padding: 0 1.5rem;
      transition: filter 0.2s;
      width: 45%;
      background-color: var(--secondary);
      color: var(--white);
      border: 0;
      border-radius: 0.25rem;

      &:hover {
        filter: brightness(0.9);
      }

      &.cancel {
        background-color: var(--tertiary);

        &:hover {
          filter: brightness(0.9);
        }
      }
    }
  }
`
