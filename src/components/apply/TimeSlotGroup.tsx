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
      <div className='flex flex-wrap justify-between gap-y-4'>
        {slots.map((time) => (
          <button
            key={time}
            onClick={() => onSelect(time)}
            className={`py-2 px-4 border rounded-sm text-sm transition-colors min-w-[78px] ${
              selectedTime === time
                ? "bg-[var(--color-mint-light)/20] text-[var(--color-mint-light)] font-semibold border-[var(--color-mint-light)]"
                : "bg-white border-gray-300 hover:bg-gray-100"
            }`}
          >
            {displayTime(time)}
          </button>
        ))}
      </div>
    </div>
  );
}
