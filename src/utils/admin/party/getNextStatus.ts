import type { PartyStatus } from "@/types/party.ts";
import type { DeliveryStatus } from "@/types/admin/party.ts";
import { DeliveryStatusDescription } from "@/constants/adminConstants.ts";

export function getNextPartyStatus(status: PartyStatus | null): PartyStatus | undefined {
  switch (status) {
    case "UPCOMING":
      return "ONGOING";
    case "ONGOING":
      return "COMPLETED";
    default:
      return undefined;
  }
}

type DeliveryStatusKOR = (typeof DeliveryStatusDescription)[keyof typeof DeliveryStatusDescription];

export function getNextDeliveryStatus(status: DeliveryStatusKOR | null): DeliveryStatus {
  switch (status) {
    case "결제전":
      return "PREPARING";
    case "상품준비중":
      return "IN_TRANSIT";
    case "배송중":
      return "DELIVERED";
    case "반송":
      return "RETURNED";
    default:
      return "PENDING";
  }
}