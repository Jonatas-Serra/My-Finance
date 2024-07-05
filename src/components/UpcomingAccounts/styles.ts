import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 1485px) {
    flex-direction: column;
  }
`

export const TableContainer = styled.div`
  flex: 1;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;

  h3 {
    margin-bottom: 16px;
    color: var(--text);
  }

  @media (max-width: 1060px) {
    display: none;
  }
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const TableHeader = styled.th`
  text-align: left;
  padding: 8px;
  color: var(--background);
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
`

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: var(--light-gray);
  }
`

export const TableCell = styled.td`
  padding: 8px;
  border-bottom: 1px solid var(--light-gray);
  color: var(--text);
`

export const Actions = styled.div`
  display: flex;
  gap: 8px;
`

export const Button = styled.button`
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  color: var(--white);
`

export const PayButton = styled(Button)`
  background-color: var(--secondary);
`

export const ReceiveButton = styled(Button)`
  background-color: var(--secondary);
`

export const EditButton = styled(Button)`
  background-color: var(--primary);
`

export const DeleteButton = styled(Button)`
  background-color: var(--tertiary);
`

export const CardContainer = styled.div`
  display: none;

  @media (max-width: 1060px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`

export const Card = styled.div`
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  position: relative;
`

export const CardHeader = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`

export const CardContent = styled.div`
  p {
    margin: 4px 0;
  }
`

export const CardBanner = styled.div<{ type: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: ${({ type }) =>
    type === 'payable' ? 'var(--tertiary)' : 'var(--secondary)'};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`

export const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: var(--primary);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
  margin: 20px auto;
`
