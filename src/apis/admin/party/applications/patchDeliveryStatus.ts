import { axiosInstance } from "@/apis/axios-instance.ts";
import type { DeliveryStatusUpdateRequest } from "@/types/admin/party.ts";

export const patchDeliveryStatus = async (
  {
    applicationId,
    params,
  }: {
    applicationId: string;
    params: DeliveryStatusUpdateRequest;
  },
) => {
  const { data } = await axiosInstance.patch(
    `/api/party/applications/admin/${applicationId}/delivery-status`,
    params,
  );
  return data;
};
