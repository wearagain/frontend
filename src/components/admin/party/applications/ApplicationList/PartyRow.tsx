import type { PartyApplicationResponse } from "@/types/admin/party.ts";
import PartyRowDetail from "@/components/admin/party/applications/ApplicationList/PartyRowDetail.tsx";
import PartyRowButtons from "@/components/admin/party/applications/ApplicationList/PartyRowButtons.tsx";

export default function PartyRow(item: PartyApplicationResponse) {
  return (
    <div className='py-5 h-[114px] min-h-max'>
      <div className='flex justify-between items-center'>
        <PartyRowDetail {...item} />
        <PartyRowButtons status={item.status ?? "PENDING"} id={item.id} />
      </div>
    </div>
  );
}
