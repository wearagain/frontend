interface NameInfoProps {
  name: string;
  image?: string;
}

export default function NameInfo({ name, image }: NameInfoProps) {
  return (
    <div className='main-inner flex gap-2 py-5 items-center'>
      {/* 프로필 사진 */}
      <div className='w-6 h-6 rounded-full bg-gray-200' />
      <p className='font-medium text-base'>{name}</p>
    </div>
  );
}
