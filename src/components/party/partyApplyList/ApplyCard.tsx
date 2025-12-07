import defaultThumbnail from "@/assets/images/default.png";
import { ChevronRight } from "lucide-react";
import type { PartyParticipantResponse, HostApplicationResponse } from "@/types/apply";
import { STATUS_MAP } from "@/types/apply";
import { InfoRow } from "./InfoRow";
import { formatDateKR, formatDateTimeKR } from "@/utils/formatDate.ts";

interface ApplyCardProps {
  type: "participate" | "host";
  data: PartyParticipantResponse | HostApplicationResponse;
  onClick?: () => void;
}

// 파티 참여 카드
const ParticipateCard = ({
  data,
  onClick,
}: {
  data: PartyParticipantResponse;
  onClick?: () => void;
}) => {
  const thumbnail = data.clothingItems[0]?.imageUrls[0] || defaultThumbnail;
  const partyTitle = data.partyTitle || "파티 정보 없음";
  const partyAddress = data.partyAddress || "정보 없음";

  return (
    <div className='px-5 py-4 cursor-pointer' onClick={onClick}>
      <div className='flex justify-between items-center mb-4'>
        <h3>{partyTitle}</h3>
        <ChevronRight className='w-4 h-4 text-[#939396]' />
      </div>

      <div className='flex gap-4'>
        <div className='w-22 h-22 shrink-0 overflow-hidden rounded-lg bg-gray-100'>
          <img src={thumbnail} alt={partyTitle} className='w-full h-full object-cover' />
        </div>

        <div className='flex-1 flex flex-col gap-2 text-sm'>
          <InfoRow label='날짜' value={formatDateTimeKR(data.attendanceDate)} />
          <InfoRow label='장소' value={partyAddress} />
          <InfoRow label='교환의류' value={`${data.clothingItems.length}벌`} />
          <InfoRow
            label='상태'
            value={STATUS_MAP[data.status]}
            isCancelled={data.status === "CANCELLED"}
          />
        </div>
      </div>
    </div>
  );
};

// 파티 주최 카드
const HostCard = ({ data, onClick }: { data: HostApplicationResponse; onClick?: () => void }) => {
  return (
    <div className='px-5 py-4 cursor-pointer' onClick={onClick}>
      <div className='flex justify-between items-center mb-4'>
        <h3>{data.partyTitle}</h3>
        <ChevronRight className='w-4 h-4 text-[#939396]' />
      </div>

      <div className='flex flex-col gap-2 text-sm'>
        <InfoRow label='날짜' value={formatDateKR(data.desiredDate)} />
        <InfoRow label='장소' value={data.address} />
        <InfoRow label='참여자' value={`${data.maxAttendeeCnt}명`} />
        <InfoRow label='교환의류' value={`${data.maxChangeCnt}벌`} />
        <InfoRow
          label='상태'
          value={STATUS_MAP[data.status]}
          isCancelled={data.status === "CANCELLED"}
        />
      </div>
    </div>
  );
};

export const ApplyCard = ({ type, data, onClick }: ApplyCardProps) => {
  if (type === "participate") {
    return <ParticipateCard data={data as PartyParticipantResponse} onClick={onClick} />;
  }
  return <HostCard data={data as HostApplicationResponse} onClick={onClick} />;
};
