import { ApplyHeader } from "@/components/party/partyApplyList/ApplyHeader.tsx";
import { ApplyList } from "@/components/party/partyApplyList/ApplyList.tsx";
import { FilterHeader } from "@/components/common/FilterHeader.tsx";
import StatusHandler from "@/components/common/StatusHandler.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetParticipantList, useGetHostApplicationList } from "@/hooks/party/useApply";
import { STATUS_TABS, type ParticipantStatus } from "@/types/apply";
import {GoToChatBtn} from "@/components/party/partyApplyList/GoToChatBtn.tsx";

export type ApplyTab = "participate" | "host";

export default function ApplyListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTab = (searchParams.get("tab") as ApplyTab) || "participate";
  const currentStatus = (searchParams.get("status") as ParticipantStatus) || "PENDING";

  const setCurrentTab = (tab: ApplyTab) => {
    setSearchParams({ tab, status: "PENDING" });
  };

  const setCurrentStatus = (status: ParticipantStatus) => {
    setSearchParams({ tab: currentTab, status });
  };

  const {
    data: participateData,
    isLoading: isParticipateLoading,
    isError: isParticipateError,
    error: participateError,
  } = useGetParticipantList(currentTab === "participate");
  const {
    data: hostData,
    isLoading: isHostLoading,
    isError: isHostError,
    error: hostError,
  } = useGetHostApplicationList(currentTab === "host");

  const isLoading = currentTab === "participate" ? isParticipateLoading : isHostLoading;
  const isError = currentTab === "participate" ? isParticipateError : isHostError;
  const error = currentTab === "participate" ? participateError : hostError;
  const filterTheme = currentTab === "participate" ? "mint" : "purple";

  const getFilteredData = () => {
    if (currentTab === "participate") {
      return participateData?.filter((item) => item.status === currentStatus) || [];
    }
    return hostData?.filter((item) => item.status === currentStatus) || [];
  };

  const filteredData = getFilteredData();

  const handleCardClick = (id: string) => {
    navigate(`/party/apply/${id}?type=${currentTab}`);
  };

  return (
    <div className='flex flex-col h-full'>
      {/* Header(Menu Tab) */}
      <ApplyHeader currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {/* filter */}
      <FilterHeader
        className={"sticky top-[57px] min-h-fit bg-white"}
        onChange={(v) => v && setCurrentStatus(v as ParticipantStatus)}
        tabs={STATUS_TABS}
        value={currentStatus}
        theme={filterTheme}
      />
      {/* 리스트 */}
      <StatusHandler isLoading={isLoading} isError={isError} error={error}>
        <ApplyList type={currentTab} data={filteredData} onCardClick={handleCardClick} />
        {currentTab === "host" && (
            <GoToChatBtn />
        )}
      </StatusHandler>
    </div>
  );
}
