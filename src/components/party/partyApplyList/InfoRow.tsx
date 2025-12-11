interface InfoRowProps {
  label: string;
  value: string | number;
  isCancelled?: boolean;
}

export const InfoRow = ({ label, value, isCancelled = false }: InfoRowProps) => (
  <div className='flex items-baseline'>
    <span className='w-[70px] shrink-0 text-[#939396] text-sm'>{label}</span>
    <span className={`font-medium line-clamp-1 ${isCancelled ? "text-[#F23F3F]" : "text-[#222222]"}`}>
      {value}
    </span>
  </div>
);
