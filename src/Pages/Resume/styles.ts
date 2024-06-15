import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: var(--white);
  margin: 0 auto;
  padding: 0 16px;
  padding-bottom: 16px;
`

export const SummaryContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;

  @media (max-width: 1720px) {
    flex-direction: column;
    justify-content: center;
  }

  .it2 {
    margin-left: 0px;

    @media (min-width: 1720px) {
      margin-left: 24px;
    }
  }
`

export const SummaryItem = styled.div`
  flex: 1;
  padding: 24px;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  h2 {
    margin-bottom: 16px;
    color: var(--text);
  }

  @media (max-width: 1720px) {
    width: 100%;
    margin-bottom: 24px;
  }

  @media (max-width: 1220px) {
    width: 100%;
    margin: 12px 0;
  }
`

export const ChartContainer = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
`

export const WalletContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  .end {
    flex: 0;
  }
`

export const WalletItem = styled.div`
  flex: 1;
  margin: 12px;
  padding: 24px;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 16px;
    color: var (--text);
  }

  @media (max-width: 768px) {
    margin: 12px 0;
  }
`

export const UpcomingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 1340px) {
    flex-direction: column;
  }
`

export const UpcomingItem = styled.div`
  margin: 12px;
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--text);

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
