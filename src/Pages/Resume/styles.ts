import styled from 'styled-components';

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

export const Content = styled.div`
  width: 90%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
`;


export const MainContent = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const SecondaryContent = styled.div`
  min-width: 250px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-left: 20px;

  img {
    width: 100%;
    max-width: 300px;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;
