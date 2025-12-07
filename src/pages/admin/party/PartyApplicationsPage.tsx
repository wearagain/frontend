import { useState } from "react";
import { FilterHeader } from "@/components/common/FilterHeader.tsx";
import type { AdminPartyFilter } from "@/types/adminTypes.ts";
import { Outlet } from "react-router-dom";
import { useGetPartyApplications } from "@/hooks/admin/party/useGetPartyApplications.ts";
import PartyRow from "@/components/admin/party/PartyApplicationList/PartyRow.tsx";

export default function PartyApplicationsPage() {
  const tabs: { label: string; value: AdminPartyFilter }[] = [
    { label: "전체", value: "ALL" },
    { label: "승인대기", value: "PENDING" },
    { label: "승인", value: "APPROVED" },
    { label: "반려", value: "REJECTED" },
    { label: "취소", value: "CANCEL" },
  ];

  const {
    data,
    // TODO: useContext로 isLoading 관리
    // isLoading
  } = useGetPartyApplications();

  const [filterType, setFilterType] = useState<AdminPartyFilter | undefined>("ALL");

  return (
    <div className='flex flex-col h-full'>
      <FilterHeader onChange={setFilterType} tabs={tabs} theme='purple' value={filterType} />
      <div className='p-5 flex flex-col gap-4 flex-1 overflow-y-auto w-full custom-scroll'>
        <h4 className='font-bold text-base'>전체 {data?.length}</h4>
        <div>
          {data?.map((item) => (
            <PartyRow {...item} />
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
