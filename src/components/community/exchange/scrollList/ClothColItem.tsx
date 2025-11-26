import type { RepairClothsResponse } from "@/types/community.ts";
import Thumbnail from "@/components/community/common/Thumbnail.tsx";
import ThumbnailInfo from "@/components/community/common/ThumbnailInfo.tsx";

export default function ClothColItem(item: RepairClothsResponse) {
  return (
    <div className='w-full flex flex-col gap-2'>
      <Thumbnail isLiked={item.isLikedByUser} id={item.clothesId} scrollDirection='y' />
      <ThumbnailInfo
        name={item.name}
        likeCount={item.likeCount}
        id={item.clothesId}
        repairerName={item.repairerName}
      />
      {/*<img src={item.thumbnailUrl} alt={item.id}/>*/}
    </div>
  );
}
