import styled from "styled-components";

export const Container = styled.form`
  h2 {
    color: var(--background);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input, select {
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
    border:  1px solid var(--secondary);
  }

  &::placeholder {
    color: var(--background);
  }

  & + input {
    margin-top: 1rem;
  }
}

.formaction {
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
  button[type="submit"] {
    background-color: var(--secondary);
  }

  }

select {
  margin-top: 1rem;
}

  button[type="submit"] {
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
  `;

export const TransactionTypeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin: 1rem 0;
  

  button {
        
  }
`;

interface RadioBoxProps {
  isActive: boolean;
}

export const RadioBox = styled.button<RadioBoxProps>`

    align-items: center;
    background-color: var(--${(props) => (props.isActive ? "primary" : "white")});
    border: 1px solid var(--background);
    border-radius: 0.25rem;
    display: flex;
    height: 4rem;
    justify-content: center;
    transition: border-color 0.6s;

    &:hover {
      background-color: var(--primary);
      
      span {
        color: var(--white);
      }
    }

    span {
      display: inline-block;
      margin-left: 1rem;
      color: var(--${(props) => (props.isActive ? "white" : "background")});
      font-size: 1rem;
      font-weight: 600;
    }
    
    img {
      height: 3rem;
      width: 3rem;
    }

    &.deposit {
      border: 1px solid var(--secondary);
    }

    &.withdraw {
      border: 1px solid var(--tertiary);
    }
`;
