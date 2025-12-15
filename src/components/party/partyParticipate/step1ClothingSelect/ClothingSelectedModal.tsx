import { Button } from "@/components/ui/button";
import { type ClothingCategoryCode, type SelectedItem } from "@/types/clothingCategory";
import { findCategoryByCode } from "@/utils/apply/clothingUtils";
import { X } from "lucide-react";

interface ClothingSelectProps {
  currentTotal: number;
  selectedItems: SelectedItem[];
  onRemoveItem: (code: ClothingCategoryCode, index: number) => void;
  onSubmit: () => void;
}

export default function ClothingSelectedModal({
  currentTotal,
  selectedItems,
  onRemoveItem,
  onSubmit,
}: ClothingSelectProps) {
  const renderStatusText = (clothingNumber: string | null) => {
    if (clothingNumber) {
      return (
        <span className='flex items-center gap-1'>
          교환 이력 있음
          <span className='w-0.5 h-0.5 rounded-full bg-[#D9D9D9]' />
          {clothingNumber}
        </span>
      );
    }
    return "교환 이력 없음";
  };

  const flattenedItems = selectedItems.flatMap((item) => {
    const category = findCategoryByCode(item.code);
    if (!category) return [];

    // clothingNumbers가 없는 경우
    const clothingNumbers = item.clothingNumbers ?? Array(item.count).fill(null);

    return clothingNumbers.map((clothingNumber, index) => ({
      code: item.code,
      subCategory: category.subCategory,
      clothingNumber,
      index,
      itemNumber: index + 1,
    }));
  });

  return (
    <div className='px-5 pt-5 pb-8 bg-white sticky bottom-0 rounded-t-2xl drop-shadow-lg'>
      <div className='mb-5 space-y-3 max-h-[80px] overflow-x-auto custom-scroll'>
        {flattenedItems.map((item) => (
          <div key={`${item.code}-${item.index}`} className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-bold text-[#222222]'>
                {item.subCategory} {item.itemNumber}
              </p>
              <p className='text-xs text-[#555558]'>{renderStatusText(item.clothingNumber)}</p>
            </div>
            <button
              onClick={() => onRemoveItem(item.code, item.index)}
              className='p-1 hover:bg-gray-100 rounded'
            >
              <X className='w-5 h-5 text-[#222222]' />
            </button>
          </div>
        ))}
      </div>

      <Button onClick={onSubmit} className='w-full h-12 text-base font-semibold'>
        <span className='w-6 h-6 rounded-full bg-white text-[var(--color-mint-light)] flex items-center justify-center text-sm font-bold mr-2'>
          {currentTotal}
        </span>
        품목 선택
      </Button>
    </div>
  );
}
