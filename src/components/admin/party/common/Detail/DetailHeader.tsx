import { Badge } from "@/components/ui/badge.tsx";
import { getDateTime } from "@/utils/common/convertDataUtils.ts";
import type { PartyStatus } from "@/types/party.ts";
import {
  ApplicationStatusDescription,
  DeliveryStatusDescription,
  PartyStatusDescription,
} from "@/constants/adminConstants.ts";
import type { ApplicationStatus, DeliveryStatus } from "@/types/admin/party.ts";

export interface DetailHeaderProps {
  id?: string;
  title?: string;
  appliedAt?: string;
  isGroup?: boolean;
  partyStatus?: PartyStatus;
  deliveryStatus?: DeliveryStatus | null;
  applicationStatus?: ApplicationStatus | null;
}

export default function DetailHeader(
  {
    id,
    title,
    appliedAt,
    isGroup,
    partyStatus,
    deliveryStatus,
    applicationStatus,
  }: DetailHeaderProps) {

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
      <div className="flex flex-1 flex-col gap-1">
        <h2 className="font-bold text-base">{title}</h2>
        <div className="font-medium text-[#555558] flex gap-1 min-w-max">
          {id &&
            <>
              <p>{id}</p>
              <p className="text-[#D9D9D9]">·</p>
            </>}
          <p>{isGroup ? "단체" : "개인"}</p>
        </div>
        <p className="font-medium text-[#939396]">{getDateTime(appliedAt)} 생성</p>
      </div>
      <div className="flex sticky top-0 right-5 gap-2">

        {partyStatus
          ? <Badge variant={getBadgeStyle(partyStatus)}>{PartyStatusDescription[partyStatus]}</Badge>
          : applicationStatus &&
          <Badge variant={getBadgeStyle(applicationStatus)}>{ApplicationStatusDescription[applicationStatus]}</Badge>
        }
        {deliveryStatus &&
          <Badge variant={getBadgeStyle(deliveryStatus)}>{DeliveryStatusDescription[deliveryStatus]}</Badge>}
      </div>
    </div>
  )
    ;
}
