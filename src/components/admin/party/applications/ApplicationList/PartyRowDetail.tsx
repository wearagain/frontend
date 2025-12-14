import { useNavigate } from "react-router-dom";
import type { PartyApplicationResponse } from "@/types/admin/party.ts";

export default function PartyRowDetail(items: PartyApplicationResponse) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`${items.id}`)} className='flex flex-col flex-1 gap-2 min-w-max'>
      <p>{items.id}</p>
      <h4 className='font-bold text-base'>{items.partyTitle}</h4>
      <div className='font-medium text-[#555558] flex gap-1'>
        <p>{items.name}</p>
        <p className='text-[#D9D9D9]'>·</p>
        <p>{items.maxAttendeeCnt}</p>
      </div>
    </div>
  );
}
