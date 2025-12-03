import { useQuery } from "@tanstack/react-query";
import { generateDummyDetails } from "@/utils/admin/dummy.ts";
import { type PartyDetailResponse } from "@/types/adminTypes.ts";

const GROUP1_KEYS = ["organizer", "department", "contact", "email"] as const;
const GROUP2_KEYS = ["status", "size", "date", "time", "place", "maxParticipants"] as const;
const GROUP3_KEYS = [
  "paymentStatus",
  "postalCode",
  "address",
  "hopeDeliveryDate",
  "trackingNumber",
  "invoice",
  "invoiceEmail",
] as const;

export function useGetPartyDetails(id: string) {
  const query = useQuery({
    queryKey: ["party-detail", id],
    queryFn: async (): Promise<PartyDetailResponse> => {
      return generateDummyDetails(1)[0];
    },
  });

  const data = query.data;

  return {
    ...query,

    group1: data ? Object.fromEntries(GROUP1_KEYS.map((k) => [k, data[k]])) : null,

    group2: data ? Object.fromEntries(GROUP2_KEYS.map((k) => [k, data[k]])) : null,

    group3: data ? Object.fromEntries(GROUP3_KEYS.map((k) => [k, data[k]])) : null,
  };
}
