import { type SelectedItem } from "@/types/clothingCategory.ts";

interface AppliedItemProps {
  item: SelectedItem & { itemId: string; itemName: string };
  itemInfo: { images: string[]; description: string };
  showCode?: boolean;
}

export default function AppliedItem({ item, itemInfo, showCode }: AppliedItemProps) {
  const imageUrl = itemInfo.images?.[0];
  // clothingNumber가 있으면 교환 이력 있음으로 판단
  const hasExchangeHistory = !!item.itemId;
  const exchangeHistoryText = hasExchangeHistory ? "교환 이력 있음" : "교환 이력 없음";

  return (
    <div className='flex items-center gap-4 py-2'>
      {/* 이미지 */}
      <div className='w-15 h-15 flex-shrink-0'>
        <img src={imageUrl} alt={item.itemName} className='w-full h-full object-cover rounded-lg' />
      </div>

      {/* 텍스트 */}
      <div className='flex flex-col justify-center'>
        <p className='font-bold text-base'>{item.itemName}</p>
        <p className='font-medium text-sm text-[#555558] mt-1'>{exchangeHistoryText}</p>
        {showCode && (
          <p className='font-medium text-sm mt-1'>
            의류코드<span className='ml-2 text-[var(--color-mint-light)]'>{item.itemId}</span>
          </p>
        )}
      </div>
    </div>
  );
}
