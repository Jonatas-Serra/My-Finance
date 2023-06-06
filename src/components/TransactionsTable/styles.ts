import styled from "styled-components";

export const Container = styled.div`
  @media screen and (max-width: 660px) {
    overflow-x: scroll;

    &.deposit {
      color: var(--quaternary);
      padding: 0.5rem 1rem;
    }

    &.withdraw {
      color: var(--tertiary);
      padding: 0.5rem 1rem;
    }

  }


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

      
      
      button {
        background: transparent;
        border: 0;
        transition: filter 0.2s;

        &:hover {
          filter: brightness(0.8);
        }
      }

      img {
        width: 1.8rem;
        height: 1.8rem;
      }
    }
  }
  .actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
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
      color: var(--white);
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
