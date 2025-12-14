import { useQuery } from "@tanstack/react-query";
import type { DeliveryStatus } from "@/types/admin/party.ts";
import { getOrders } from "@/apis/admin/party/orders/getOrders.ts";

export const useGetPartyOrderList = () => {
  const query = useQuery({
    queryKey: ["admin", "party", "orders"],
    queryFn: getOrders,
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

  return { ...query, groupedData };
};
