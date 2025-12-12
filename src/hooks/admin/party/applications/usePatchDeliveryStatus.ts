import { AxiosError } from "axios";

import { useMutation } from "@tanstack/react-query";
import { DeliveryStatusDescription } from "@/constants/adminConstants.ts";
import { queryClient } from "@/lib/queryClient.ts";
import { patchDeliveryStatus } from "@/apis/admin/party/applications/patchDeliveryStatus.ts";
import type { DeliveryStatusUpdateRequest } from "@/types/admin/party.ts";

interface MutationProps {
  applicationId: string;
  params: DeliveryStatusUpdateRequest;
}

export const usePatchDeliveryStatus = () => {
  return useMutation({
    mutationKey: ["deliveryStatus"],
    mutationFn: async ({ applicationId, params }: MutationProps) => {
      return await patchDeliveryStatus({ applicationId, params });
    },
    onSuccess: (_data, { params }) => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "party"],
      });
      alert(`${DeliveryStatusDescription[params.deliveryStatus]} 처리 완료했습니다.`);
    },
    onError: (error: AxiosError<any>) => {
      alert(error.response?.data?.error ?? "승인 도중 오류가 발생했습니다.다시 시도해주세요.");
      console.error(error);
    },
  });
};
