import type { PartyItem } from "@/utils/admin/dummy.ts";
import { useNavigate } from "react-router-dom";

export default function PartyRowDetail(items: PartyItem) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`${items.partyId}`)}
      className='flex flex-col flex-1 gap-2 min-w-max'
    >
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
