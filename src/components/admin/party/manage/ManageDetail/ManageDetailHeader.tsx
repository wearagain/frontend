import { Badge } from "@/components/ui/badge.tsx";
import { getDateTime } from "@/utils/common/convertDataUtils.ts";
import type { PartyStatus } from "@/types/party.ts";
import { PartyStatusDescription } from "@/constants/adminConstants.ts";
import type { DeliveryStatus } from "@/types/admin/party.ts";

export interface ManageDetailHeaderProps {
  id: string;
  title: string;
  openAt: string;
  isGroup: boolean;
  status: PartyStatus;
  deliveryStatus: DeliveryStatus | null;
}

export default function ManageDetailHeader(
  {
    id,
    title,
    openAt,
    isGroup,
    status,
    deliveryStatus,
  }: ManageDetailHeaderProps) {

  const getBadgeStyle = (status: string | null) => {
    switch (status) {
      case "취소":
        return "redOutline";
      case "반송":
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
          <p>{id}</p>
          <p className="text-[#D9D9D9]">·</p>
          <p>{isGroup}</p>
        </div>
        <p className="font-medium text-[#939396]">{getDateTime(openAt)} 생성</p>
      </div>
      <div className="flex sticky top-0 right-5 gap-2">
        <Badge variant={getBadgeStyle(status)}>{PartyStatusDescription[status]}</Badge>
        {deliveryStatus && <Badge variant={getBadgeStyle(deliveryStatus)}>{deliveryStatus}</Badge>}
      </div>
    </div>
  );
}
