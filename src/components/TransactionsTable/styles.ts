import styled from "styled-components";

export const Container = styled.div`
  margin-top: 4rem;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {  
      color: var(--white);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
      font-size: 1rem;
      
    }

    tr {
      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.8);
      }
    }

    td {
      padding: 1rem 2rem;
      background-color: var(--quinary);
      color: var(--white);

      &:first-child {
        color: var(--white);
        border-radius: 0.25rem 0 0 0.25rem;
      }

      &:last-child {
        border-radius: 0 0.25rem 0.25rem 0;
      }

      &.deposit {
        color: var(--quaternary);
      }

      &.withdraw {
        color: var(--tertiary);
      }
    }
  }
`;
