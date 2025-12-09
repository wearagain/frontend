import { useQuery } from "@tanstack/react-query";
import { getAvailableVouchers } from "@/apis/voucher/getVouchers";

export const useGetAvailableVouchers = () => {
  return useQuery({
    queryKey: ["availableVouchers"],
    queryFn: getAvailableVouchers,
  });
};

