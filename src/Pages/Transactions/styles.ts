import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
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

export const TransactionsTable = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  table {
    width: 95%;
    border-collapse: collapse;
    margin-top: 20px;

    @media (max-width: 830px) {
      th:nth-child(3), td:nth-child(3) {
        display: none;
      }

      th:nth-child(5), td:nth-child(5) {
        display: none;
      }

      th:last-child, td:last-child {
        border-top-right-radius: 5px;
      }
    }

    @media (max-width: 560px) {
      th:nth-child(6), td:nth-child(6) {
        display: none;
      }
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
  
`;
