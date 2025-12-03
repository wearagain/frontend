import { useState } from "react";
import { FilterHeader } from "@/components/common/FilterHeader.tsx";
import type { AdminPartyFilter } from "@/types/adminTypes.ts";
import { generateDummyParties, type PartyItem } from "@/utils/admin/dummy.ts";
import PartyRow from "@/components/admin/party/AppliedPartyList/PartyRow.tsx";
import { Outlet } from "react-router-dom";

export default function AdminPartyPage() {
  const tabs: { label: string; value: AdminPartyFilter }[] = [
    { label: "전체", value: "ALL" },
    { label: "승인대기", value: "PENDING" },
    { label: "승인", value: "APPROVED" },
    { label: "반려", value: "REJECTED" },
    { label: "취소", value: "CANCEL" },
  ];

  const [filterType, setFilterType] = useState<AdminPartyFilter | undefined>("ALL");
  const AdminPartyDummy: PartyItem[] = generateDummyParties(6);

  return (
    <div className='flex flex-col h-full'>
      <FilterHeader onChange={setFilterType} tabs={tabs} theme='purple' value={filterType} />
      <div className='p-5 flex flex-col gap-4 flex-1 overflow-y-auto w-full custom-scroll'>
        <h4 className='font-bold text-base'>전체 {AdminPartyDummy.length}</h4>
        <div>
          {AdminPartyDummy.map((item) => (
            <PartyRow {...item} />
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
