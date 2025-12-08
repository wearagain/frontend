import { useState } from "react";
import { FilterHeader } from "@/components/common/FilterHeader.tsx";
import type { PartyAdminStatus } from "@/types/adminTypes.ts";
import { useGetPartyManageList } from "@/hooks/admin/party/useGetPartyManageList.ts";
import StatusHandler from "@/components/common/StatusHandler.tsx";
import { generateLabelValueObj } from "@/utils/common/generateLabelValueObj.tsx";
import { PartyStatusDescription } from "@/constants/adminConstants.ts";
import { ManageSection } from "@/components/admin/party/ManageList/ManageSection.tsx";
import PartyCardHeader from "@/components/admin/party/ManageList/PartyCardHeader.tsx";
import type { PartyStatus } from "@/types/party.ts";

export default function PartyManagePage() {
  const tabs = generateLabelValueObj(PartyStatusDescription);
  const [filterType, setFilterType] = useState<PartyAdminStatus | undefined>("ALL");
  const { data, groupedData, isLoading, isError, error } = useGetPartyManageList();

  return (
    <StatusHandler isLoading={isLoading} isError={isError} error={error}>
      <div className="flex flex-col h-full">
        <FilterHeader onChange={setFilterType} tabs={tabs} theme="purple" value={filterType} />
        <div className="flex-1 overflow-y-auto custom-scroll">
          <PartyCardHeader title="ALL" total={data?.length ?? 0} className="py-5" />
          {Object.entries(groupedData)?.map(([title, items]) => (
            items.length != 0 &&
            <>
              <div className="divider-compact" />
              <ManageSection header={title as PartyStatus} items={items} />
            </>
          ))}
        </div>
      </div>
    </StatusHandler>
  );
}
