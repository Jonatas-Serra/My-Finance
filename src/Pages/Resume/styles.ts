import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--white);
`

export const SummaryContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const SummaryItem = styled.div`
  width: 48%;
  margin: 0 12px;
  padding: 24px;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 16px;
    color: var(--text);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 12px 0;
  }
`

export const ChartContainer = styled.div`
  height: 200px;
  background-color: var(--gray);
  border-radius: 8px;
`

export const WalletContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const WalletItem = styled.div`
  flex: 1;
  margin: 0 12px;
  padding: 24px;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 16px;
    color: var(--text);
  }

  @media (max-width: 768px) {
    margin: 12px 0;
  }
`

export const UpcomingContainer = styled.div`
  padding: 24px;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 16px;
    color: var(--text);
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const Button = styled.button<{ active: boolean }>`
  padding: 8px;
  margin: 0 4px;
  border: 1px solid var(--gray);
  border-radius: 4px;
  background-color: ${({ active }) =>
    active ? 'var(--primary)' : 'var(--white)'};
  color: ${({ active }) => (active ? 'var(--white)' : 'var(--text)')};
  cursor: pointer;

  @media (max-width: 768px) {
    margin: 4px 0;
  }
`
