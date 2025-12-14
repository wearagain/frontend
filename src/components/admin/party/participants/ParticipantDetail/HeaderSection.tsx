import { Badge } from "@/components/ui/badge.tsx";
import { type PartyParticipantResponse, STATUS_MAP } from "@/types/apply.ts";
import type { ParticipantStatus } from "@/types/participant.ts";


interface ClothSectionProps {
  data: PartyParticipantResponse | undefined;
}

export default function HeaderSection({ data }: ClothSectionProps) {
  const getBadgeStyle = (status: ParticipantStatus | null) => {
    switch (status) {
      case "APPROVED":
        return "greenOutline";
      case "REJECTED":
        return "redOutline";
      case "CANCELLED":
        return "redOutline";
      default:
        return "normalOutline";
    }
  };

  return (<div className="p-5 flex justify-between items-center">
    <h2 className="font-bold text-base">{data?.name}</h2>
    {data?.status && <Badge variant={getBadgeStyle(data?.status)}>{STATUS_MAP[data?.status]}</Badge>}
  </div>)
}