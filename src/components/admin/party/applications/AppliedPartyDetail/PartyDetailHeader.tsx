import { Badge } from "@/components/ui/badge.tsx";
import { getDateTime } from "@/utils/common/convertDataUtils.ts";

export interface PartyDetailHeaderProps<TStatus extends string> {
  id?: string;
  partyTitle?: string;
  appliedAt?: string;
  isGroup?: boolean;
  status?: TStatus | null;
}

export default function PartyDetailHeader<TStatus extends string>(
  {
    id,
    partyTitle,
    appliedAt,
    isGroup,
    status,
  }: PartyDetailHeaderProps<TStatus>) {

  const getBadgeStyle = (status: string | null) => {
    switch (status) {
      case "승인":
        return "greenOutline";
      case "반려":
        return "redOutline";
      case "취소":
        return "secondary";
      default:
        return "normalOutline";
    }
  };
  return (
    <div className="p-5 flex justify-between relative">
      <div className="flex flex-col gap-1 flex-1">
        <h2 className="font-bold text-base">{partyTitle}</h2>
        <div className="font-medium text-[#555558] flex gap-1">
          <p>{id}</p>
          <p className="text-[#D9D9D9]">·</p>
          <p>{isGroup}</p>
        </div>
        <p className="font-medium text-[#939396]">{getDateTime(appliedAt)} 신청</p>
      </div>
      <div className="flex sticky top-0 right-5">
        {status && <Badge variant={getBadgeStyle(status)}>{status}</Badge>}
      </div>
    </div>
  );
}
