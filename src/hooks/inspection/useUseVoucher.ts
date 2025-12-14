import { useMutation } from "@tanstack/react-query";
import { useVoucher, type UseVoucherParams } from "@/apis/inspection/useVoucher";

export const useUseVoucher = () => {
  return useMutation({
    mutationKey: ["useVoucher"],
    mutationFn: (params: UseVoucherParams) => useVoucher(params),
  });
};
