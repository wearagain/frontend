interface DetailRowProps {
  label: string;
  detail: string;
}

export default function DetailRow({ label, detail }: DetailRowProps) {
  return (
    <div className='flex gap-4 items-start text-start min-h-5'>
      <p className='font-medium w-[60px] flex-shrink-0 text-start text-[#939396]'>{label}</p>
      <p className='text-wrap break-all flex-1'>{detail}</p>
    </div>
  );
}
