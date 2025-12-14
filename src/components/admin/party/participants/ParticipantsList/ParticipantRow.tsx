import type {  PartyParticipantsResponse } from "@/types/admin/party.ts";
import ParticipantRowDetail from "@/components/admin/party/participants/ParticipantsList/ParticipantRowDetail.tsx";
import ParticipantRowButtons from "@/components/admin/party/participants/ParticipantsList/ParticipantRowButtons.tsx";

interface ParticipantRowProps {
  item: PartyParticipantsResponse;
  openApproveModal: (open: boolean) => void;
}

export default function ParticipantRow({item, openApproveModal}: ParticipantRowProps) {
  return (
    <div className='py-5 h-[114px] min-h-max'>
      <div className='flex justify-between items-center'>
        <ParticipantRowDetail {...item} />
        <ParticipantRowButtons openApproveModal={openApproveModal} status={item.status ?? "PENDING"} id={item.id} />
      </div>
    </div>
  );
}
