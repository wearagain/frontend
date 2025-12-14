import type {  PartyParticipantsResponse } from "@/types/admin/party.ts";
import ParticipantRowDetail from "@/components/admin/party/participants/ParticipantsList/ParticipantRowDetail.tsx";
import PartyRowButtons from "@/components/admin/party/participants/ParticipantsList/PartyRowButtons.tsx";

export default function ParticipantRow(item: PartyParticipantsResponse) {
  return (
    <div className='py-5 h-[114px] min-h-max'>
      <div className='flex justify-between items-center'>
        <ParticipantRowDetail {...item} />
        <PartyRowButtons status={item.status ?? "PENDING"} id={item.id} />
      </div>
    </div>
  );
}
