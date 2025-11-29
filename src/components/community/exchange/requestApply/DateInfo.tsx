import { useFormContext, useWatch } from "react-hook-form";
import SectionTitle from "@/components/community/exchange/requestApply/SectionTitle.tsx";
import { Calendar } from "@/components/ui/calendar.tsx";
import { useMemo } from "react";

export default function DateInfo() {
  const { setValue, register } = useFormContext();
  const date = useWatch({ name: "date" });

  const handleSelect = (selectedDate: Date | undefined) => {
    setValue("date", selectedDate || null, { shouldValidate: true, shouldDirty: true });
  };

  const parseTime = (dateTimeString: string) => {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();

    const totalMinutes = hours * 60 + minutes;
    return { date: dateTime, totalMinutes };
  };

  const openAt = "2025-11-29T09:00:00";
  const closeAt = "2025-11-29T18:00:00";

  const { date: openDate } = useMemo(() => parseTime(openAt), [openAt]);
  const { date: closeDate } = useMemo(() => parseTime(closeAt), [closeAt]);

  // 오늘 기준 내일부터 선택 가능하게 처리
  const calendarDisabled = useMemo(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // 오픈 날짜와 내일 중 더 나중 날짜가 startDate
    const startDate = openDate > tomorrow ? openDate : tomorrow;

    return {
      before: startDate,
      after: closeDate,
    };
  }, [openDate, closeDate]);

  return (
    <div className='main-inner pr-5 pb-5 flex flex-col gap-4'>
      <SectionTitle title='수령날짜 선택' />
      <Calendar
        mode='single'
        required
        selected={date}
        onSelect={handleSelect}
        disabled={calendarDisabled}
        className='w-full'
      />
      <input type='hidden' {...register("date", { required: true })} />
    </div>
  );
}
