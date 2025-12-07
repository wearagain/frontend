import { useState } from "react";
import { FilterHeader } from "@/components/common/FilterHeader.tsx";
import type { PartyManageFilter } from "@/types/adminTypes.ts";
import { Outlet } from "react-router-dom";

export default function PartyManagePage() {
  const tabs: { label: string; value: PartyManageFilter }[] = [
    { label: "전체", value: "ALL" },
    { label: "예정됨", value: "UPCOMING" },
    { label: "진행중", value: "ONGOING" },
    { label: "완료됨", value: "COMPLETED" },
    { label: "취소됨", value: "CANCELLED" },
  ];

  const [filterType, setFilterType] = useState<PartyManageFilter | undefined>("ALL");
  // const AdminPartyDummy: PartyItem[] = generateDummyParties(6);

  return (
    <div className='flex flex-col h-full'>
      <FilterHeader onChange={setFilterType} tabs={tabs} theme='purple' value={filterType} />
      {/*<div className='p-5 flex flex-col gap-4 flex-1 overflow-y-auto w-full custom-scroll'>*/}
      {/*  <h4 className='font-bold text-base'>전체 {AdminPartyDummy.length}</h4>*/}
      {/*  <div>*/}
      {/*    {AdminPartyDummy.map((item) => (*/}
      {/*      <PartyRow {...item} />*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</div>*/}
      <Outlet />
    </div>
  );
}
