import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { InspectionClothingItem } from "@/types/inspection";
import defaultImage from "@/assets/images/default.png";

interface RejectionReasonFormProps {
  item: InspectionClothingItem;
  onBack: () => void;
  onSubmit: (reason: string) => void;
  isLoading?: boolean;
}

// 카테고리 한글 변환
const getCategoryLabel = (category: string): string => {
  const categoryMap: Record<string, string> = {
    TOP_JACKET: "자켓",
    TOP_COAT: "코트",
    TOP_LONG_SLEEVE: "긴팔",
    TOP_SHORT_SLEEVE: "반팔",
    TOP_SLEEVELESS: "민소매",
    TOP_OTHER: "기타 상의",
    BOTTOM_PANTS: "바지",
    BOTTOM_SKIRT: "치마",
    DRESS_ONE_PIECE: "원피스",
    DRESS_TWO_PIECE: "투피스",
    ETC_SHOES: "신발",
    ETC_BAG: "가방",
    ETC_HAT: "모자",
    ETC_ACCESSORY: "액세서리",
    ETC_EYEWEAR: "안경",
  };
  return categoryMap[category] || category;
};

export const RejectionReasonForm = ({
  item,
  onBack,
  onSubmit,
  isLoading = false,
}: RejectionReasonFormProps) => {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (reason.trim() && !isLoading) {
      onSubmit(reason.trim());
    }
  };

  const isValid = reason.trim().length > 0 && !isLoading;

  return (
    <div className='fixed inset-0 z-50 bg-white flex flex-col'>
      {/* 헤더 */}
      <div className='flex items-center gap-2 p-4 border-b border-gray-100'>
        <button
          onClick={onBack}
          className='p-1 hover:bg-gray-100 rounded-full transition-colors'
        >
          <ChevronLeft size={24} className='text-gray-700' />
        </button>
        <h1 className='text-lg font-semibold'>검수하기</h1>
      </div>

      {/* 컨텐츠 */}
      <div className='flex-1 overflow-y-auto p-4'>
        {/* 안내 메시지 */}
        <div className='mb-6'>
          <h2 className='text-lg font-semibold text-gray-900'>
            해당 의류를 반려합니다.
          </h2>
          <p className='text-lg font-semibold text-gray-900'>
            사유를 입력해 주세요.
          </p>
        </div>

        {/* 의류 정보 카드 */}
        <div className='flex items-center gap-3 mb-6'>
          <div className='w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0'>
            <img
              src={item.imageUrls?.[0] || defaultImage}
              alt={getCategoryLabel(item.category)}
              className='w-full h-full object-cover'
              onError={(e) => {
                e.currentTarget.src = defaultImage;
              }}
            />
          </div>
          <div>
            <h3 className='font-medium text-gray-900'>
              {getCategoryLabel(item.category)} 1
            </h3>
            <p className='text-sm text-gray-500'>
              의류코드{" "}
              <span className='text-[var(--color-purple-dark)]'>
                {item.clothingNumber}
              </span>
            </p>
          </div>
        </div>

        {/* 사유 입력 */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            사유
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder='반려 사유'
            className='w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:border-[var(--color-purple-dark)] transition-colors'
          />
        </div>
      </div>

      {/* 반려하기 버튼 */}
      <div className='p-4 border-t border-gray-100'>
        <Button
          onClick={handleSubmit}
          disabled={!isValid || isLoading}
          className={`w-full py-4 rounded-xl text-white ${
            isValid && !isLoading
              ? "bg-[var(--color-purple-dark)] hover:bg-[var(--color-purple-light)]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {isLoading ? "처리 중..." : "반려하기"}
        </Button>
      </div>
    </div>
  );
};

