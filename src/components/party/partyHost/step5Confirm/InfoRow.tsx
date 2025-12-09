interface InfoRowProps {
  label: string;
  value: string | number;
}

export default function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className='flex items-baseline'>
      <span className='w-[100px] shrink-0 text-[#939396] text-sm'>{label}</span>
      <span className='text-[#222222] text-sm'>{value}</span>
    </div>
  );
}
