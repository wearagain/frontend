import { ApplyHeader } from "@/components/party/partyApplyList/ApplyHeader.tsx";
import { ApplyList } from "@/components/party/partyApplyList/ApplyList.tsx";
import { FilterHeader } from "@/components/common/FilterHeader.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";

import { dummyParticipateData, dummyHostData } from "@/utils/apply/dummy.ts";

const statusTabs: { label: string; value: "apply" | "canceled" }[] = [
  { label: "신청", value: "apply" },
  { label: "취소", value: "canceled" },
];

export default function ApplyListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTab = (searchParams.get("tab") as "participate" | "host") || "participate";
  const currentStatus = (searchParams.get("status") as "apply" | "canceled") || "apply";

  const setCurrentTab = (tab: "participate" | "host") => {
    setSearchParams({ tab, status: "apply" });
  };

  const setCurrentStatus = (status: "apply" | "canceled") => {
    setSearchParams({ tab: currentTab, status });
  };

  // TODO: API 연결
  const participateData = dummyParticipateData;
  const hostData = dummyHostData;

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
        onChange={(v) => v && setCurrentStatus(v)}
        tabs={statusTabs}
        value={currentStatus}
        theme={filterTheme}
      />
      {/* 리스트 */}
      <ApplyList type={currentTab} data={filteredData} onCardClick={handleCardClick} />
    </div>
  );
}
