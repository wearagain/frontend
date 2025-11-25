import type { RepairClothsResponse } from "@/types/community.ts";
import ClothItemDetail from "@/components/community/scrollLayout/ClothItemDetail.tsx";

interface BoardProps {
  items: RepairClothsResponse[];
}

export default function ClothDetailBoard({ items }: BoardProps) {
  return (
    <div className='flex-1 overflow-y-auto grid grid-cols-2 gap-4 pr-4 w-full custom-scroll'>
      {items.map((item) => (
        <ClothItemDetail {...item} />
      ))}
    </div>
  );
}
