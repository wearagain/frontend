import ClothColList from "@/components/community/exchange/scrollList/ClothColList.tsx";
import { generateDummyDetails } from "@/utils/community/dummy.ts";
import type { ClothFilterCategory } from "@/types/community.ts";
import { useState } from "react";
import { FilterHeader } from "@/components/common/FilterHeader.tsx";

const ExchangeListPage = () => {
  // TODO: GET API 연동
  const items = generateDummyDetails(15);

  const tabs: { label: string; value: ClothFilterCategory }[] = [
    { label: "전체", value: "ALL" },
    { label: "상의", value: "TOP" },
    { label: "하의", value: "BOTTOM" },
    { label: "드레스", value: "DRESS" },
    { label: "기타", value: "ETC" },
  ];

  const [filterType, setFilterType] = useState<ClothFilterCategory | undefined>("ALL");

  return (
    <div className='flex flex-col h-full'>
      <FilterHeader onChange={setFilterType} tabs={tabs} theme='mint' value={filterType} />
      <ClothColList items={items} />
    </div>
  );
};

export default ExchangeListPage;
