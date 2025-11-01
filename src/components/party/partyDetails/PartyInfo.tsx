import { Users, MapPin, Clock } from "lucide-react";
import type { PartyDetailResponse } from "@/types/party";
import { formatDate } from "@/utils/formatDate";
import { PartyActionGroup } from "./PartyActionGroup";

interface PartyInfoProps {
  data: PartyDetailResponse;
}

export const PartyInfo = ({ data }: PartyInfoProps) => {
  return (
    <section className='mt-4 pb-4 border-b-2 border-b-gray-200'>
      <p className='text-sm text-gray-500 mb-1'>{data.isGroup ? "단체" : "개인"}</p>
      <h1 className='text-lg font-semibold'>{data.title}</h1>

      <div className='flex items-center gap-2 mt-2 text-sm text-gray-600'>
        <Users size={16} />
        <span>
          신청 {data.currentAttendeeCnt}명 · 정원 {data.maxAttendeeCnt}명
        </span>
      </div>

      <PartyActionGroup />

      <div className='flex flex-col gap-2 mt-3 text-sm text-gray-700'>
        <div className='flex items-center gap-1'>
          <MapPin size={16} />
          <span>{data.address}</span>
        </div>

        <div className='flex items-center gap-1'>
          <Clock size={16} />
          <span>
            진행 예정 · {formatDate(data.openAt)} ~ {formatDate(data.closeAt)}
          </span>
        </div>
      </div>
    </section>
  );
};
