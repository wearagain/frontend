import { useNavigate } from "react-router-dom";
import type {  PartyParticipantsResponse } from "@/types/admin/party.ts";
import { getDateTime } from "@/utils/common/convertDataUtils.ts";

export default function ParticipantRowDetail(items: PartyParticipantsResponse) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`${items.id}`)} className='flex flex-col flex-1 gap-2 min-w-max'>
      <p>{items.partyTitle}</p>
      <h4 className='font-bold text-base'>{items.name}</h4>
      <div className='font-medium text-[#555558] flex gap-1'>
        <p>{getDateTime(items.attendanceDate)}</p>
        <p className='text-[#D9D9D9]'>·</p>
        <p>{items.clothingItems?.length ?? 0}</p>
      </div>
    </div>
  );
}
