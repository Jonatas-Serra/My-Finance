import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  @media (max-width: 375px) {
    min-width: 440px;
  
  }

`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    margin: 20px;
  }
`;

export const Search = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;

  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  height: 40px;
  border: 1px solid var(--gray);
  border-radius: 5px;
  padding: 0 10px;
`;

export const SearchButton = styled.button`
  height: 40px;
  width: 60px;
  background-color: var(--primary);
  color: var(--white);
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AddContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

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
`;

export const PayablesTable = styled.div`
   display: flex;
  flex-direction: column;
  align-items: center;

  table {
    width: 95%;
    border-collapse: collapse;
    margin-top: 20px;

    @media (max-width: 850px) {
      th:nth-child(5), td:nth-child(5) {
        display: none;
      }
    }

    @media (max-width: 560px) {
      th:nth-child(6), td:nth-child(6) {
        display: none;
      }
    }

    th:last-child, td:last-child {
        border-top-right-radius: 5px;
      }
  }

  th {
    background-color: var(--primary);
    color: var(--white);
    padding: 10px 0;

    :first-child {
      border-top-left-radius: 5px;
    }

    :last-child {
      border-top-right-radius: 5px;
    }
  }

  td {
    padding: 10px 0;
    text-align: center;
    white-space: nowrap;
  }


  tr {
    border-bottom: 1px solid var(--quaternary);
    transition: filter 0.2s;

    :last-child {
      border-bottom: none;
    }

    :hover {
      filter: opacity(0.8);
    }
  }

  .actions {
    display: flex;
    justify-content: space-around;
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

  .check {
    color: var(--secondary);
    cursor: pointer;
    margin-left: 5px;
    transition: filter 0.2s;

    :hover {
      filter: opacity(0.8);
    }
  }

  .paid {
    color: var(--secondary);
  }

  .late {
    color: var(--tertiary);
  }

  .pending {
    color: var(--primary);
  }

  .tooltip {
      position: relative;
      display: inline-block;

      .tooltiptext {
        visibility: hidden;
        background-color: var(--background);
        color: var(--white);
        text-align: center;
        border-radius: 5px;
        padding: 5px;
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 50%;
        margin-left: -120px;
        opacity: 0;
        transition: opacity 0.2s;
        font-size: 12px;
      }

      :hover .tooltiptext {
        visibility: visible;
        opacity: 1;
      }
    }
  
`;

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
      
  `;

export const ContentModalPaid = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
  
  h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: var(--secondary);
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
    color: var(--secondary);

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
    margin-top: 1rem;

    &:focus {
      border:  1px solid var(--secondary);
    }

    &::placeholder {
      color: var(--background);
    }

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

  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;  
  }

  .block {
    display: block;
    flex-direction: column;
    width: 45%;
    white-space: nowrap;
  
  }

}
    
`;

export const Spinner = styled.div`
border: 4px solid rgba(0, 0, 0, 0.1);
border-left-color: var(--primary);
border-radius: 50%;
width: 50px;
height: 50px;
animation: ${spin} 1s linear infinite;
margin: 20px auto;
`;

