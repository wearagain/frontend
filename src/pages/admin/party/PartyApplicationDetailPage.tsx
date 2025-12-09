import type { AxiosError } from "axios";
import PartyDetailHeader from "@/components/admin/party/AppliedPartyDetail/PartyDetailHeader.tsx";
import PartyDetailBottomBar from "@/components/admin/party/AppliedPartyDetail/PartyDetailBottomBar.tsx";
import { useGetPartyApplicationDetail } from "@/hooks/admin/party/useGetPartyApplicationDetail.ts";
import DetailSection from "@/components/admin/party/AppliedPartyDetail/DetailSection.tsx";
import { Outlet } from "react-router-dom";
import { GROUP1_KEYS, GROUP2_KEYS, GROUP3_KEYS } from "@/constants/adminConstants.ts";

export default function PartyApplicationDetailPage() {
  const id = window.location.pathname.split("/").pop() ?? "";

  const { data, isLoading, isError, error } = useGetPartyApplicationDetail(id);

  // TODO: useContext 처리(isError, isLoading)
  if (isError) {
    const axiosError = error as AxiosError<any>;
    return <div className='p-5'>{axiosError.response?.data?.error ?? "에러 발생"}</div>;
  }
  if (isLoading || !data) return <div className='p-5'>로딩중...</div>;

  return (
    <div className='bottombar-p'>
      <PartyDetailHeader
        id={data.id}
        partyTitle={data.partyTitle}
        appliedAt={data.appliedAt}
        maxAttendeeCnt={data.maxAttendeeCnt}
        status={data.status}
      />
      <div className='divider' />
      <DetailSection title='주최자 정보' data={data} keys={GROUP1_KEYS} isOrganization />
      <div className='divider' />
      <DetailSection title='파티 정보' data={data} keys={GROUP2_KEYS} labelWidth='w-[92px]' />
      <div className='divider' />
      <DetailSection title='결제 및 배송' data={data} keys={GROUP3_KEYS} labelWidth='w-[102px]' />
      <PartyDetailBottomBar />
      <Outlet />
    </div>
  );
}
