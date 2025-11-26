import { useGoClothDetail } from "@/hooks/community/useGoClothDetail.ts";

interface InfoProps {
  name: string;
  likeCount: number;
  id: string;
  repairerName?: string;
}

export default function ThumbnailInfo(item: InfoProps) {
  const goClothDetail = useGoClothDetail();

  return (
    <div className='flex flex-col gap-1'>
      {item.repairerName && (
        <p onClick={() => goClothDetail(item.id)} className='font-medium text-sm'>
          {item.repairerName}
        </p>
      )}
      <p className={`${item.repairerName && "text-base"}`} onClick={() => goClothDetail(item.id)}>
        {item.name}
      </p>
      <p className='text-[#939396] text-s'>찜 {item.likeCount}</p>
    </div>
  );
}
