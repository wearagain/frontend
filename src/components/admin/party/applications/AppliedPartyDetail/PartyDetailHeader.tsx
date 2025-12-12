import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";
import { Badge } from "@/components/ui/badge.tsx";

export interface PartyDetailHeaderProps {
  id: string;
  partyTitle: string;
  appliedAt: string;
  isGroup: boolean;
  status: string;
}

export default function PartyDetailHeader(
  {
    id,
    partyTitle,
    appliedAt,
    isGroup,
    status,
  }: PartyDetailHeaderProps) {
  const dateFormatted = format(new Date(appliedAt), "yyyy.MM.dd HH:mm", {
    locale: ko,
  });

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
        <p className="font-medium text-[#939396]">{dateFormatted} 신청</p>
      </div>
      <div className="flex sticky top-0 right-5">
        <Badge variant={getBadgeStyle(status)}>{status}</Badge>
      </div>
    </div>
  );
}
