interface InfoSectionProps {
  title: string;
  onEdit?: () => void;
  children: React.ReactNode;
}

export default function InfoSection({ title, onEdit, children }: InfoSectionProps) {
  return (
    <div className='px-5 pb-5'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='font-semibold text-[#222222]'>{title}</h3>
        {onEdit && (
          <button className='text-sm text-[#939396] underline' onClick={onEdit}>
            수정
          </button>
        )}
      </div>
      <div className='flex flex-col gap-2'>{children}</div>
    </div>
  );
}
