import SectionTitle from "@/components/community/exchange/requestApply/SectionTitle.tsx";

interface ClothInfoProps {
  code: string;
  name?: string;
  compact?: boolean;
  imageUrl?: string | null;
}

export default function ClothInfo({ code, name, compact, imageUrl }: ClothInfoProps) {
  return (
    <div className={`${compact ? "" : "main-inner pr-5 py-5"} flex gap-4 items-start`}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name || "의류"}
          className='w-[60px] min-w-[60px] h-[60px] rounded-[10px] object-cover'
        />
      ) : (
        <div className='w-[60px] min-w-[60px] h-[60px] rounded-[10px] bg-gray-200' />
      )}
      <div className='flex min-w-max flex-col gap-[2px]'>
        <SectionTitle title={name || "수선의류명"} />
        <span className='flex gap-[6px] w-fit items-center h-[60ox]'>
          <p className='font-medium'>의류코드</p>
          <p className='font-medium'>{code}</p>
        </span>
      </div>
    </div>
  );
}
