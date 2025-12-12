import { axiosInstance } from "@/apis/axios-instance.ts";
import type { PartyStatus } from "@/types/party.ts";

export const patchPartyStatus = async (
  id: string,
  status: PartyStatus,
) => {
  const { data } = await axiosInstance.patch(
    `/api/parties/${id}/status`,
    null,
    {
      params: { status },
    },
  );
  return data;
};
