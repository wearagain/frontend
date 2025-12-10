interface InfoRowProps {
  label: string;
  value: string | number;
}

export default function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className='grid grid-cols-[100px_1fr] items-baseline'>
      <span className='text-[#939396] text-sm'>{label}</span>
      <span className='text-[#222222] text-sm'>{value}</span>
    </div>
  );
}
