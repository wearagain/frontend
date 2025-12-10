import { ApplyHeader } from "@/components/party/partyApplyList/ApplyHeader.tsx";
import { ApplyList } from "@/components/party/partyApplyList/ApplyList.tsx";
import { FilterHeader } from "@/components/common/FilterHeader.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetParticipantList, useGetHostApplicationList } from "@/hooks/party/useApply";

export type ApplyStatus = "apply" | "canceled";
export type ApplyTab = "participate" | "host";

const statusTabs: { label: string; value: "apply" | "canceled" }[] = [
  { label: "신청", value: "apply" },
  { label: "취소", value: "canceled" },
];

export default function ApplyListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTab = (searchParams.get("tab") as ApplyTab) || "participate";
  const currentStatus = (searchParams.get("status") as ApplyStatus) || "apply";

  const setCurrentTab = (tab: ApplyTab) => {
    setSearchParams({ tab, status: "apply" });
  };

  const setCurrentStatus = (status: ApplyStatus) => {
    setSearchParams({ tab: currentTab, status });
  };

  const { data: participateData, isLoading: isParticipateLoading } = useGetParticipantList();
  const { data: hostData, isLoading: isHostLoading } = useGetHostApplicationList();

  const isLoading = currentTab === "participate" ? isParticipateLoading : isHostLoading;
  const filterTheme = currentTab === "participate" ? "mint" : "purple";

  const getFilteredData = () => {
    if (currentTab === "participate") {
      return (
        participateData?.filter((item) =>
          currentStatus === "apply" ? item.status !== "CANCELLED" : item.status === "CANCELLED"
        ) || []
      );
    }
    return (
      hostData?.filter((item) =>
        currentStatus === "apply" ? item.status !== "CANCELLED" : item.status === "CANCELLED"
      ) || []
    );
  };

  const filteredData = getFilteredData();

  const handleCardClick = (id: string) => {
    navigate(`/party/apply/${id}`);
  };

  return (
    <div className='flex flex-col h-full'>
      {/* Header(Menu Tab) */}
      <ApplyHeader currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {/* filter */}
      <FilterHeader
        className={"sticky top-[57px] min-h-fit bg-white"}
        onChange={(v) => v && setCurrentStatus(v)}
        tabs={statusTabs}
        value={currentStatus}
        theme={filterTheme}
      />
      {/* 리스트 */}
      {isLoading ? (
        <div className='flex items-center justify-center py-20'>
          <p className='text-[#939396]'>로딩 중...</p>
        </div>
      ) : (
        <ApplyList type={currentTab} data={filteredData} onCardClick={handleCardClick} />
      )}
    </div>
  );
}
