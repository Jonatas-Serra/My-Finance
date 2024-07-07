import { useState, useRef, useEffect } from 'react'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { ptBR } from 'date-fns/locale'
import { FiCalendar } from 'react-icons/fi'
import {
  InputDate,
  DatePickerWrapper,
  InputWrapper,
  IconWrapper,
} from './styles'
import './DateFilter.css'

interface DateFilterProps {
  onDateChange: (range: any) => void
  initialRange: { startDate: string; endDate: string; key: string }
}

export function DateFilter({ onDateChange, initialRange }: DateFilterProps) {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(initialRange.startDate),
      endDate: new Date(initialRange.endDate),
      key: 'selection',
    },
  ])
  const [showPicker, setShowPicker] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  const handleSelect = (ranges: any) => {
    const newRange = {
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
      key: 'selection',
    }
    setDateRange([newRange])
    onDateChange({
      startDate: newRange.startDate.toISOString().split('T')[0],
      endDate: newRange.endDate.toISOString().split('T')[0],
      key: newRange.key,
    })
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target as Node)
    ) {
      setShowPicker(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div>
      <InputWrapper>
        <InputDate
          type="text"
          value={`${new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(dateRange[0].startDate))} - ${new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(dateRange[0].endDate))}`}
          onClick={() => setShowPicker(!showPicker)}
          readOnly
        />
        <IconWrapper>
          <FiCalendar />
        </IconWrapper>
      </InputWrapper>
      {showPicker && (
        <DatePickerWrapper ref={pickerRef}>
          <DateRangePicker
            ranges={dateRange}
            onChange={handleSelect}
            locale={ptBR}
            showDateDisplay={false}
            className="custom-date-range-picker"
            weekdayDisplayFormat="EEEEEE"
          />
        </DatePickerWrapper>
      )}
    </div>
  )
}
