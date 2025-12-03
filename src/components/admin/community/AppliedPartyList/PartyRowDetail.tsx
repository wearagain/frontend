import type { PartyItem } from "@/utils/admin/dummy.ts";

export default function PartyRowDetail(items: PartyItem) {
  return (
    <div className='flex flex-col gap-2 min-w-max'>
      <p>{items.partyId}</p>
      <h4 className='font-bold text-base'>{items.partyName}</h4>
      <div className='font-medium text-[#555558] flex gap-1'>
        <p>{items.register}</p>
        <p className='text-[#D9D9D9]'>·</p>
        <p>{items.size}</p>
      </div>
    </div>
  );
}
