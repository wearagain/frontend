import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "@/components/community/exchange/clothDetail/ImageSlider.tsx";
import NameInfo from "@/components/community/exchange/clothDetail/NameInfo.tsx";
import ClothNameInfo from "@/components/community/exchange/clothDetail/ClothNameInfo.tsx";
import ClothDetailInfo from "@/components/community/exchange/clothDetail/ClothDetailInfo.tsx";
import ClothDetailFunction from "@/components/community/exchange/clothDetail/ClothDetailFooter.tsx";
import DetailBottomBar from "@/components/community/exchange/clothDetail/DetailBottomBar.tsx";
import { useGetExchangeDetail } from "@/hooks/exchange/useGetExchangeDetail.ts";
import StatusHandler from "@/components/common/StatusHandler.tsx";

const ClothDetailPage = () => {
  const { clothesId } = useParams<{ clothesId: string }>();
  const { data, isLoading, isError, error } = useGetExchangeDetail(clothesId);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (data?.clothingDetail?.images) {
      setImages(data.clothingDetail.images);
    }
  }, [data]);

  // URL 파라미터의 clothesId를 clothingDetail에 확실히 포함 (API 응답에 id가 없을 경우를 대비)
  const clothingDetailWithId =
    data && clothesId
      ? {
          ...data.clothingDetail,
          id: clothesId, // URL 파라미터의 clothesId를 우선 사용
        }
      : data?.clothingDetail;

  return (
    <StatusHandler isLoading={isLoading} isError={isError} error={error}>
      {data && clothingDetailWithId && (
        <div className='relative bottombar-p'>
          {images.length > 0 && <ImageSlider images={images} />}
          <NameInfo name={data.clothingDetail.repairerName} />
          <div className='divider' />
          <ClothNameInfo
            isLiked={data.isLikedByUser}
            category={data.clothingDetail.category}
            name={data.clothingDetail.name}
            likeCount={data.clothingDetail.likeCount}
          />
          <div className='divider' />
          <ClothDetailInfo
            clothingNumber={data.clothingDetail.clothingNumber}
            gender={data.clothingDetail.gender}
            size={data.clothingDetail.size}
            material={data.clothingDetail.material}
            issueDescription={data.clothingDetail.issueDescription}
          />
          <ClothDetailFunction />
          <DetailBottomBar
            id={clothingDetailWithId.id}
            isLiked={data.isLikedByUser}
            clothingDetail={clothingDetailWithId}
          />
        </div>
      )}
    </StatusHandler>
  );
};

export default ClothDetailPage;
