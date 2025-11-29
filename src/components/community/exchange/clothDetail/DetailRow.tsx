interface DetailRowProps {
  label: string;
  detail: string;
}

export default function DetailRow({ label, detail }: DetailRowProps) {
  return (
    <div className='min-w-max flex gap-5 items-start text-start min-h-5'>
      <p className='font-medium min-w-[50px]'>{label}</p>
      <p className='text-[#555558] text-wrap'>{detail}</p>
    </div>
  );
}
