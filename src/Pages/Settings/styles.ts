import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  padding: 20px;

  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      margin-left: 10px;
    }
  }
`

export const UserInformation = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 40px;

  @media (max-width: 1000px) {
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

  h2 {
    margin-bottom: 10px;
  }
`

export const InputGroup = styled.div`
  margin-bottom: 10px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .mt-1 {
    margin-top: 2rem;
  }
`

export const Button = styled.button`
  padding: 9px 20px;
  background-color: var(--primary);
  color: var(--white);
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: var(--secondary);
  }
`
export const ProfilePictureArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ProfilePicture = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-top: 14px;
  object-fit: cover;

  @media (max-width: 940px) {
    width: 250px;
    height: 250px;
  }
`

export const CategoriesList = styled.ul`
  list-style: none;
  padding: 0;
`

export const CategoryItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #ccc;
`

export const DeleteButton = styled.button`
  background-color: var(--tertiary);
  color: var(--white);
  border: none;
  padding: 5px 10px;
  cursor: pointer;

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
  margin-top: 10px;

  button {
    margin: 0 10px;
  }
`
