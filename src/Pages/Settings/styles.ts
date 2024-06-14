import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

export const UserInformation = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 40px;

  @media (max-width: 940px) {
    flex-direction: column;
  }
`

export const Form = styled.form`
  width: 100%;
  margin-bottom: 20px;
`

export const Section = styled.div`
  width: 100%;
  margin-bottom: 20px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 10px;
    font-size: 1.5rem;
    color: #333;
  }
`

export const InputGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-size: 1rem;
    color: #555;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s;

    &:focus {
      border-color: var(--primary);
    }
  }

  &.flex {
    display: flex;
    align-items: center;

    input {
      flex: 1;
    }

    button {
      margin-left: 10px;
    }
  }
`

export const Button = styled.button`
  padding: 10px 20px;
  background-color: var(--primary);
  color: var(--white);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--secondary);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

export const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 14px;
  object-fit: cover;
  border: 2px solid var(--primary);
`

export const CategoriesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

export const CategoryItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`

export const DeleteButton = styled.button`
  background-color: var(--tertiary);
  color: var(--white);
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--secondary);
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
      font-size: 1.3rem;
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

      @media (max-width: 768px) {
        font-size: 1rem;
        height: 3rem;
        margin-top: 1rem;
        padding: 0 1rem;
      }

      @media (max-width: 480px) {
        font-size: 0.8rem;
        height: 2.5rem;
        margin-top: 0.5rem;
        padding: 0 0.8rem;
      }

      @media (max-width: 320px) {
        font-size: 0.7rem;
        height: 2rem;
        margin-top: 0.3rem;
        padding: 0 0.6rem;
      }
    }
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 14px;

  button {
    margin-left: 10px;

    &:first-child {
      margin-left: 0;
    }
  }
`
