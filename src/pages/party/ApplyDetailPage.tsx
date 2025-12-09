import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AlertItem from "@/components/party/partyParticipate/step4InfoCheck/AlertItem.tsx";
import AppliedItem from "@/components/party/partyParticipate/step4InfoCheck/AppliedItem.tsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useGetParticipation } from "@/hooks/party/useApply";
import type { ParticipantStatus } from "@/types/apply";

// TODO: 뱃지 컴포넌트 분리
const StatusBadge = ({ status }: { status: ParticipantStatus }) => {
  switch (status) {
    case "PENDING":
      return <Badge variant='outline'>승인대기</Badge>;
    case "APPROVED":
      return <Badge variant='outline'>승인</Badge>;
    case "REJECTED":
      return <Badge variant='outline'>반려</Badge>;
    default:
      return null;
  }
};

const formatDate = (isoString: string) => {
  if (!isoString) return "-";
  const date = new Date(isoString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export default function ApplyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);

  const { data, isLoading } = useGetParticipation(id);
  if (isLoading || !data) return <div></div>;

  const { status, attendanceDate, appliedAt, clothingItems, partyId } = data;
  const totalItemsCount = clothingItems.length;

  const allItemsFormatted = clothingItems.map((item: any) => ({
    item: {
      code: item.mainCategory,
      subCategory: item.subCategory,
      count: 1,
      itemId: item.clothingNumber,
      itemName: `${item.subCategory}`,
    },
    itemInfo: { images: item.imageUrls || [], description: item.description },
    showCode: true,
  }));

  const renderAlert = () => {
    switch (status) {
      case "PENDING":
        return <AlertItem message='승인 대기 중입니다.' />;
      case "REJECTED":
        return <AlertItem message='승인이 반려됐습니다.' className='bg-red-100' />;
      default:
        return null;
    }
  };

  const renderActionButton = () => {
    if (status === "REJECTED") {
      return (
        <Button
          onClick={() => navigate(`/party/${partyId}/apply`)}
          className='w-full h-12 text-base font-semibold'
        >
          다시 신청하기
        </Button>
      );
    } else if (status === "PENDING" || status === "APPROVED") {
      return (
        <Button
          onClick={() => console.log("취소 요청 실행")}
          className='w-full h-12 text-base font-semibold'
        >
          취소하기
        </Button>
      );
    }
    return null;
  };

  return (
    <div className='flex flex-col justify-between h-full'>
      <div className='bg-white flex-shrink-0 sticky top-0 px-5 pt-2 pb-4 z-10'>
        <div className='flex items-center justify-between text-sm'>
          <h2 className='text-xl font-bold mb-3'>파티명 - Title</h2>
          <StatusBadge status={status} />
        </div>
        <p className='text-gray-500 text-sm mt-1'>단체 여부 체크, 주소</p>
      </div>
      <div className='divider'></div>

      {/* 신청 정보 */}
      <div className='px-5 pb-5'>
        <h3 className='text-lg font-semibold mb-5'>신청 정보</h3>
        {/* 신청 정보 내용 */}
        <p className='text-lg font-bold mb-2'>{formatDate(attendanceDate)}</p>
        <p>교환의류수량 {totalItemsCount}벌</p>
        <p className='text-sm text-gray-500 mb-2'>{formatDate(appliedAt)} 등록</p>
        {renderAlert()}
      </div>
      <div className='divider'></div>

      {/* 품목 정보 */}
      <div className='flex-1 mb-32 px-5'>
        <div
          className='flex items-center justify-between cursor-pointer'
          onClick={() => setIsDetailsOpen((p) => !p)}
        >
          <h3 className='text-lg font-bold'>신청 품목 정보 {totalItemsCount}</h3>
          {isDetailsOpen ? (
            <ChevronUp size={20} className='text-gray-500' />
          ) : (
            <ChevronDown size={20} className='text-gray-500' />
          )}
        </div>

        {isDetailsOpen && (
          <div className='mt-4 pl-3'>
            {allItemsFormatted.map((item: any) => (
              <AppliedItem
                key={item.item.itemId}
                item={item.item}
                itemInfo={item.itemInfo}
                showCode={true}
              />
            ))}
          </div>
        )}
      </div>
      <div className='fixed bottom-0 left-0 right-0 bg-white px-5 pt-5 pb-14'>
        {renderActionButton()}
      </div>
    </div>
  );
}
