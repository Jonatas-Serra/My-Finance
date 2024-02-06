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