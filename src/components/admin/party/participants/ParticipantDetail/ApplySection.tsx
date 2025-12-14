import { getDateTime, getUnitValue } from "@/utils/common/convertDataUtils.ts";
import type { PartyParticipantResponse } from "@/types/apply.ts";

interface ClothSectionProps {
  data: PartyParticipantResponse | undefined;
}

export default function ApplySection({ data }: ClothSectionProps) {
  return (   <div className="p-5 flex flex-col gap-5">
    <h2 className="font-bold text-base">신청 정보</h2>
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-base">{data?.partyTitle}</h2>
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-base">{getDateTime(data?.attendanceDate, "yyyy년 MM월 dd일(EEE) HH:mm")}</h2>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <h4 className="font-medium">교환 의류 수량</h4>
            <h4 className="font-bold">{getUnitValue(data?.clothingItems?.length, "벌")}</h4>
          </div>
          <p className="text-[#939396]">{getDateTime(data?.processedAt)} 신청</p>
        </div>

      </div>
    </div>
  </div>)
}