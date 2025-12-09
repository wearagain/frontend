import { useParams } from "react-router-dom";
import PartyDetailHeader from "@/components/admin/party/AppliedPartyDetail/PartyDetailHeader.tsx";
import PartyDetailBottomBar from "@/components/admin/party/AppliedPartyDetail/PartyDetailBottomBar.tsx";
import { useGetPartyApplicationDetail } from "@/hooks/admin/party/useGetPartyApplicationDetail.ts";
import DetailSection from "@/components/admin/party/AppliedPartyDetail/DetailSection.tsx";
import { Outlet } from "react-router-dom";
import { GROUP1_KEYS, GROUP2_KEYS, GROUP3_KEYS } from "@/constants/adminConstants.ts";
import StatusHandler from "@/components/common/StatusHandler.tsx";

export default function PartyApplicationDetailPage() {
  const { partyId } = useParams<{ partyId: string }>();

  const { data, isLoading, isError, error } = useGetPartyApplicationDetail(partyId ?? "");

  return (
    <StatusHandler isLoading={isLoading} isError={isError} error={error}>
      <div className="bottombar-p">
        <PartyDetailHeader
          id={data?.id}
          partyTitle={data?.partyTitle}
          appliedAt={data?.appliedAt}
          isGroup={data?.isGroup}
          status={data?.status}
        />
        <div className="divider" />
        <DetailSection title="주최자 정보" data={data} keys={GROUP1_KEYS} isOrganization />
        <div className="divider" />
        <DetailSection title="파티 정보" data={data} keys={GROUP2_KEYS} labelWidth="w-[92px]" />
        <div className="divider" />
        <DetailSection title="결제 및 배송" data={data} keys={GROUP3_KEYS} labelWidth="w-[102px]" />
        <PartyDetailBottomBar />
        <Outlet />
      </div>
    </StatusHandler>
  );
}
