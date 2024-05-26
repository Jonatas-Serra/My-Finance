import styled from 'styled-components'

export const Container = styled.form`
  h2 {
    color: var(--background);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  h5 {
    color: var(--background);
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

    .checkbox {
      margin-left: 1rem;
      width: 1rem;
      height: 1.5rem;
      appearance: none;
      background-color: transparent;
      border: 2px solid var(--background);
      border-radius: 0.25rem;
      cursor: pointer;
      position: relative;

      &:checked {
        background-color: var(--primary);
        border-color: var(--primary);
      }

      &:before {
        content: '';
        display: block;
        width: 1rem;
        height: 1rem;
        background-color: var(--primary);
        position: absolute;
        top: 0.35rem;
        left: 0.35rem;
        border-radius: 0.15rem;
        transform: scale(0);
        transition: transform 0.2s ease-in-out;
      }

      &:checked:before {
        transform: scale(1);
      }
    }
  }
`
