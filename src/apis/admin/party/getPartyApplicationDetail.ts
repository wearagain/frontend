import { axiosInstance } from "@/apis/axios-instance";
import type { PartyApplicationResponse } from "@/types/admin/party.ts";

export const getPartyApplicationDetail = async (
  applicationId: string
): Promise<PartyApplicationResponse> => {
  const { data } = await axiosInstance.get<PartyApplicationResponse>(
    `/api/party/applications/${applicationId}`
  );
  return data;
};
