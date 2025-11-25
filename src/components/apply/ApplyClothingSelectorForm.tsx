import { useMemo } from "react";
import { useApplyStore } from "@/store/useApplyStore";

import ClothingCategoryDisplay from "@/components/apply/ClothingCategoryDisplay";
import ClothingSelectedModal from "@/components/apply/ClothingSelectedModal";
import { type ClothingCategoryCode, type SelectedItem } from "@/types/clothingCategory";
import { findCategoryByCode } from "@/utils/apply/clothingUtils";

interface Props {
  onNext: (selectedItems: SelectedItem[]) => void;
  maxItemLimit: number;
}

export default function ApplyClothingSelectorForm({ maxItemLimit, onNext }: Props) {
  const { selectedItems, setSelectedItems } = useApplyStore();

  const selectedItemsMap = useMemo(() => {
    return new Map(selectedItems.map((item) => [item.code, item.count]));
  }, [selectedItems]);

  const totalCount = Array.from(selectedItemsMap.values()).reduce((sum, count) => sum + count, 0);

  const handleItemToggle = (code: ClothingCategoryCode) => {
    const newMap = new Map(selectedItemsMap);
    if (!newMap.has(code)) {
      if (totalCount >= maxItemLimit) {
        alert(`품목은 최대 ${maxItemLimit}개까지만 선택할 수 있습니다.`);
        return;
      }
      newMap.set(code, 1);
    } else {
      newMap.delete(code);
    }
    updateSelectedItems(newMap);
  };

  const handleCountChange = (code: ClothingCategoryCode, count: number) => {
    const isIncrease = count > (selectedItemsMap.get(code) || 0);

    if (isIncrease) {
      if (totalCount >= maxItemLimit) {
        alert(`품목은 최대 ${maxItemLimit}개까지만 선택할 수 있습니다.`);
        return;
      }
    }

    const newMap = new Map(selectedItemsMap);
    if (count < 1) {
      newMap.delete(code);
    } else {
      newMap.set(code, count);
    }
    updateSelectedItems(newMap);
  };

  const updateSelectedItems = (map: Map<ClothingCategoryCode, number>) => {
    const items: SelectedItem[] = Array.from(map.entries()).map(([code, count]) => {
      const category = findCategoryByCode(code)!;
      return {
        code,
        mainCategory: category.mainCategory,
        subCategory: category.subCategory,
        count,
      };
    });
    setSelectedItems(items);
  };

  const handleSubmit = () => {
    if (selectedItemsMap.size === 0) {
      alert("최소 1개 이상의 품목을 선택해주세요.");
      return;
    }
    onNext(selectedItems);
  };

  return (
    <div>
      <div className='flex flex-col h-screen'>
        <div className='bg-white flex-shrink-0 border-b-1 sticky top-0 border-gray-100 z-10'>
          <h2 className='text-lg font-semibold px-5 pt-6 mb-5'>
            교환하려는 품목을
            <br />
            모두 선택해 주세요
          </h2>
        </div>

        {/* 카테고리 */}
        <div className='flex-1 overflow-hidden'>
          <ClothingCategoryDisplay
            selectedItems={selectedItemsMap}
            onItemToggle={handleItemToggle}
          />
        </div>
      </div>

      {/* 모달 */}
      {selectedItemsMap.size > 0 && (
        <ClothingSelectedModal
          maxItemLimit={maxItemLimit}
          currentTotal={totalCount}
          selectedItems={selectedItemsMap}
          onCountChange={handleCountChange}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
