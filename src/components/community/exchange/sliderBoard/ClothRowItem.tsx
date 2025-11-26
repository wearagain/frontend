import type { ThumbnailItem } from "@/types/community.ts";
import Thumbnail from "@/components/community/common/Thumbnail.tsx";
import ThumbnailInfo from "@/components/community/common/ThumbnailInfo.tsx";

export default function ClothRowItem(item: ThumbnailItem) {
  return (
    <div className='flex flex-col gap-1'>
      <Thumbnail isLiked={item.isLikedByUser} id={item.id} />
      <ThumbnailInfo name={item.name} likeCount={item.likeCount} id={item.id} />
      {/*<img src={item.thumbnailUrl} alt={item.id}/>*/}
    </div>
  );
}
