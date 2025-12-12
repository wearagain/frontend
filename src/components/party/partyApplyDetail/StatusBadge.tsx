import { Badge } from "@/components/ui/badge.tsx";
import type { ParticipantStatus, HostApplicationStatus } from "@/types/apply.ts";

interface StatusBadgeProps {
  status: ParticipantStatus | HostApplicationStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case "PENDING":
      return <Badge variant='outline'>승인대기</Badge>;
    case "APPROVED":
      return <Badge variant='outline'>승인</Badge>;
    case "REJECTED":
      return <Badge variant='outline'>반려</Badge>;
    case "CANCELLED":
      return <Badge variant='outline'>취소</Badge>;
    default:
      return null;
  }
};
