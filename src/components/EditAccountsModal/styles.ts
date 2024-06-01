import styled from 'styled-components'

export const Container = styled.form`
  h2 {
    color: var(--background);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input,
  select {
    background-color: transparent;
    border: 1px solid var(--background);
    border-radius: 0.25rem;
    color: var(--background);
    font-size: 1rem;
    font-weight: 400;
    height: 4rem;
    padding: 0 1.5rem;
    width: 100%;
    transition: border-color 0.6s;

    &:focus {
      border: 1px solid var(--secondary);
    }

    &::placeholder {
      color: var(--background);
    }

    & + input {
      margin-top: 1rem;
    }
  }

  select {
    margin-top: 1rem;
  }

  button[type='submit'] {
    background-color: var(--secondary);
    border: 0;
    border-radius: 0.25rem;
    color: var(--white);
    font-size: 1.5rem;
    font-weight: 600;
    height: 4rem;
    margin-top: 1.5rem;
    padding: 0 1.5rem;
    transition: filter 0.2s;
    width: 100%;

    &:hover {
      filter: brightness(0.9);
    }
  }

  .flex {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 1rem;

    input + input {
      margin-left: 1rem;
      margin-top: 0;
    }

    select {
      margin-top: 0;
      margin-left: 1rem;
    }

    .category {
      margin-top: 0;
      margin-left: 0;
    }
  }

  button {
    background-color: var(--tertiary);
    border: 0;
    border-radius: 0.25rem;
    color: var(--white);
    font-size: 1.5rem;
    font-weight: 600;
    height: 4rem;
    margin-top: 1.5rem;
    padding: 0 1.5rem;
    transition: filter 0.2s;
    width: 100%;

    &:hover {
      filter: brightness(0.9);
    }
  }

  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    gap: 0.5rem;

    button {
      background-color: var(--tertiary);
      border: 0;
      border-radius: 0.25rem;
      color: var(--white);
      font-size: 1.5rem;
      font-weight: 600;
      height: 4rem;
      margin-top: 1.5rem;
      padding: 0 1.5rem;
      transition: filter 0.2s;
      width: 100%;

      &:hover {
        filter: brightness(0.9);
      }
    }

    button[type='submit'] {
      background-color: var(--secondary);
    }
  }
`
