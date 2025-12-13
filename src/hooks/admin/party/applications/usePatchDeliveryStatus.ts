import { AxiosError } from "axios";

import { useMutation } from "@tanstack/react-query";
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
    onSuccess: (_data,) => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "party"],
      });
    },
    onError: (error: AxiosError<any>) => {
      console.error(error);
    },
  });
};
