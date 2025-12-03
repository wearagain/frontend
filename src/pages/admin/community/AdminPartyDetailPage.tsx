import PartyDetailHeader from "@/components/admin/community/AppliedPartyDetail/PartyDetailHeader.tsx";
import { generateDummyParties, type PartyItem } from "@/utils/admin/dummy.ts";
import PartyDetailBottomBar from "@/components/admin/community/AppliedPartyDetail/PartyDetailBottomBar.tsx";
import { useGetPartyDetails } from "@/hooks/admin/party/useGetPartyDetail.ts";
import DetailSection from "@/components/admin/community/AppliedPartyDetail/DetailSection.tsx";

export default function AdminPartyDetailPage() {
  const AdminPartyDummy: PartyItem = generateDummyParties(1)[0];

  const id = window.location.pathname.split("/").pop() ?? "";
  const { group1, group2, group3 } = useGetPartyDetails(id);

  return (
    <div className='bottombar-p'>
      <PartyDetailHeader {...AdminPartyDummy} generatedDate={new Date()} />
      <div className='divider' />
      {group1 && <DetailSection title='주최자 정보' data={group1} isOrganization={true} />}
      <div className='divider' />
      {group2 && <DetailSection title='파티 정보' data={group2} labelWidth='w-[92px]' />}
      <div className='divider' />
      {group3 && <DetailSection title='결제 및 배송' data={group3} labelWidth='w-[102px]' />}
      <PartyDetailBottomBar id='3' />
    </div>
  );
}
