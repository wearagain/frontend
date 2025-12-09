import { useState, useEffect } from "react";
import { FilterHeader } from "@/components/common/FilterHeader.tsx";
import { Outlet } from "react-router-dom";
import { useGetPartyApplications } from "@/hooks/admin/party/useGetPartyApplications.ts";
import PartyRow from "@/components/admin/party/ApplicationList/PartyRow.tsx";
import StatusHandler from "@/components/common/StatusHandler.tsx";
import { generateALLLabelValueObj } from "@/utils/common/generateLabelValueObj.tsx";
import { ApplicationStatusDescription } from "@/constants/adminConstants.ts";
import type { ApplicationStatus, PartyApplicationResponse } from "@/types/admin/party.ts";

export default function PartyApplicationsPage() {
  const tabs = generateALLLabelValueObj(ApplicationStatusDescription);

  const {
    data,
    isLoading, isError, error,
  } = useGetPartyApplications();

  const [filterType, setFilterType] = useState<ApplicationStatus | "ALL">("ALL");

  const [filteredData, setFilteredData] = useState<PartyApplicationResponse[] | undefined>(data);

  const handleChangeFilter = (type: ApplicationStatus | "ALL") => {
    setFilterType(type);
    const filtered = type !== "ALL" ? data?.filter(i => i.status === type) : data;
    setFilteredData(filtered);
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <StatusHandler isLoading={isLoading} isError={isError} error={error}>
      <div className="flex flex-col h-full">
        <FilterHeader onChange={(v) => handleChangeFilter(v ?? "ALL")} tabs={tabs} theme="purple" value={filterType} />
        <div className="p-5 flex flex-col gap-4 flex-1 overflow-y-auto w-full custom-scroll">
          <h4
            className="font-bold text-base">{filterType == "ALL" ? "전체" : ApplicationStatusDescription[filterType]} {filteredData?.length ?? ""}</h4>
          <div>
            {filteredData?.map((item) => (
              <PartyRow {...item} />
            ))}
          </div>
        </div>
        <Outlet />
      </div>
    </StatusHandler>
  );
}
