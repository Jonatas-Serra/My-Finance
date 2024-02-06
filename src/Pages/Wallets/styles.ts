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
    margin: 20px 20px 0 20px;
  }
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

export const WalletsContent = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  gap: 20px;

  .wallet {
    width: 200px;
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
`;
