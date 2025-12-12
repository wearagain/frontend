import { axiosInstance } from "@/apis/axios-instance.ts";
import type { PartyApplicationResponse } from "@/types/admin/party.ts";

export const getPartyApplications = async (): Promise<PartyApplicationResponse[]> => {
  const { data } = await axiosInstance.get<PartyApplicationResponse[]>(
    "/api/party/applications/admin/all"
  );
  return data;
};
