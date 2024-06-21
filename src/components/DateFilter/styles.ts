import styled from 'styled-components'

export const InputDate = styled.input`
  width: 180px;
  height: 40px;
  border: 1px solid var(--gray);
  border-radius: 5px;
  padding: 0 10px;
  text-align: center;

  color: #757575;
  font-weight: 600;
`

export const DatePickerWrapper = styled.div`
  position: relative;
  z-index: 1000;
  .custom-date-range-picker {
    position: absolute;
    top: 100%;
    left: 0;
  }
`
