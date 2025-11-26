import { useRef, useState, useEffect } from "react";
import type { RepairClothsDetail, RepairClothsDetailResponse } from "@/types/community.ts";
import { generateDummyRepairClothDetails } from "@/utils/community/dummy.ts";
import ImageSlider from "@/components/community/clothDetail/ImageSlider.tsx";
import NameInfo from "@/components/community/clothDetail/NameInfo.tsx";
import ClothNameInfo from "@/components/community/clothDetail/ClothNameInfo.tsx";
import ClothDetailInfo from "@/components/community/clothDetail/ClothDetailInfo.tsx";
import ClothDetailFunction from "@/components/community/clothDetail/ClothDetailFooter.tsx";

const ClothDetailPage = () => {
  // TODO: useGetDetail
  const dummyResult: RepairClothsDetail = generateDummyRepairClothDetails(1)[0];

  const dummy: RepairClothsDetailResponse = {
    clothingDetail: dummyResult,
    isLikedByUser: true,
  };
  const [images, setImages] = useState<string[]>(dummyResult.images);

  return (
    <div>
      <ImageSlider images={images} />
      <NameInfo name={dummyResult.repairerName} />
      <div className='divider' />
      <ClothNameInfo
        isLiked={dummy.isLikedByUser}
        category={dummyResult.category}
        name={dummyResult.name}
        likeCount={dummyResult.likeCount}
      />
      <div className='divider' />
      <ClothDetailInfo
        clothingNumber={dummyResult.clothingNumber}
        gender={dummyResult.gender}
        size={dummyResult.size}
        material={dummyResult.material}
        issueDescription={dummyResult.issueDescription}
      />
      <ClothDetailFunction />
    </div>
  );
};

export default ClothDetailPage;
