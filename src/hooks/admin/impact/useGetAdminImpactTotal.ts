import { useQuery } from "@tanstack/react-query";
import { getAdminImpactTotal } from "@/apis/admin/impact/getAdminImpactTotal.ts";

export const useGetAdminImpactTotal = () => {
  return useQuery({
    queryKey: ["admin", "impact", "total"],
    queryFn: () => getAdminImpactTotal(),
  });
};
