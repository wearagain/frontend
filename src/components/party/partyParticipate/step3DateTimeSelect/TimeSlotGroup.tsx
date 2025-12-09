interface TimeSlotGroupProps {
  title: string;
  slots: string[];
  selectedTime: string | null;
  onSelect: (time: string) => void;
  displayTime: (time: string) => string;
}

export default function TimeSlotGroup({
  title,
  slots,
  selectedTime,
  onSelect,
  displayTime,
}: TimeSlotGroupProps) {
  return (
    <div className='mb-5'>
      <h4 className='font-medium text-base mb-3'>{title}</h4>
      <ul className='flex flex-wrap gap-x-2 gap-y-4'>
        {slots.map((time) => (
            <li key={time} className='w-1/5 min-w-[78px]'>
              <button
                onClick={() => onSelect(time)}
                className={`py-2 px-4 border rounded-sm text-sm transition-colors w-full ${
                selectedTime === time
                  ? "bg-[#ECF9F9] text-[var(--color-mint-light)] font-semibold border-[var(--color-mint-light)]"
                  : "bg-white border-[#E9E9EC] hover:bg-[var(--color-mint-light)] hover:border-[var(--color-mint-light)] hover:text-white"
                }`}
              >
                {displayTime(time)}
              </button>
            </li>
        ))}
      </ul>
    </div>
  );
}
