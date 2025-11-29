import { useState, useEffect } from "react";
import type { RepairClothsDetail, RepairClothsDetailResponse } from "@/types/community.ts";
import { generateDummyRepairClothDetails } from "@/utils/community/dummy.ts";
import ImageSlider from "@/components/community/exchange/clothDetail/ImageSlider.tsx";
import NameInfo from "@/components/community/exchange/clothDetail/NameInfo.tsx";
import ClothNameInfo from "@/components/community/exchange/clothDetail/ClothNameInfo.tsx";
import ClothDetailInfo from "@/components/community/exchange/clothDetail/ClothDetailInfo.tsx";
import ClothDetailFunction from "@/components/community/exchange/clothDetail/ClothDetailFooter.tsx";
import DetailBottomBar from "@/components/community/exchange/clothDetail/DetailBottomBar.tsx";

const ClothDetailPage = () => {
  // TODO: useGetDetail
  const dummyResult: RepairClothsDetail = generateDummyRepairClothDetails(1)[0];

  const dummy: RepairClothsDetailResponse = {
    clothingDetail: dummyResult,
    isLikedByUser: true,
  };
  const [images, setImages] = useState<string[]>(dummyResult.images);

  useEffect(() => {
    setImages(dummyResult.images);
  }, []);

  return (
    <div className='relative'>
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
      <DetailBottomBar id={dummy.clothingDetail.id} isLiked={dummy.isLikedByUser} />
    </div>
  );
};

export default ClothDetailPage;
