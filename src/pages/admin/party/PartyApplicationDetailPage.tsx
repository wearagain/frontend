import { useParams } from "react-router-dom";
import ApplicationDetailHeader from "@/components/admin/party/applications/ApplicationDetail/ApplicationDetailHeader.tsx";
import ApplicationDetailBottomBar from "@/components/admin/party/applications/ApplicationDetail/ApplicationDetailBottomBar.tsx";
import { useGetPartyApplicationDetail } from "@/hooks/admin/party/applications/useGetPartyApplicationDetail.ts";
import DetailSection from "@/components/admin/party/common/Detail/DetailSection.tsx";
import { Outlet } from "react-router-dom";
import { GROUP1_KEYS, GROUP2_KEYS, GROUP3_KEYS, SINGLE_KEYS } from "@/constants/adminConstants.ts";
import StatusHandler from "@/components/common/StatusHandler.tsx";

export default function PartyApplicationDetailPage() {
  const { applicationId } = useParams<{ applicationId: string }>();

  const { data, isLoading, isError, error } = useGetPartyApplicationDetail(applicationId ?? "");

  return (
    <StatusHandler isLoading={isLoading} isError={isError} error={error}>
      <div className="bottombar-p">
        <ApplicationDetailHeader
          id={data?.id}
          partyTitle={data?.partyTitle}
          appliedAt={data?.appliedAt}
          isGroup={data?.isGroup}
          status={data?.status}
        />
        <div className="divider" />
        <DetailSection title="주최자 정보" data={data}
                       keys={data?.isGroup ? GROUP1_KEYS : SINGLE_KEYS} headerButtonType="host" />
        <div className="divider" />
        <DetailSection title="파티 정보" data={data} keys={GROUP2_KEYS} labelWidth="w-[92px]" />
        <div className="divider" />
        <DetailSection title="결제 및 배송" data={data} keys={GROUP3_KEYS} labelWidth="w-[102px]" />
        <ApplicationDetailBottomBar />
        <Outlet />
      </div>
    </StatusHandler>
  );
}
