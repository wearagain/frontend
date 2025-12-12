import { useQuery } from "@tanstack/react-query";
import type { DeliveryStatus } from "@/types/admin/party.ts";
import { getPartyApplications } from "@/apis/admin/party/applications/getPartyApplications.ts";

export const useGetPartyOrderList = () => {
  const query = useQuery({
    queryKey: ["admin", "party", "orders"],
    queryFn: getPartyApplications,
  });

  const groupedData = query.data?.reduce<Record<DeliveryStatus | 'NULL', typeof query.data>>(
    (acc, party) => {
      const status = party.deliveryStatus == null ? 'NULL' : party.deliveryStatus;
      if (!acc[status]) acc[status] = [];
      acc[status].push(party);
      return acc;
    },
    {
      PENDING: [],
      PREPARING: [],
      IN_TRANSIT: [],
      DELIVERED: [],
      RETURNED: [],
      'NULL': [],
    },
  ) ?? {
    PENDING: [],
    PREPARING: [],
    IN_TRANSIT: [],
    DELIVERED: [],
    RETURNED: [],
    'NULL': [],
  };

  console.log(groupedData);
  return { ...query, groupedData };
};
