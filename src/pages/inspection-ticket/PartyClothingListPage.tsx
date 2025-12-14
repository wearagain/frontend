import { useState, useMemo, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Search, ScanQrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusHandler from "@/components/common/StatusHandler";
import { useGetPartyClothingItems } from "@/hooks/inspection/useGetPartyClothingItems";
import { useUseVoucher } from "@/hooks/inspection/useUseVoucher";
import { CLOTHING_CATEGORIES } from "@/types/clothingCategory";
import { findCategoryByCode } from "@/utils/apply/clothingUtils";
import type { ClothingCategoryCode } from "@/types/clothingCategory";
import type { PartyClothingItem } from "@/apis/inspection/getPartyClothingItems";
import defaultImage from "@/assets/images/default.png";
import { TicketScanView } from "@/components/inspection-ticket/TicketScanView";
import {FilterHeader} from "@/components/common/FilterHeader.tsx";

export default function PartyClothingListPage() {
  const { partyId } = useParams<{ partyId: string }>();

  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedClothingNumber, setSelectedClothingNumber] = useState<string | null>(null);
  const [isScanViewOpen, setIsScanViewOpen] = useState(false);
  const debounceTimerRef = useRef<number | null>(null);

  const useVoucherMutation = useUseVoucher();

  // 검색어가 2자 이상일 때만 searchKeyword로 전달
  const searchKeyword = debouncedSearchKeyword.length >= 2 ? debouncedSearchKeyword : undefined;

  const { data, isLoading, isError, error } = useGetPartyClothingItems(partyId || "", {
    searchKeyword,
  });

  // 카테고리 목록 생성 (모든 카테고리 표시)
  const filterTabs = useMemo(
      () =>
          Object.values(CLOTHING_CATEGORIES).flatMap((group) =>
              group.categories.map((cat) => ({
                label: cat.subCategory,
                value: cat.code,
              }))
          ),
      []
  );

  const filterValue = selectedCategory ?? undefined;

  // 검색 입력 핸들러 (즉시 반영, debounce로 API 호출 제어)
  const handleSearchChange = (value: string) => {
    // 입력은 즉시 반영
    setSearchQuery(value);

    // 기존 타이머 취소
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // 500ms 후에 debouncedSearchKeyword 업데이트 (API 호출 트리거)
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearchKeyword(value);
    }, 500);
  };

  // 카테고리 선택 시 검색창에 코드 자동 입력 및 API 호출
  const handleCategorySelect = (categoryCode?: string) => {
    if (!categoryCode) return;

    const isSelected = selectedCategory === categoryCode;
    if (isSelected) {
      // 이미 선택된 카테고리를 다시 클릭하면 선택 해제
      setSelectedCategory(null);
      handleSearchChange("");
    } else {
      // 카테고리 선택 시 검색창에 코드 입력 (2자이므로 자동으로 API 호출됨)
      setSelectedCategory(categoryCode);
      handleSearchChange(categoryCode);
    }
  };

  // 검색창 변경 시 카테고리 선택 해제 (검색어가 카테고리 코드와 다를 때)
  useEffect(() => {
    if (selectedCategory && searchQuery !== selectedCategory) {
      setSelectedCategory(null);
    }
  }, [searchQuery, selectedCategory]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // 필터링된 의류 목록
  const filteredItems = data ?? [];

  const handleTicketScan = (clothingNumber: string) => {
    setSelectedClothingNumber(clothingNumber);
    setIsScanViewOpen(true);
  };

  const handleScanSuccess = async (qrCode: string) => {
    try {
      // API 호출
      await useVoucherMutation.mutateAsync({
        voucherQrCode: qrCode,
        partyId: partyId || "",
        takenClothingNumber: selectedClothingNumber || undefined,
      });

      // 성공 시 의류 목록 페이지로 이동 (현재 페이지 유지)
      setIsScanViewOpen(false);
      setSelectedClothingNumber(null);
      // 쿼리 무효화로 목록 갱신
      queryClient.invalidateQueries({ queryKey: ["partyClothingItems"] });
    } catch (error) {
      // 실패 시 alert 표시하고 스캔 화면 유지
      alert("티켓 사용에 실패했습니다. 다시 시도해주세요.");
      console.error("티켓 사용 실패:", error);
    }
  };

  const handleSkip = () => {
    setSelectedClothingNumber(null);
    setIsScanViewOpen(true);
  };

  return (
    <>
      <div className='flex flex-col h-full'>
        {/* 검색 바 */}
        <div className='px-5 pt-4 pb-3'>
          <div className='relative'>
            <Search
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              size={20}
            />
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder='의류코드를 검색해 주세요'
              className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-purple-dark)]'
            />
          </div>
        </div>

        {/* 카테고리 필터 */}
        <FilterHeader value={filterValue} onChange={handleCategorySelect} tabs={filterTabs} theme={'purple'}/>

        {/* 의류 목록 (로딩 상태는 여기만 표시) */}
        <div className='flex-1 overflow-y-auto px-5 pb-24 custom-scroll'>
          <StatusHandler isLoading={isLoading} isError={isError} error={error}>
            {!searchKeyword ? (
              <div className='flex flex-col items-center justify-center h-full text-gray-400'>
                <p>의류코드를 검색해 주세요</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className='flex flex-col items-center justify-center h-full text-gray-400'>
                <p>검색 결과가 없습니다.</p>
              </div>
            ) : (
              <div className='flex flex-col gap-4'>
                {filteredItems.map((item: PartyClothingItem) => (
                  <div
                    key={item.clothingNumber}
                    className='flex gap-4 items-center p-3 rounded-lg border border-gray-200'
                  >
                    {/* 이미지 */}
                    <div className='w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0'>
                      <img
                        src={item.imageUrls?.[0] || defaultImage}
                        alt={item.clothingNumber}
                        className='w-full h-full object-cover'
                        onError={(e) => {
                          e.currentTarget.src = defaultImage;
                        }}
                      />
                    </div>

                    {/* 정보 */}
                    <div className='flex-1 min-w-0'>
                      <p className='font-medium text-gray-900 truncate'>{item.clothingNumber}</p>
                      <p className='text-sm text-gray-500'>
                        {(() => {
                          const categoryInfo = findCategoryByCode(
                            item.category as ClothingCategoryCode
                          );
                          return categoryInfo
                            ? `${categoryInfo.mainCategory} · ${categoryInfo.subCategory}`
                            : item.category;
                        })()}
                      </p>
                    </div>

                    {/* 티켓 스캔 버튼 */}
                    <Button
                      onClick={() => handleTicketScan(item.clothingNumber)}
                      className='bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-2 whitespace-nowrap'
                    >
                      <ScanQrCode size={16} />
                      <span>티켓 스캔</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </StatusHandler>
        </div>

        {/* 건너뛰기 버튼 */}
        <div className='fixed bottom-0 left-0 right-0 p-5 bg-white max-w-[430px] mx-auto'>
          <Button theme='purple' onClick={handleSkip} className='w-full py-4 rounded-xl'>
            건너뛰기
          </Button>
        </div>
      </div>

      {/* 티켓 스캔 뷰 */}
      {isScanViewOpen && (
        <TicketScanView
          partyId={partyId || ""}
          clothingNumber={selectedClothingNumber || undefined}
          onClose={() => {
            setIsScanViewOpen(false);
            setSelectedClothingNumber(null);
          }}
          onScanSuccess={handleScanSuccess}
        />
      )}
    </>
  );
}
