import { Badge } from "@/components/ui/badge.tsx";
import { getDateTime } from "@/utils/common/convertDataUtils.ts";
import type { ApplicationStatus } from "@/types/admin/party.ts";
import { ApplicationStatusDescription } from "@/constants/adminConstants.ts";

export interface PartyDetailHeaderProps {
  id?: string;
  partyTitle?: string;
  appliedAt?: string;
  isGroup?: boolean;
  status?: ApplicationStatus | null;
}

export default function ApplicationDetailHeader(
  {
    id,
    partyTitle,
    appliedAt,
    isGroup,
    status,
  }: PartyDetailHeaderProps) {

  const getBadgeStyle = (status: string | null) => {
    switch (status) {
      case "APPROVED":
        return "greenOutline";
      case "REJECTED":
        return "redOutline";
      case "CANCELLED":
        return "redOutline";
      case "RETURNED":
        return "redOutline";
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
        {status && <Badge variant={getBadgeStyle(status)}>{ApplicationStatusDescription[status]}</Badge>}
      </div>
    </div>
  );
}
