import { useState, useRef, useEffect } from 'react'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { ptBR } from 'date-fns/locale'
import './DateFilter.css'
import { InputDate, DatePickerWrapper } from './styles'

interface DateFilterProps {
  onDateChange: (range: any) => void
  initialRange: { startDate: Date; endDate: Date; key: string }
}

const adjustEndDate = (date: Date) => {
  const adjustedDate = new Date(date)
  adjustedDate.setHours(23, 59, 59, 999)
  return adjustedDate
}

export function DateFilter({ onDateChange, initialRange }: DateFilterProps) {
  const [dateRange, setDateRange] = useState([
    {
      startDate: initialRange.startDate,
      endDate: adjustEndDate(initialRange.endDate),
      key: 'selection',
    },
  ])
  const [showPicker, setShowPicker] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  const handleSelect = (ranges: any) => {
    const adjustedEndRange = adjustEndDate(ranges.selection.endDate)
    const newRange = { ...ranges.selection, endDate: adjustedEndRange }
    setDateRange([newRange])
    onDateChange(newRange)
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
      <InputDate
        type="text"
        value={`${dateRange[0].startDate.toLocaleDateString('pt-BR')} - ${dateRange[0].endDate.toLocaleDateString('pt-BR')}`}
        onClick={() => setShowPicker(!showPicker)}
        readOnly
      />
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
