import { useState, useEffect, useMemo } from "react";
import { generateTimeSlots, displayTime } from "@/utils/apply/timeUtils";
import { Calendar } from "../ui/calendar";
import TimeSlotGroup from "./TimeSlotGroup";

const parseTime = (dateTimeString: string) => {
  const dateTime = new Date(dateTimeString);
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  const totalMinutes = hours * 60 + minutes;
  return { date: dateTime, totalMinutes };
};

interface Props {
  onSetIsValid: (isValid: boolean) => void;
  onUpdateTempDateTime: (date: Date | null, time: string | null) => void;
  openAt: string;
  closeAt: string;
  initialDate: Date | null;
  initialTime: string | null;
}

export default function ApplyDateTimeSelctorForm({
  onSetIsValid,
  onUpdateTempDateTime,
  openAt,
  closeAt,
  initialDate,
  initialTime,
}: Props) {
  const { date: openDate, totalMinutes: openTime } = useMemo(() => parseTime(openAt), [openAt]);
  const { date: closeDate, totalMinutes: closeTime } = useMemo(() => parseTime(closeAt), [closeAt]);

  const [date, setDate] = useState<Date | undefined>(initialDate || undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(initialTime);

  const isValid = !!date && !!selectedTime;

  useEffect(() => {
    onSetIsValid(isValid);
    onUpdateTempDateTime(date || null, selectedTime);
  }, [date, selectedTime, isValid, onSetIsValid, onUpdateTempDateTime]);

  const calendarDisabled = useMemo(() => {
    const baseDisabled = { before: new Date() };
    return {
      ...baseDisabled,
      before: openDate,
      after: closeDate,
    };
  }, [openDate, closeDate]);

  const allTimeSlots = useMemo(() => {
    return generateTimeSlots(openTime, closeTime);
  }, [openTime, closeTime]);

  const morningSlots = allTimeSlots.filter((slot) => parseInt(slot.split(":")[0]) < 12);
  const afternoonSlots = allTimeSlots.filter((slot) => parseInt(slot.split(":")[0]) >= 12);

  return (
    <div className='flex flex-col min-h-full mb-32'>
      <div className='bg-white flex-shrink-0 sticky top-0 border-b-1 border-gray-100 z-10'>
        <h2 className='px-5 pt-6 mb-5'>
          파티에 참여할
          <br />
          날짜/시간을 선택해 주세요
        </h2>
      </div>
      <div className='flex-1 px-5 pb-5'>
        <div className='mt-5'>
          <h3 className='font-semibold'>날짜 선택</h3>
          <Calendar
            mode='single'
            required
            selected={date}
            onSelect={setDate}
            disabled={calendarDisabled}
            className='w-full'
          />
        </div>
        <div className='pt-6'>
          <h3 className='font-semibold pb-3'>시간 선택</h3>
          {morningSlots.length > 0 && (
            <TimeSlotGroup
              title='오전'
              slots={morningSlots}
              selectedTime={selectedTime}
              onSelect={setSelectedTime}
              displayTime={displayTime}
            />
          )}

          {afternoonSlots.length > 0 && (
            <TimeSlotGroup
              title='오후'
              slots={afternoonSlots}
              selectedTime={selectedTime}
              onSelect={setSelectedTime}
              displayTime={displayTime}
            />
          )}
        </div>
      </div>
    </div>
  );
}
