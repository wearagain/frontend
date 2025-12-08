import type { PartyApplicationResponse } from "@/types/admin/party.ts";
import PartyRowDetail from "@/components/admin/party/ApplicationList/PartyRowDetail.tsx";
import PartyRowButtons from "@/components/admin/party/ApplicationList/PartyRowButtons.tsx";

export default function PartyRow(items: PartyApplicationResponse) {
  return (
    <div className='py-5 h-[114px] min-h-max'>
      <div className='flex justify-between items-center'>
        <PartyRowDetail {...items} />
        <PartyRowButtons status='PENDING' id={items.id} />
      </div>
    </div>
  );
}
