import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RejectionReasonForm } from "./RejectionReasonForm";
import { useInspectClothing } from "@/hooks/inspection/useInspectClothing";
import { getCategoryLabel } from "@/constants/inspectionConstants";
import type {
  InspectionScanResponse,
  InspectionClothingItem,
  InspectionStatus,
} from "@/types/inspection";
import defaultImage from "@/assets/images/default.png";
import ImageViewer from "@/components/qr-checkin/ImageViewer.tsx";

interface InspectionViewProps {
  data: InspectionScanResponse;
  onClose: () => void;
  onComplete: () => void;
}

export interface InspectionResult {
  clothingNumber: string;
  status: InspectionStatus;
  reason?: string;
}

export const InspectionView = ({ data, onClose, onComplete }: InspectionViewProps) => {
  // 각 아이템의 검수 상태 관리
  const [itemStatuses, setItemStatuses] = useState<InspectionClothingItem[]>(data?.clothingItems ?? []);

  // 반려 사유 입력 폼 상태
  const [rejectionItem, setRejectionItem] = useState<InspectionClothingItem | null>(null);

  // API 호출 중인 아이템
  const [loadingItem, setLoadingItem] = useState<string | null>(null);

  // 검수 mutation hook
  const inspectMutation = useInspectClothing();

  // 승인 처리 - API 호출
  const handleApprove = async (item: InspectionClothingItem) => {
    setLoadingItem(item.clothingNumber);

    try {
      await inspectMutation.mutateAsync({
        participantId: data.participantId,
        clothingNumber: item.clothingNumber,
        status: "APPROVED",
        reason: "",
      });

      setItemStatuses((prev) =>
        prev.map((p) =>
          p.clothingNumber === item.clothingNumber
            ? { ...p, inspectionStatus: "APPROVED", inspectionReason: null }
            : p
        )
      );

    } catch (error) {
      console.error("승인 처리 실패:", error);
      alert("승인 처리 중 오류가 발생했습니다.");
    } finally {
      setLoadingItem(null);
    }
  };

  // 반려 버튼 클릭 - 사유 입력 폼 열기
  const handleRejectClick = (item: InspectionClothingItem) => {
    setRejectionItem(item);
  };

  // 반려 처리 (사유 포함) - API 호출
  const handleRejectConfirm = async (reason: string) => {
    if (!rejectionItem) return;

    setLoadingItem(rejectionItem.clothingNumber);

    try {
      await inspectMutation.mutateAsync({
        participantId: data.participantId,
        clothingNumber: rejectionItem.clothingNumber,
        status: "REJECTED",
        reason,
      });

      setItemStatuses((prev) =>
        prev.map((item) =>
          item.clothingNumber === rejectionItem.clothingNumber
            ? {
              ...item,
              inspectionStatus: "REJECTED",
              inspectionReason: reason,
            }
            : item
        )
      );

      setRejectionItem(null);
    } catch (error) {
      console.error("반려 처리 실패:", error);
      alert("반려 처리 중 오류가 발생했습니다.");
    } finally {
      setLoadingItem(null);
    }
  };

  // 완료하기 - QR 스캔 페이지로 이동
  const handleComplete = () => {
    onComplete();
  };

  // 모든 아이템이 처리되었는지 확인
  const allItemsProcessed = itemStatuses.every(
    (item) => item.inspectionStatus !== null
  );


  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log(data);


  // 반려 사유 입력 폼이 열려있으면 그 화면 표시
  if (rejectionItem) {
    return (
      <RejectionReasonForm
        item={rejectionItem}
        onBack={() => setRejectionItem(null)}
        onSubmit={handleRejectConfirm}
        isLoading={loadingItem === rejectionItem.clothingNumber}
      />
    );
  }


  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center gap-2 p-4 border-b border-gray-100">
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold">검수하기</h1>
      </div>

      {/* 컨텐츠 */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* 신청 품목 정보 */}
        <div className="mb-4">
          <span className="text-base font-medium">신청 품목 정보 </span>
          <span className="text-[var(--color-purple-dark)] font-semibold">
            {data.clothingItems.length}
          </span>
        </div>

        {/* 의류 아이템 리스트 */}
        <div className="flex flex-col gap-6">
          {data.clothingItems.map((item, index) => {
            const isLoading = loadingItem === item.clothingNumber;

            return (
              <div key={item.clothingNumber} className="flex gap-4">
                {/* 이미지 */}
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    onClick={() => {
                      setViewerImages(item.imageUrls ?? []);
                      setCurrentIndex(0);
                      setViewerOpen(true);
                    }}
                    src={item.imageUrls?.[0] || defaultImage}
                    alt={`${getCategoryLabel(item.category)} ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = defaultImage;
                    }}
                  />
                </div>

                {/* 정보 */}
                <div className="flex flex-col flex-1">
                  <h3 className="font-medium text-gray-900">
                    {getCategoryLabel(item.category)} {index + 1}
                  </h3>
                  <p className="text-sm text-gray-500">
                    의류코드{" "}
                    <span className="text-[var(--color-purple-dark)]">{item.clothingNumber}</span>
                  </p>

                  {/* 승인/반려 버튼 */}
                  <div className="flex gap-2 mt-auto">
                    {item?.inspectionStatus == "APPROVED"
                      ? <div className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors
                    bg-[var(--color-purple-dark)] text-white border-[var(--color-purple-dark)]">승인</div>
                      : <Button
                        onClick={() => handleApprove(item)}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors`}
                        disabled={ isLoading || !!item?.inspectionStatus}
                        theme="purple"
                      >
                        {isLoading ? "처리중..." : "승인"}
                      </Button>
                    }

                    {item?.inspectionStatus == "REJECTED"
                      ? <div className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors
                    bg-[var(--color-purple-dark)] text-white border-[var(--color-purple-dark)]">반려</div>
                      : <Button
                        onClick={() => handleRejectClick(item)}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors`}
                        disabled={ isLoading || !!item?.inspectionStatus}
                        theme="purple"
                      >
                        반려
                      </Button>
                    }

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 완료하기 버튼 */}
      <div className="p-4 border-t border-gray-100">
        <Button
          onClick={handleComplete}
          disabled={!allItemsProcessed}
          className={`w-full py-4 rounded-xl text-white ${
            allItemsProcessed
              ? "bg-[var(--color-purple-dark)] hover:bg-[var(--color-purple-light)]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          완료하기
        </Button>
      </div>
      {viewerOpen && (
        <ImageViewer
          images={viewerImages}
          index={currentIndex}
          onChange={setCurrentIndex}
          onClose={() => setViewerOpen(false)}
        />
      )}

    </div>
  );
};
