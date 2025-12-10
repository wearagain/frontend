import { useState, useMemo, useCallback } from "react";
import { useApplyStore } from "@/store/useApplyStore";
import { useGetMyTakenClothes } from "@/hooks/party/useApply";
import { findCategoryByCode } from "@/utils/apply/clothingUtils";
import { type ClothingCategoryCode, type SelectedItem } from "@/types/clothingCategory";

import ClothingCategoryDisplay from "./step1ClothingSelect/ClothingCategoryDisplay";
import ClothingSelectedModal from "./step1ClothingSelect/ClothingSelectedModal";
import ExchangeHistoryModal, {
  type ExchangeHistoryResult,
} from "./step1ClothingSelect/ExchangeHistoryModal";

interface ParticipantProps {
  onNext: (selectedItems: SelectedItem[]) => void;
  maxItemLimit: number;
}

export default function Step1ClothingSelect({ maxItemLimit, onNext }: ParticipantProps) {
  const { selectedItems, setSelectedItems } = useApplyStore();
  const { data: exchangedClothings = [] } = useGetMyTakenClothes();

  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [currentItemCode, setCurrentItemCode] = useState<ClothingCategoryCode | null>(null);

  const selectedItemsMap = useMemo(() => {
    return new Map(selectedItems.map((item) => [item.code, item.count]));
  }, [selectedItems]);

  const totalCount = Array.from(selectedItemsMap.values()).reduce((sum, count) => sum + count, 0);

  const addItem = useCallback(
    (code: ClothingCategoryCode, clothingNumber: string | null) => {
      const category = findCategoryByCode(code)!;
      const existingItem = selectedItems.find((item) => item.code === code);

      if (existingItem) {
        const currentClothingNumbers =
          existingItem.clothingNumbers ?? Array(existingItem.count).fill(null);
        const updatedItems = selectedItems.map((item) =>
          item.code === code
            ? {
                ...item,
                count: item.count + 1,
                clothingNumbers: [...currentClothingNumbers, clothingNumber],
              }
            : item
        );
        setSelectedItems(updatedItems);
      } else {
        setSelectedItems([
          ...selectedItems,
          {
            code,
            mainCategory: category.mainCategory,
            subCategory: category.subCategory,
            count: 1,
            clothingNumbers: [clothingNumber],
          },
        ]);
      }
    },
    [selectedItems, setSelectedItems]
  );

  const handleItemToggle = useCallback(
    (code: ClothingCategoryCode) => {
      if (totalCount >= maxItemLimit) {
        alert(`품목은 최대 ${maxItemLimit}개까지만 선택할 수 있습니다.`);
        return;
      }
      setCurrentItemCode(code);
      setHistoryModalOpen(true);
    },
    [totalCount, maxItemLimit]
  );

  const handleHistoryConfirm = useCallback(
    (result: ExchangeHistoryResult) => {
      if (!currentItemCode) return;

      addItem(currentItemCode, result.clothingCode);

      setHistoryModalOpen(false);
      setCurrentItemCode(null);
    },
    [currentItemCode, addItem]
  );

  const handleHistoryClose = useCallback(() => {
    setHistoryModalOpen(false);
    setCurrentItemCode(null);
  }, []);

  const removeItem = useCallback(
    (code: ClothingCategoryCode, index: number) => {
      const existingItem = selectedItems.find((item) => item.code === code);
      if (!existingItem) return;

      if (existingItem.count <= 1) {
        setSelectedItems(selectedItems.filter((item) => item.code !== code));
      } else {
        const currentClothingNumbers =
          existingItem.clothingNumbers ?? Array(existingItem.count).fill(null);
        const newClothingNumbers = [...currentClothingNumbers];
        newClothingNumbers.splice(index, 1);
        setSelectedItems(
          selectedItems.map((item) =>
            item.code === code
              ? { ...item, count: item.count - 1, clothingNumbers: newClothingNumbers }
              : item
          )
        );
      }
    },
    [selectedItems, setSelectedItems]
  );

  const handleSubmit = useCallback(() => {
    if (selectedItemsMap.size === 0) {
      alert("최소 1개 이상의 품목을 선택해주세요.");
      return;
    }
    onNext(selectedItems);
  }, [selectedItemsMap, selectedItems, onNext]);

  const currentCategory = currentItemCode ? findCategoryByCode(currentItemCode) : null;

  return (
    <>
      <div className='flex flex-col h-screen'>
        {/* 헤더 */}
        <header className='bg-white flex-shrink-0 border-b-1 sticky top-0 border-[#E0E2E4] z-10'>
          <h2 className='text-lg font-semibold px-5 pt-6 mb-5'>
            교환하려는 품목을
            <br />
            모두 선택해 주세요
          </h2>
        </header>

        {/* 카테고리 목록 */}
        <main className='flex-1 overflow-y-auto'>
          <ClothingCategoryDisplay
            selectedItems={selectedItemsMap}
            onItemToggle={handleItemToggle}
          />
        </main>
      </div>

      {/* 교환 이력 모달 */}
      {historyModalOpen && currentCategory && (
        <ExchangeHistoryModal
          itemName={currentCategory.subCategory}
          itemCount={1}
          exchangedClothings={exchangedClothings}
          onConfirm={handleHistoryConfirm}
          onClose={handleHistoryClose}
        />
      )}

      {/* 선택된 품목 모달 */}
      {selectedItems.length > 0 && !historyModalOpen && (
        <ClothingSelectedModal
          currentTotal={totalCount}
          selectedItems={selectedItems}
          onRemoveItem={removeItem}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}
