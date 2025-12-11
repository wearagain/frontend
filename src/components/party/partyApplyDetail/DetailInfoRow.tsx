interface DetailInfoRowProps {
  label: string;
  value: string | number;
}

export default function InfoRow({ label, value }: DetailInfoRowProps) {
  return (
    <div className='grid grid-cols-[120px_1fr] items-baseline'>
      <span className='font-medium'>{label}</span>
      <span className='text-[#555558]'>{value}</span>
    </div>
  );
}
