import styled, { css } from 'styled-components'

import { Tooltip } from '../Tooltip'

interface ContainerProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 10px;
  border: 2px solid var(--primary);
  width: 100%;
  color: var(--background);

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border: 2px solid var(--tertiary);
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: var(--quaternary);
      border: 2px solid var(--quaternary);
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: var(--primary);
    `}

  input {
    display: flex;
    font-family: 'Montserrat', sans-serif;
    flex: 1;
    background: transparent;
    color: var(--background);
    padding: 8px;
    border: 0 !important;

    &::placeholder {
      color: var(--background);
    }
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px var(--white) inset;
    -webkit-text-fill-color: var(--background);
  }

  svg {
    margin-right: 16px;
    margin-left: 8px;
    color: var(--primary);
  }
`
export const Error = styled(Tooltip)`
  height: 16px;

  svg {
    margin: 0px;
  }

  span {
    background: var(--tertiary);
    color: var(--white);

    &::before {
      border-color: var(--tertiary) transparent;
    }
  }
`
