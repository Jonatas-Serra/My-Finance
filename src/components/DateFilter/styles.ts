import styled from 'styled-components'

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

export const InputDate = styled.input`
  width: 100%;
  padding: 10px;
  padding-right: 40px;
  border: 1px solid var(--gray);
  border-radius: 5px;
  cursor: pointer;
`

export const IconWrapper = styled.div`
  position: absolute;
  right: 15px;
  pointer-events: none;
  display: flex;
  align-items: center;
`

export const DatePickerWrapper = styled.div`
  position: absolute;
  z-index: 1000;
  .custom-date-range-picker {
    position: absolute;
    top: calc(100% + 5px);
    left: 50%;
    transform: translateX(-20%);
  }
`
