import ClothColList from "@/components/community/scrollList/ClothColList.tsx";
import { generateDummyDetails } from "@/utils/community/dummy.ts";
import { TabFilter } from "@/components/community/common/filters/BoardTypeFilter.tsx";
import type { ClothCategory } from "@/types/community.ts";
import { useState } from "react";

const ExchangeListPage = () => {
  // TODO: GET API 연동
  const items = generateDummyDetails(15);

  const tabs: { label: string; value: ClothCategory }[] = [
    { label: "전체", value: "ALL" },
    { label: "상의", value: "TOP" },
    { label: "하의", value: "BOTTOM" },
    { label: "드레스", value: "DRESS" },
    { label: "기타", value: "OTHERS" },
  ];

  const [filterType, setFilterType] = useState<ClothCategory | undefined>(undefined);

  return (
    <div className='flex flex-col h-full gap-6'>
      <TabFilter value={filterType} onChange={setFilterType} tabs={tabs} />
      <ClothColList items={items} />
    </div>
  );
};

export default ExchangeListPage;
