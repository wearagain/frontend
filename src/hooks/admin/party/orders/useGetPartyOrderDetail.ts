import { useQuery } from "@tanstack/react-query";
import { getOrderDetail } from "@/apis/admin/party/orders/getOrderDetail.ts";

export const useGetPartyOrderDetail  = (id: string) => {
    return  useQuery({
      queryKey: ["admin", "party", "orders", id],
      queryFn: () => getOrderDetail(id),
      enabled: !!id,
    });
  };
