import type { PartyStatus } from "@/types/party.ts";

export default function getNextStatus (header: PartyStatus | null): PartyStatus | undefined  {
  switch (header) {
    case "UPCOMING":
      return "ONGOING";
    case "ONGOING":
      return "COMPLETED";
    default:
      return undefined;
  }
};
