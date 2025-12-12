import { useQuery } from "@tanstack/react-query";
import {
  getAvailableVouchers,
  type AvailableVoucher,
} from "@/apis/inspection/getAvailableVouchers";

export const useGetAvailableVouchers = () => {
  return useQuery<AvailableVoucher[]>({
    queryKey: ["availableVouchers"],
    queryFn: getAvailableVouchers,
  });
};
