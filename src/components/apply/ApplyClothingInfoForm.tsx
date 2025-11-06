import { useMemo, useEffect } from "react";
import { useApplyStore } from "@/store/useApplyStore";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ItemInfoCard from "./ItemInfoCard";

interface Props {
  maxItemLimit: number;
  onBack: () => void;
  onSetIsValid: (isValid: boolean) => void;
}

export default function ApplyClothingInfoForm({ maxItemLimit, onBack, onSetIsValid }: Props) {
  const { selectedItems, itemsInfo, updateItemsInfo, removeItem } = useApplyStore();

  const allItems = useMemo(() => {
    return selectedItems.flatMap((item) =>
      Array.from({ length: item.count }, (_, index) => ({
        ...item,
        itemId: `${item.code}-${index}`,
        itemName: `${item.subCategory} ${index + 1}`,
      }))
    );
  }, [selectedItems]);

  const isLimitReached = allItems.length >= maxItemLimit;

  const isComplete = useMemo(() => {
    return allItems.every((item) => {
      const info = itemsInfo.get(item.itemId);
      return info && info.images.length > 0;
    });
  }, [allItems, itemsInfo]);

  const isValid = allItems.length > 0 && isComplete;

  useEffect(() => {
    onSetIsValid(isValid);
  }, [isValid, onSetIsValid]);

  return (
    <div className='flex flex-col min-h-full mb-32'>
      <div className='bg-white flex-shrink-0 sticky top-0 border-b-1 border-gray-100 z-100'>
        <h2 className='text-lg font-semibold px-5 pt-6 mb-5'>
          원활한 검수 작업을 위해
          <br />
          아래 정보를 입력해 주세요
        </h2>
      </div>
      <div className='flex-1 overflow-y-hidden px-5 pb-5'>
        {/* 사진 정보: max 5 */}
        <h3 className='font-semibold my-5'>사진 선택</h3>
        {allItems.map((item) => (
          <ItemInfoCard
            key={item.itemId}
            item={item}
            itemInfo={itemsInfo.get(item.itemId) || { images: [], description: "" }}
            onDelete={removeItem}
            onUpdateInfo={updateItemsInfo}
          />
        ))}

        {!isLimitReached && (
          <Button onClick={onBack} className='w-full'>
            <Plus className='w-5 h-5 pr-1' />
            품목 추가하기
          </Button>
        )}
      </div>
    </div>
  );
}
