import type { PartyStatus } from "@/types/party.ts";
import type { DeliveryStatus } from "@/types/admin/party.ts";

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


export function getNextDeliveryStatus(status: DeliveryStatus | undefined | null): DeliveryStatus {
  switch (status) {
    case "PENDING":
      return "PREPARING";
    case "PREPARING":
      return "IN_TRANSIT";
    case "IN_TRANSIT":
      return "DELIVERED";
    case "DELIVERED":
      return "RETURNED";
    default:
      return "PENDING";
  }
}