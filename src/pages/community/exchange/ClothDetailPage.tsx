import type { RepairClothsResponse } from "@/types/community.ts";

const ClothDetailPage = (item: RepairClothsResponse) => {
  return (
    <div>
      <p>
        {item.clothesId}
        {item.isLikedByUser}
        {item.thumbnailUrl}
        {item.repairerName}
        {item.name}
        {item.likeCount}
      </p>
      <div>cloth detail page</div>
    </div>
  );
};

export default ClothDetailPage;
