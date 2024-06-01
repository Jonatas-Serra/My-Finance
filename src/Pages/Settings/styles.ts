import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  padding: 20px;
`

export const UserInformation = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 40px;
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
`

export const Button = styled.button`
  padding: 10px 20px;
  background-color: var(--primary);
  color: var(--white);
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: var(--secondary);
  }
`

export const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 10px;
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
