import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import AlertItem from "@/components/party/partyParticipate/step4InfoCheck/AlertItem.tsx";
import AppliedItem from "@/components/party/partyParticipate/step4InfoCheck/AppliedItem.tsx";
import { StatusBadge } from "@/components/party/partyApplyDetail/StatusBadge.tsx";
import { CollapsibleSection } from "@/components/party/partyApplyDetail/CollapsibleSection.tsx";
import { formatDateTimeFullKR, formatDateKR } from "@/utils/formatDate";
import { useCancelParticipation } from "@/hooks/party/useApply";
import type { PartyParticipantResponse, ClothingItemResponse } from "@/types/apply";
import type { ClothingCategoryCode, MainCategory } from "@/types/clothingCategory";

interface ParticipateDetailViewProps {
  data: PartyParticipantResponse;
}

const formatClothingItems = (clothingItems: ClothingItemResponse[]) => {
  return clothingItems.map((item) => ({
    item: {
      code: item.mainCategory as ClothingCategoryCode,
      mainCategory: item.mainCategory as MainCategory,
      subCategory: item.subCategory,
      count: 1,
      clothingNumbers: [item.clothingNumber || null],
      itemId: item.clothingNumber || "",
      itemName: item.subCategory,
    },
    itemInfo: { images: item.imageUrls || [], description: item.description },
  }));
};

export const ParticipateDetailView = ({ data }: ParticipateDetailViewProps) => {
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { mutate: cancelParticipation, isPending: isCancelling } = useCancelParticipation();

  const { id, status, attendanceDate, appliedAt, clothingItems, partyTitle, address } = data;
  const totalItemsCount = clothingItems.length;
  const formattedItems = formatClothingItems(clothingItems);

  const handleConfirmCancel = () => {
    cancelParticipation(id, {
      onSuccess: () => {
        setShowCancelModal(false);
        navigate("/party/apply");
      },
    });
  };

  const goToQR = () => {
    navigate("/qr?type=checkin");
  }

  const renderAlert = () => {
    switch (status) {
      case "PENDING":
        return <AlertItem message='승인대기 중입니다.' className='my-5 bg-[#F4F5F6]' />;
      case "APPROVED":
        return <>
          <button className='w-full' onClick={goToQR}>
        <AlertItem icon='qr' message='QR 보기' className='my-5 bg-(--color-mint-light)' />
          </button>
        </>;
      case "REJECTED":
        return <AlertItem message='승인이 반려됐습니다.' className='my-5 bg-[#FEECEC]' />;
      default:
        return null;
    }
  };

  const renderActionButton = () => {
    if (status === "PENDING" || status === "APPROVED") {
      return (
        <Button onClick={() => setShowCancelModal(true)} className='w-full'>
          취소하기
        </Button>
      );
    }
    return null;
  };

  return (
    <div className='flex flex-col h-screen'>
      {/* 헤더 */}
      <div className='bg-white shrink-0 sticky top-0 p-5 z-10'>
        <div className='flex items-center justify-between gap-2'>
          <h2>{partyTitle}</h2>
          <StatusBadge status={status} />
        </div>
        <p className='text-[#555558] text-sm font-normal'>{address}</p>
      </div>
      <main className='flex-1 overflow-y-auto custom-scroll'>
        <div className='divider' />
        {/* 신청 정보 */}
        <div className='px-5'>
          <h3 className='mb-4'>신청 정보</h3>
          <h2 className='mb-1'>{formatDateTimeFullKR(attendanceDate)}</h2>
          <p className='mb-1'>
            교환 의류 수량 <span className='font-bold'>{totalItemsCount}벌</span>
          </p>
          <p className='text-[#939396] text-sm'>{formatDateKR(appliedAt)} 등록</p>
          <div>{renderAlert()}</div>
        </div>
        <div className='divider' />

        {/* 품목 정보 */}
        <div className='flex-1 px-5'>
          <CollapsibleSection title='신청 품목 정보' count={totalItemsCount}>
            <div className='mt-4'>
              {formattedItems.map((item) => (
                <AppliedItem
                  key={item.item.itemId}
                  item={item.item}
                  itemInfo={item.itemInfo}
                  showCode={true}
                />
              ))}
            </div>
          </CollapsibleSection>
        </div>
      </main>

      {/* 하단 버튼 */}
      <div className='flex-shrink-0 sticky bottom-0 bg-white px-5 pt-4 pb-8'>
        {renderActionButton()}
      </div>

      {/* 취소 확인 모달 */}
      {showCancelModal && (
        <Modal
          header='신청을 취소하시겠습니까?'
          confirmText={isCancelling ? "취소 중..." : "취소하기"}
          onConfirm={handleConfirmCancel}
          onClose={() => setShowCancelModal(false)}
          confirmDisabled={isCancelling}
        ></Modal>
      )}
    </div>
  );
};
