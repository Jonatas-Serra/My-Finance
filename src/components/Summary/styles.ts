import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -10rem;


  max-width: 1120px;
  width: 100%;
  
  
  div {
    background-color: var(--quinary);
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: var(--white);
    
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        font-size: 1.5rem;
      }
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 600;
      line-height: 3rem;
    }
    
    img {
    width: 3rem;
      height: 3rem;
    }

    &.highlight-background {
      background-color: var(--quaternary);
      color: var(--background);
    }
  }
`;

