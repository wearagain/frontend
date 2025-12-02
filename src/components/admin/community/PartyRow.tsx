import type { PartyItem } from "@/utils/admin/dummy.ts";
import PartyRowDetail from "@/components/admin/community/PartyRowDetail.tsx";
import PartyRowButtons from "@/components/admin/community/PartyRowButtons.tsx";

export default function PartyRow(items: PartyItem) {
  return (
    <div className='py-5 h-[114px] min-h-max'>
      <div className='flex justify-between items-center'>
        <PartyRowDetail {...items} />
        <PartyRowButtons status='PENDING' />
      </div>
    </div>
  );
}
