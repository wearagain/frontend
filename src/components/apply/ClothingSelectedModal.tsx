import { Button } from "../ui/button";
import { type ClothingCategoryCode } from "@/types/clothingCategory";
import { findCategoryByCode } from "@/utils/apply/clothingUtils";
import { Plus, Minus, X } from "lucide-react";

interface Props {
  maxItemLimit: number;
  currentTotal: number;
  selectedItems: Map<ClothingCategoryCode, number>;
  onCountChange: (code: ClothingCategoryCode, count: number) => void;
  onSubmit: () => void;
}

export default function ClothingSelectedModal({
  maxItemLimit,
  currentTotal,
  selectedItems,
  onCountChange,
  onSubmit,
}: Props) {
  const totalCount = Array.from(selectedItems.values()).reduce((sum, count) => sum + count, 0);

  const isIncrementDisabled = currentTotal >= maxItemLimit;

  return (
    <div className='px-5 pb-14 bg-white sticky bottom-0 rounded-t-2xl drop-shadow-lg'>
      <div className='py-5 space-y-3'>
        {Array.from(selectedItems.entries()).map(([code, count]) => {
          const category = findCategoryByCode(code);
          if (!category) return null;
          const isDecrementDisabled = count <= 1;

          return (
            <div key={code} className='flex items-center justify-between'>
              <span className='text-sm font-bold'>{category.subCategory}</span>
              <div className='flex items-center gap-3'>
                <div className='flex items-center gap-1'>
                  <button
                    onClick={() => onCountChange(code, count - 1)}
                    disabled={isDecrementDisabled}
                    className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                      isDecrementDisabled
                        ? "border-gray-200 text-gray-400 cursor-default"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    <Minus className='w-3 h-3' />
                  </button>

                  <span className='w-6 text-center font-medium'>{count}</span>

                  <button
                    onClick={() => onCountChange(code, count + 1)}
                    disabled={isIncrementDisabled}
                    className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                      isIncrementDisabled
                        ? "border-gray-200 text-gray-400 cursor-default"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    <Plus className='w-3 h-3' />
                  </button>
                </div>

                <button
                  onClick={() => onCountChange(code, 0)}
                  className='p-1 hover:bg-gray-100 rounded'
                >
                  <X className='w-4 h-4 text-gray-500' />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <Button onClick={onSubmit} className='w-full h-12 text-base font-semibold'>
        <span className='w-6 h-6 rounded-full bg-white text-[var(--color-mint-light)] flex items-center justify-center text-sm font-bold mr-2'>
          {totalCount}
        </span>
        품목 선택
      </Button>
    </div>
  );
}
