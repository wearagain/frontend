import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import type { DateRange } from "react-day-picker";

interface PeriodSelectorProps {
  selectedRange: DateRange | undefined;
  onSelect: (range: DateRange | undefined) => void;
  onClose: () => void;
}

export const PeriodSelector = ({ selectedRange, onSelect, onClose }: PeriodSelectorProps) => {
  const [tempRange, setTempRange] = useState<DateRange | undefined>(selectedRange);

  useEffect(() => {
    setTempRange(selectedRange);
  }, [selectedRange]);

  const handleSelect = (range: DateRange | undefined) => {
    if (range) {
      setTempRange(range);
    } else {
      setTempRange(undefined);
    }
  };

  const handleApply = () => {
    onSelect(tempRange);
    onClose();
  };

  const handleReset = () => {
    setTempRange(undefined);
    onSelect(undefined);
    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-[10px] p-6 w-full max-w-[400px] flex flex-col gap-4'>
        <h3 className='text-lg font-bold'>기간 선택</h3>

        <Calendar
          mode='range'
          selected={tempRange}
          onSelect={handleSelect}
          numberOfMonths={1}
          className='w-full'
        />

        <div className='flex items-center justify-between pt-4 border-t gap-2'>
          <Button
            type='button'
            theme='mint'
            variant='muted'
            onClick={handleReset}
            className='flex-1'
          >
            초기화
          </Button>
          <Button
            type='button'
            theme='mint'
            variant='primary'
            onClick={handleApply}
            className='flex-1'
          >
            적용
          </Button>
        </div>
      </div>
    </div>
  );
};
