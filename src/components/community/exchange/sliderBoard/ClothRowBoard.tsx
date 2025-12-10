import BoardHeader from "@/components/community/exchange/sliderBoard/BoardHeader.tsx";
import ClothRowItem from "@/components/community/exchange/sliderBoard/ClothRowItem.tsx";
import type { ThumbnailItem } from "@/types/community.ts";

interface BoardProps {
  label: String;
  items: ThumbnailItem[];
}

export default function ClothRowBoard({ label, items }: BoardProps) {
  return (
    <div className='flex flex-col'>
      <BoardHeader label={label}></BoardHeader>
      <div className='flex gap-4 pr-4 overflow-x-auto custom-scroll'>
        {items.map((item) => (
          <ClothRowItem {...item}></ClothRowItem>
        ))}
      </div>
    </div>
  );
}
