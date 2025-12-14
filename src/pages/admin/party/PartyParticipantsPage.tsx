import { Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { generateLabelValueObjWithAll } from "@/utils/common/generateLabelValueObj.tsx";
import { ApplicationStatusDescription } from "@/constants/adminConstants.ts";
import type { ApplicationStatus, PartyParticipantsResponse } from "@/types/admin/party.ts";
import StatusHandler from "@/components/common/StatusHandler.tsx";
import { FilterHeader } from "@/components/common/FilterHeader.tsx";
import { useGetPartyParticipants } from "@/hooks/admin/party/participants/useGetPartyParticipants.ts";
import ParticipantRow from "@/components/admin/party/participants/ParticipantsList/ParticipantRow.tsx";

export default function PartyParticipantsPage() {
  const tabs = generateLabelValueObjWithAll(ApplicationStatusDescription);

  const {partyId} = useParams<{partyId: string}>();
  const {
    data,
    isLoading, isError, error,
  } = useGetPartyParticipants(partyId ?? "");

  const [filterType, setFilterType] = useState<ApplicationStatus | "ALL">("ALL");

  const [filteredData, setFilteredData] = useState<PartyParticipantsResponse[] | undefined>(data);

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
              <ParticipantRow {...item} />
            ))}
          </div>
        </div>
        <Outlet />
      </div>
    </StatusHandler>
  );
}
