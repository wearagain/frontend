import type { RepairClothsResponse } from "@/types/community.ts";
import ClothColItem from "@/components/community/exchange/scrollList/ClothColItem.tsx";

interface BoardProps {
  items: RepairClothsResponse[];
}

export default function ClothColList({ items }: BoardProps) {
  return (
    <div className='main-inner flex-1 overflow-y-auto grid grid-cols-2 gap-4 pr-4 w-full custom-scroll'>
      {items.map((item) => (
        <ClothColItem {...item} />
      ))}
    </div>
  );
}
