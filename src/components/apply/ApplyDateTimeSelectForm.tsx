import { useState, useEffect, useMemo } from "react";
// import { useApplyStore } from "@/store/useApplyStore";

import { generateTimeSlots, displayTime } from "@/utils/timeUtils";
import { Calendar } from "../ui/calendar";
import TimeSlotGroup from "./TimeSlotGroup";

// api로 불러오는 정보
const DUMMY_START_TIME = 10 * 60;
const DUMMY_END_TIME = 16 * 60;

interface Props {
  onSetIsValid: (isValid: boolean) => void;
  onUpdateTempDateTime: (date: Date | null, time: string | null) => void;
  initialDate: Date | null;
  initialTime: string | null;
}

export default function ApplyDateTimeSelctorForm({
  onSetIsValid,
  onUpdateTempDateTime,
  initialDate,
  initialTime,
}: Props) {
  // const { selectedDate: storeDate, selectedTime: storeTime, setDateTime } = useApplyStore();

  const [date, setDate] = useState<Date | undefined>(initialDate || new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(initialTime);

  const isValid = !!date && !!selectedTime;

  useEffect(() => {
    onSetIsValid(isValid);
    onUpdateTempDateTime(date || null, selectedTime);
  }, [date, selectedTime, isValid, onSetIsValid, onUpdateTempDateTime]);

  const allTimeSlots = useMemo(() => {
    return generateTimeSlots(DUMMY_START_TIME, DUMMY_END_TIME);
  }, []);

  const morningSlots = allTimeSlots.filter((slot) => parseInt(slot.split(":")[0]) < 12);
  const afternoonSlots = allTimeSlots.filter((slot) => parseInt(slot.split(":")[0]) >= 12);

  return (
    <div className='flex flex-col min-h-full mb-32'>
      <div className='bg-white flex-shrink-0 sticky top-0 border-b-1 border-gray-100 z-100'>
        <h2 className='text-lg font-semibold px-5 pt-6 mb-5'>
          파티에 참여할
          <br />
          날짜/시간을 선택해 주세요
        </h2>
      </div>
      <div className='flex-1 px-5 pb-5'>
        <div className='mt-5'>
          <h3 className='font-semibold'>날짜 선택</h3>
          {/* 오늘 이전 날짜 + 받아온 날짜 이후는 disabled */}
          <Calendar
            mode='single'
            required
            selected={date}
            onSelect={setDate}
            disabled={{ before: new Date() }}
            className='w-full'
          />
        </div>
        <div className='pt-6'>
          <h3 className='font-semibold pb-3'>시간 선택</h3>
          <TimeSlotGroup
            title='오전'
            slots={morningSlots}
            selectedTime={selectedTime}
            onSelect={setSelectedTime}
            displayTime={displayTime}
          />

          <TimeSlotGroup
            title='오후'
            slots={afternoonSlots}
            selectedTime={selectedTime}
            onSelect={setSelectedTime}
            displayTime={displayTime}
          />
        </div>
      </div>
    </div>
  );
}
