import { useState } from "react";
import type { MyTakenClothingResponse } from "@/types/apply.ts";

import { Button } from "@/components/ui/button";
import { X, ChevronDown } from "lucide-react";

// 교환 이력 모달 결과 타입
export interface ExchangeHistoryResult {
  hasHistory: boolean;
  clothingCode: string | null;
}

interface ExchangeHistoryProps {
  itemName: string;
  itemCount: number;
  exchangedClothings: MyTakenClothingResponse[];
  onConfirm: (result: ExchangeHistoryResult) => void;
  onClose: () => void;
}

type HistorySelection = "yes" | "no" | null;

export default function ExchangeHistoryModal({
  itemName,
  itemCount,
  exchangedClothings,
  onConfirm,
  onClose,
}: ExchangeHistoryProps) {
  const [historySelection, setHistorySelection] = useState<HistorySelection>(null);
  const [selectedClothingCode, setSelectedClothingCode] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const hasExchangedClothings = exchangedClothings.length > 0;
  const isConfirmEnabled =
    historySelection === "no" || (historySelection === "yes" && selectedClothingCode !== null);

  // 교환 이력 관련 텍스트
  const renderStatusText = () => {
    if (historySelection === null) return "교환 이력 선택";
    if (historySelection === "no") return "교환 이력 없음";
    if (historySelection === "yes" && selectedClothingCode) {
      return (
        <span className='flex items-center gap-1'>
          교환 이력 있음
          <span className='w-0.5 h-0.5 rounded-full bg-[#D9D9D9]' />
          {selectedClothingCode}
        </span>
      );
    }
    return "교환 이력 있음";
  };

  const handleConfirm = () => {
    onConfirm({
      hasHistory: historySelection === "yes",
      clothingCode: selectedClothingCode,
    });
  };

  const handleHistorySelect = (selection: HistorySelection) => {
    setHistorySelection(selection);
    if (selection === "no") {
      setSelectedClothingCode(null);
    }
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-end justify-center z-50'>
      <div className='bg-white w-full max-w-[430px] rounded-t-2xl animate-slide-up'>
        <div className='px-5 pt-6'>
          <h2 className='mb-6'>21%파티에서 교환했던 옷인가요?</h2>

          {/* 예/아니요 버튼 */}
          <div className='flex gap-3 mb-5'>
            <Button
              onClick={() => handleHistorySelect("yes")}
              disabled={!hasExchangedClothings}
              className={`flex-1 h-14 text-base border transition-colors ${
                historySelection === "yes"
                  ? "border-[var(--color-mint-light)] text-[var(--color-mint-light)] bg-[#E8F7F5]"
                  : !hasExchangedClothings
                    ? "bg-[#E4E4E4] border-[#E4E4E4] text-[#939396] cursor-not-allowed"
                    : "bg-white border-[#E0E2E4] text-[#939396]"
              }`}
            >
              예
            </Button>
            <Button
              onClick={() => handleHistorySelect("no")}
              className={`flex-1 h-14 text-base border transition-colors ${
                historySelection === "no"
                  ? "border-[var(--color-mint-light)] text-[var(--color-mint-light)] bg-[#E8F7F5]"
                  : "bg-white border-[#E0E2E4] text-[#939396]"
              }`}
            >
              아니요
            </Button>
          </div>

          {/* 의류코드 드롭다운 */}
          {historySelection === "yes" && (
            <div className='relative mb-8'>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className='w-full h-fit p-4 border border-[#E0E2E4] rounded-lg flex items-center justify-between text-left'
              >
                <span
                  className={selectedClothingCode ? "font-bold" : "font-semibold text-[#939396]"}
                >
                  {selectedClothingCode || "의류코드를 선택해 주세요"}
                </span>
                <ChevronDown className={`w-5 h-5 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-[#E0E2E4] rounded-lg shadow-lg z-10 max-h-32 overflow-y-auto custom-scroll'>
                  {exchangedClothings.map((clothing) => (
                    <button
                      key={clothing.takenClothingNumber}
                      onClick={() => {
                        setSelectedClothingCode(clothing.takenClothingNumber);
                        setIsDropdownOpen(false);
                      }}
                      className='w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors'
                    >
                      {clothing.imageUrls?.[0] && (
                        <img
                          src={clothing.imageUrls[0]}
                          alt={clothing.subCategory}
                          className='w-12 h-12 rounded-lg object-cover'
                        />
                      )}
                      <div className='text-left'>
                        <p className='font-bold text-[#222222]'>{clothing.takenClothingNumber}</p>
                        <p className='flex gap-1 items-center text-sm text-[#555558]'>
                          {clothing.subCategory}
                          <span className='w-0.5 h-0.5 rounded-full bg-[#D9D9D9]' />
                          {clothing.takenPartyTitle}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 선택된 아이템 표시 */}
        <div className='px-5 pt-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='font-bold text-[#222222]'>
                {itemName} {itemCount}
              </p>
              <p className='text-sm text-[#555558] font-medium'>{renderStatusText()}</p>
            </div>
            <button onClick={onClose}>
              <X className='w-6 h-6' />
            </button>
          </div>
        </div>

        {/* 확인 버튼 */}
        <div className='p-5 pb-8'>
          <Button
            onClick={handleConfirm}
            disabled={!isConfirmEnabled}
            className='w-full h-12 text-base font-semibold'
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
